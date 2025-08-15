<template>
  <view>
    <view class="category-share">
      <view class="search-container">
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
          @click="selectCategory(index)"
        >
          {{ category.name }}
        </view>

      </view>
      
      <!-- 右侧产品列表 -->
      <view class="product-content">
        <!-- 顶部分类标签 -->
         <view style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e5e5 ;">
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
        <view class="dropdown-trigger" @click="toggleDropdown" style="width: 80rpx; display: flex; align-items: center; justify-content: center; height: 100%; ">
          <!-- <text class="current-category">{{ subCategories[activeTab].name }}</text> -->
          <uni-icons type="down" class="dropdown-arrow" :class="{ 'arrow-up': showDropdown }" size="15"></uni-icons>
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
        <view class="product-list">
          <view 
            v-for="(product, index) in currentProducts" 
            :key="index"
            class="product-item"
            @click="goToProductDetail(product)"
          >
          
            <image :src="product.image" class="product-image" mode="aspectFill"></image>
            <view class="product-info">
              <text class="product-name">{{ product.name }}</text>
              <text class="product-desc">{{ product.description }}</text>
              <view class="product-price">
                <text class="price">¥{{ product.price }}</text>
                <view class="share-btn" style="display: flex; align-items: center; justify-content: center;">
                  <img style="height: 48rpx; width: 48rpx;" src="../../assets/fx.png">
                  <text class="share-text">分享</text>
                </view>
              </view>
            </view>
          </view>
          <view v-if="showDropdown" class="dropdown-mask" @click="closeDropdown"></view>
        </view>
      </view>
    </view>
  </view>
    <TabBar :current="currentTab" @change="handleTabChange" />
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import TabBar from '../../components/TabBar/index.vue'

  // 响应式数据
  const activeCategory = ref(0)
  const activeTab = ref(0)
  const currentTab = ref('share')
  const showDropdown = ref(false)

  
  // 分类数据
  const categories = ref([
    { name: '全部', id: 'all' },
    { name: '茅台', id: 'maotai' },
    { name: '酱香型', id: 'jiangxiang' },
    { name: '浓香型', id: 'nongxiang' },
    { name: '清香型', id: 'qingxiang' },
    { name: '泸州老窖', id: 'luzhou' },
    { name: '汾酒', id: 'fenjiu' },
    { name: '西凤酒', id: 'xifeng' },
    { name: '古井贡酒', id: 'gujing' },
    { name: '剑南春', id: 'jiannanchun' },
    { name: '郎酒', id: 'langjiu' },
    { name: '衡水老白干', id: 'hengshui' },
    { name: '牛栏山', id: 'niulanshan' },
    { name: '舍得', id: 'shede' },
    { name: '郎酒', id: 'langjiu1' },
    { name: '衡水老白干', id: 'hengshui1' },
    { name: '牛栏山', id: 'niulanshan1' },
    { name: '舍得', id: 'shede1' }
  ])
  
  // 子分类标签
  const subCategories = ref([
    { name: '全部', id: 'all' },
    { name: '酱香型', id: 'jiangxiang' },
    { name: '浓香型', id: 'nongxiang' },
    { name: '清香型', id: 'qingxiang' },
    { name: '酱香型', id: 'jiangxiang1' },
    { name: '浓香型', id: 'nongxiang1' },
    { name: '清香型', id: 'qingxiang1' },
    { name: '酱香型', id: 'jiangxiang2' },
    // { name: '浓香型', id: 'nongxiang2' },
    // { name: '清香型', id: 'qingxiang2' },
    
    
  ])
  
  // 产品数据
  const products = ref([
    {
      id: 1,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 2,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 3,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 4,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 5,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 6,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 7,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 8,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 9,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    },
    {
      id: 10,
      name: '五粮液百年陈酿42度浓香型白酒400ml',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      category: 'all',
      subCategory: 'nongxiang'
    }
  ])

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
      const subCategoryMatch = selectedSubCategory.id === 'all' || product.subCategory === selectedSubCategory.id
      return categoryMatch && subCategoryMatch
    })
  })
  
  const handleTabChange = (tab) => {
    currentTab.value = tab
    // 这里可以处理tab切换逻辑，比如跳转到其他页面
    console.log('切换到:', tab)
  }
  // 选择分类
  const selectCategory = (index) => {
    activeCategory.value = index
    activeTab.value = 0 // 重置子分类
  }
  
  // 选择子分类标签
  const selectTab = (index) => {
    activeTab.value = index
  }
  
  // 跳转到产品详情
  const goToProductDetail = (product) => {
    uni.navigateTo({
      url: `/pages/productInfo/index?id=${product.id}`
    })
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
    console.log('分类页面加载完成')
  })
  </script>
  
  <style lang="scss" scoped>
    @use './classification.scss';
  </style>