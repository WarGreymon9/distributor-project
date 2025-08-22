<template>
  <view class="container">
    <!-- 顶部防伪横幅 -->
    <view class="top-banner">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="500">
        <swiper-item v-for="(item, index) in list" :key="index">
          <image :src="item.carouselImage?.[0]?.fileUrl" mode="aspectFill" class="swiper-image" ></image>
          <view class="swiper-title">{{ item.title }}</view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 商品分类标签 -->
    <view class="category-tabs">
      <view 
        class="tab-item"
        :class="{ active: activeCategory === 'new' }"
        @click="switchCategory('new')"
      >
        <text>新品区</text>
      </view>
      <view 
        class="tab-item"
        :class="{ active: activeCategory === 'daily' }"
        @click="switchCategory('daily')"
      >
        <text>日常区</text>
      </view>
    </view>
    
    <!-- 添加scroll-view包装商品列表 -->
    <scroll-view 
      class="scroll-container"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
      :lower-threshold="50"
    >
      <ProductList :productList="productList" @shareToWechat="shareToWechat" @share="share"/>
      
      <!-- 加载更多提示 -->
      <view class="load-more" v-if="hasMore">
        <text v-if="loading">正在加载...</text>
        <text v-else>上拉加载更多</text>
      </view>
      
      <!-- 没有更多数据提示 -->
      <view class="no-more" v-if="!hasMore && productList.length > 0">
        <text>没有更多数据了</text>
      </view>
    </scroll-view>
    
    <!-- 底部tab栏 -->
    <TabBar :current="currentTab" @change="handleTabChange" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TabBar from '../../components/TabBar/index.vue'
import ProductList from '../../components/ProductList/index.vue'
import api from '../../api/index.js'
import { onShareAppMessage } from '@dcloudio/uni-app'

const activeCategory = ref('new')
const currentTab = ref('home')
const refreshing = ref(false)
const loading = ref(false)
const hasMore = ref(true)
// 商品列表数据
const productList = ref([])
const currentShareProduct = ref(null)
// 轮播图数据
const list = ref([
//   image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014dew0Y1glPPH6GpqE_!!2200629544182-1-scmitem6000.gif',
//   title: '昨夜星辰昨夜风，画楼西畔桂堂东'
// },
// {
//   image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014dew0Y1glPPH6GpqE_!!2200629544182-1-scmitem6000.gif',
//   title: '身无彩凤双飞翼，心有灵犀一点通'
// },
// {
//   image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014dew0Y1glPPH6GpqE_!!2200629544182-1-scmitem6000.gif',
//   title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
// }
]);

const data = ref({
  page: 1,
  size: 10
})

// 获取商品列表
const GoodsList = async(isRefresh = false) => {
  if (loading.value) return
  
  loading.value = true
  
  try {
    const res = await api.getGoodsList(data.value)
    
    if (isRefresh) {
      // 下拉刷新，替换数据
      productList.value = res.data.list
    } else {
      // 上拉加载，追加数据
      productList.value = [...productList.value, ...res.data.list]
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

// 下拉刷新
const onRefresh = () => {
  refreshing.value = true
  data.value.page = 1
  hasMore.value = true
  GoodsList(true)
}

// 上拉加载更多
const onLoadMore = () => {
  if (!hasMore.value || loading.value) return
  
  data.value.page += 1
  GoodsList(false)
}

// 获取轮播图列表
const CarouselList = async() => {
  const carouselData = {
    page: 1,
    size: 10
  }

  try {
    const res = await api.getCarouselList(carouselData)
    list.value = res.data.list
    console.log("carousel res", res.data.list)
  } catch (err) {
    console.log("carousel err", err)
  }
}

const switchCategory = (category) => {
  activeCategory.value = category
  // 切换分类时重新加载数据
  data.value.page = 1
  hasMore.value = true
  GoodsList(true)
}

const handleTabChange = (tab) => {
  currentTab.value = tab
  console.log('切换到:', tab)
}

const share = (product) => { 
  
  currentShareProduct.value = product
  console.log('分享商品')
}


onMounted(() => {
  GoodsList(true)
  CarouselList()
})

onShareAppMessage(() => {
  // 获取最新的分享商品数据
  const shareProduct = currentShareProduct.value
  
  console.log('分享时的商品数据：', shareProduct)
  
  // 检查 currentShareProduct 是否有值
  if (!shareProduct) {
    console.log('currentShareProduct 为空，使用默认分享内容')
    return {
      title: '商品分享',
      desc: '精选商品推荐',
      imageUrl: '',
      path: '/pages/index/index'
    }
  }
  
  const pathGoodsId = `/pages/productInfo/index?goodsId=${shareProduct.goodsId}`
  console.log("pathGoodsId", pathGoodsId)

  return {
    title: shareProduct.goodsName || '商品分享',
    desc: shareProduct.goodsSubname || '精选商品推荐',
    imageUrl: shareProduct?.goodsMainImages?.[0]?.fileUrl || '',
    path: pathGoodsId
  }
})


</script>

<style scoped lang="scss">
@use "./home.scss";

.scroll-container {
  flex: 1;
  height: calc(100vh - 300rpx); // 减去顶部banner和底部tabbar的高度
}

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