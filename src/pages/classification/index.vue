<template>
  <view style="overflow: hidden; height: 100vh;">
    <view class="category-share" >
      <view class="search-container" style=" z-index: 10000;">
        <view class="search-bar">
          <input 
            class="search-input"
            placeholder="请输入关键字"
            @click="handleSearch"
            />
          <!-- <button class="search-btn" @click="handleSearch">搜索</button> -->
        </view>
      </view>
    </view>
    <view class="category-page">
      <!-- 左侧分类导航 -->
      <view class="category-sidebar">
        <view 
          v-for="(category, index) in categories" 
          :key="index"
          class="category-item"
          :class="{ active: activeCategory === index }"
          @click="selectCategory(index, category)"
        >
          {{ category.categoryName }}
        </view>

      </view>
      
      <!-- 右侧产品列表 -->
      <view class="product-content">
        <!-- 顶部分类标签 -->
         <view style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e5e5; z-index: 1000;">
        <view class="category-tabs">
          <view 
            v-for="(tab, index) in subCategories" 
            :key="index"
            class="tab-item"
            :class="{ active: activeTab === index }"
            @click="selectTab(index)"
          >
            {{ tab.name }}
          </view>

        </view>
        <view class="dropdown-trigger" @click="toggleDropdown" style="width: 80rpx; display: flex; align-items: center; justify-content: center; height: 100%;  z-index: 1000;">
          <!-- <text class="current-category">{{ subCategories[activeTab].name }}</text> -->
          <uni-icons type="down" class="dropdown-arrow" :class="{ 'arrow-up': showDropdown }" size="15" style=" z-index: 1000;"></uni-icons>
          <view v-if="showDropdown" class="dropdown-panel">
          <view class="dropdown-content">
            <view 
              v-for="(tab, index) in subCategories" 
              :key="index"
              class="dropdown-item"
              :class="{ active: activeTab === index }"
              @click="selectTabFromDropdown(index)"
            >
              {{ tab.name }}
            </view>
          </view>
        </view>
        </view>

        </view>

        <!-- 产品列表 -->
        <scroll-view 
          class="product-list"
          scroll-y="true"
          refresher-enabled="true"
          :refresher-triggered="refreshing"
          @refresherrefresh="onRefresh"
          @scrolltolower="onLoadMore"
          :lower-threshold="50"
        >
          <view 
            v-for="(product, index) in currentProducts" 
            :key="index"
            class="product-item"
            @click="goToProductDetail(product?.goodsId)"
          >
            <image :src="product?.goodsMainImages?.[0]?.fileUrl" class="product-image" mode="aspectFill"></image>
            <view class="product-info">
              <text class="product-name">{{ product?.goodsName }}</text>
              <text class="product-desc">{{ product?.goodsSubname }}</text>
              <view class="product-price">
                <text class="price">¥{{ product?.goodsSalesPrice }}</text>
                <button plain="true" class="share-btn" open-type="share" @click.stop="shareToWechat(product)" style="padding: 0 10rpx 0 0; background-color: #fff; outline: none; border: none ;display: flex; align-items: center; justify-content: space-between;">
                  <img style="height: 48rpx; width: 48rpx;" src="../../assets/fx.png">
                  <text class="share-text">分享</text>
                </button>
              </view>
            </view>
          </view>
          
          <!-- 加载更多提示 -->
          <view class="load-more" v-if="hasMore">
            <text v-if="loading">正在加载...</text>
            <text v-else>上拉加载更多</text>
          </view>
          
          <!-- 没有更多数据提示 -->
          <view class="no-more" v-if="!hasMore && products.length > 0">
            <text>没有更多数据了</text>
          </view>
          
          <view v-if="showDropdown" class="dropdown-mask" @click="closeDropdown"></view>
        </scroll-view>

      </view>
    </view>
    
  </view>
    <TabBar :current="currentTab" @change="handleTabChange" />
  </template>

  
  <script setup>
  import { ref, computed, onMounted, watch, reactive } from 'vue'
  import TabBar from '../../components/TabBar/index.vue'
  import api from '../../api/index.js'
  import { onShareAppMessage } from '@dcloudio/uni-app'
  // import { useShare } from '@/composable/useShare.js'
  // 响应式数据
  const activeCategory = ref(0)
  const activeTab = ref(0)
  const currentTab = ref('share')
  const showDropdown = ref(false)
  const refreshing = ref(false)  // 添加刷新状态
  const loading = ref(false)     // 添加加载状态
  const hasMore = ref(true)    
  const data = ref({
    page: 1,
    size: 10,
  })
  const currentShareProduct = ref(null)

  const categoryId = ref(null)


  // 计算属性
  
  // 分类数据
  const categories = ref([
    { categoryName: '全部', categoryId: 'all' },

  ])
  
  // 子分类标签
  const subCategories = ref([
    { name: '全部', id: 'all' },
    
  ])
  
  // 产品数据
  const products = ref([

  ])

  const params = ref({
    categoryType: 1,
  })

  const CategoryTree = async() => {
    try {
      const res = await api.getCategoryTree(params.value)
      console.log("res", res.data)
      categories.value.push(...res.data)
    } catch (err) {
      console.log("err", err)
    }
  }

  const DictionaryList = async() => {

    try {
      const res = await api.getDictionaryList()
      console.log("res", res.data)
      res.data.forEach(item => {
          subCategories.value.push({ name: item.dataLabel, id: item.dictDataId })
      })

    } catch (err) {
      console.log("err", err)
    }
  }
  

  const GoodsList = async(isRefresh = false) => {
  if (loading.value) return
  
  loading.value = true
  if (categoryId.value && categoryId.value != "all") {
      data.value = {...data.value, categoryId: categoryId.value}
      products.value = []
  } 

  if (categoryId.value === "all"){
      delete data.value.categoryId
  }
  
  try {

    const res = await api.getGoodsList(data.value)
    
    if (isRefresh) {
      // 下拉刷新，替换数据
      products.value = res.data.list
    } else {
      // 上拉加载，追加数据
      products.value = [...products.value, ...res.data.list]
    }
    
    // 判断是否还有更多数据
    hasMore.value = res.data.list.length === data.value.size
    
    console.log("res", res.data.list)
  } catch (err) {
    console.log("err", err)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
    refreshing.value = false
  }
}
const shareToWechat = (product) => {
  
  console.log("product", product);
  currentShareProduct.value = product
  

  // 设置要分享的产品信息
}



// 添加下拉刷新方法
const onRefresh = () => {
  refreshing.value = true
  data.value.page = 1
  hasMore.value = true
  GoodsList(true)
}


// 添加上拉加载更多方法
const onLoadMore = () => {
  if (!hasMore.value || loading.value) return
  
  data.value.page += 1
  GoodsList(false)
}

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }

  const closeDropdown = () => {
    showDropdown.value = false
  }

  const selectTabFromDropdown = (index) => {
    activeTab.value = index
    showDropdown.value = false
  }
  
  // 计算当前显示的产品
  const currentProducts = computed(() => {
    const selectedCategory = categories.value[activeCategory.value]
    const selectedSubCategory = subCategories.value[activeTab.value]
    
    return products.value.filter(product => {
      const categoryMatch = selectedCategory.id === 'all' || product.category === selectedCategory.id
      const subCategoryMatch = selectedSubCategory.name === '全部' || product.goodsFlavor === selectedSubCategory.name
      return categoryMatch && subCategoryMatch
    })
  })
  
  const handleTabChange = (tab) => {
    currentTab.value = tab
    // 这里可以处理tab切换逻辑，比如跳转到其他页面
    console.log('切换到:', tab)
  }
  // 选择分类
  const selectCategory = (index, category) => {
    activeCategory.value = index
    data.value = {
      page: 1,
      size: 10,
    }
    categoryId.value = null
    categoryId.value = category.categoryId
    activeTab.value = 0 // 重置子分类
  }

  watch(categoryId, () => {

    // 切换分类时重置子分类
    console.log('categoryId', categoryId.value);
    
    GoodsList();
  })
  
  // 选择子分类标签
  const selectTab = (index) => {
    activeTab.value = index
  }
  
  // 跳转到产品详情
  const goToProductDetail = (goodsld) => {
    console.log('商品点击', goodsld);
    uni.navigateTo({
        url: `/pages/productInfo/index?goodsld=${goodsld}`
    });
  }

  const handleSearch = () => {
    // 这里可以处理搜索逻辑，比如跳转到搜索结果页面
    uni.navigateTo({
      url: '/pages/share/index'
    })
  }
  
  // 页面加载
  onMounted(() => {
    // 可以在这里加载分类和产品数据
    GoodsList();
    CategoryTree();
    DictionaryList();
    console.log('分类页面加载完成')

  })
// 正确的分享配置
onShareAppMessage(() => {
  const pathGoodsId = `/pages/productInfo/index?goodsId=${currentShareProduct.value.goodsId}`
  console.log("pathGoodsId", pathGoodsId);

  
  return {
    title: currentShareProduct.value.goodsName || '商品分享',
    desc: currentShareProduct.value.goodsSubname || '精选商品推荐',
    imageUrl: currentShareProduct.value?.goodsMainImages?.[0]?.fileUrl || '',
    path: pathGoodsId
  }
})



  </script>
  
  <style lang="scss" scoped>
    @use './classification.scss';
    .load-more {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80rpx;
      color: #999;
      font-size: 28rpx;
    }

    .no-more {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80rpx;
      color: #ccc;
      font-size: 24rpx;
    }
  </style>