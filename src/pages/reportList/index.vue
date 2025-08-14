<template>
    <view class="product-detail-page">
      <!-- 顶部导航 -->
    <view class="top-section">
      <view class="top-nav">
        <view class="nav-tabs">
          <view 
            class="nav-tab" 
            :class="{ active: activeNavTab === 'marketing' }"
            @click="switchNavTab('marketing')"
          >
            营销商品
          </view>
          <view 
            class="nav-tab" 
            :class="{ active: activeNavTab === 'promotion' }"
            @click="switchNavTab('promotion')"
          >
            促销商品
          </view>
        </view>
      </view>
  
      <!-- 搜索框 -->
      <view class="search-container">
        <view class="search-box">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input 
            type="text" 
            placeholder="请输入要查找的产品名称" 
            v-model="searchKeyword"
            class="search-input"
          />
        </view>
      </view>
    </view>
  
    <Report :productInfoList="productInfoList" />
    </view>
    <TabBar :current="currentTab" @change="handleTabChange" />
    <view class="bottom-actions">
      <view class="action-btn-new" @click="goToReport">
        <text class="btn-text">报表</text>
      </view>
    </view>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import Report from '@/components/report/index.vue'
  import TabBar from '../../components/TabBar/index.vue'
  
  // 响应式数据
  const activeNavTab = ref('marketing')
  const searchKeyword = ref('')
  const productId = ref('')
  const currentTab = ref('reportForm')

  // 产品信息
  const productInfoList = ref([{
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
    specification: '53%vol',
    capacity: '500ml/瓶',
    aroma: '酱香型',
    price: '高档、中档、低档',
    manufacturer: '贵州',
    marketPrice: '199',
    memberPrice: '159',
    priceDiff: '40',
    stock: '999'
  },
  {
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
    specification: '53%vol',
    capacity: '500ml/瓶',
    aroma: '酱香型',
    price: '高档、中档、低档',
    manufacturer: '贵州',
    marketPrice: '199',
    memberPrice: '159',
    priceDiff: '40',
    stock: '999'
  },{
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
    specification: '53%vol',
    capacity: '500ml/瓶',
    aroma: '酱香型',
    price: '高档、中档、低档',
    manufacturer: '贵州',
    marketPrice: '199',
    memberPrice: '159',
    priceDiff: '40',
    stock: '999'
  },{
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
    specification: '53%vol',
    capacity: '500ml/瓶',
    aroma: '酱香型',
    price: '高档、中档、低档',
    manufacturer: '贵州',
    marketPrice: '199',
    memberPrice: '159',
    priceDiff: '40',
    stock: '999'
  },{
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
    specification: '53%vol',
    capacity: '500ml/瓶',
    aroma: '酱香型',
    price: '高档、中档、低档',
    manufacturer: '贵州',
    marketPrice: '199',
    memberPrice: '159',
    priceDiff: '40',
    stock: '999'
  },{
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
    specification: '53%vol',
    capacity: '500ml/瓶',
    aroma: '酱香型',
    price: '高档、中档、低档',
    manufacturer: '贵州',
    marketPrice: '199',
    memberPrice: '159',
    priceDiff: '40',
    stock: '999'
  }
])

  const handleTabChange = (tab) => {
      currentTab.value = tab
      // 这里可以处理tab切换逻辑，比如跳转到其他页面
      console.log('切换到:', tab)
  }
  
  // 页面加载时获取产品ID
  onLoad((options) => {
    if (options.id) {
      productId.value = options.id
      loadProductInfo()
    }
  })
  
  // 切换导航标签
  const switchNavTab = (tab) => {
    activeNavTab.value = tab
  }
  
  // 加载产品信息
  const loadProductInfo = async () => {
    try {
      // 这里应该调用API获取产品详情
      console.log('加载产品信息:', productId.value)
    } catch (error) {
      console.error('加载产品信息失败:', error)
    }
  }
  
  // // 跳转到订单页面
  // const goToOrder = () => {
  //   uni.navigateTo({
  //     url: '/pages/orderList/index'
  //   })
  // }
  
  // // 跳转到库存页面
  // const goToStock = () => {
  //   uni.showToast({
  //     title: '库存功能开发中',
  //     icon: 'none'
  //   })
  // }
  
  // // 跳转到报表页面
  const goToReport = () => {
    uni.navigateTo({
      url: '/pages/reportForm/index'
    })
  }
  
  onMounted(() => {
    console.log('产品详情页面加载完成')
  })
  </script>
  
  <style lang="scss" scoped>
    @use './reportList.scss';
  </style>