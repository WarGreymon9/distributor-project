<template>
    <view class="product-list-container">
      <!-- 搜索区域 -->
      <view class="search-section">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input 
            class="input" 
            v-model="searchKeyword" 
            @focus="showDatePicker"
            placeholder="日期:2025-05-06至2025-06-06,所属分销..."
            placeholder-class="placeholder"
          />
        </view>
        <button class="search-btn" @click="handleSearch">导出</button>
      </view>
  
      <!-- 产品列表 -->
      <view class="product-list">
        <view class="product-item" v-for="item in productList" :key="item.id" @click="showProductDetail(item)">
          <view class="product-header">
            <text class="product-name">{{ item.name }}</text>
          </view>
          <view class="product-details">
            <view class="detail-row">
              <view class="detail-item">
                <text class="label">数量:</text>
                <text class="value">{{ item.quantity }}</text>
              </view>
              <view class="detail-item">
                <text class="label">价格:</text>
                <text class="value price">{{ item.price }}</text>
              </view>
              <view class="detail-item">
                <text class="label">运费:</text>
                <text class="value shipping">{{ item.shipping }}</text>
              </view>
              <view class="detail-item">
                <text class="label">金额:</text>
                <text class="value amount">{{ item.amount }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 数据筛选组件 -->
      <DataScreening ref="dataScreeningRef" @search="handleFilterSearch" @reset="handleReset"/>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import DataScreening from '../../../../components/DataScreening/index.vue'
  
  // 搜索关键词
  const searchKeyword = ref('日期:2025-05-06至2025-06-06,所属分销...')
  const dataScreeningRef = ref(null)
  
  // 产品列表数据
  const productList = ref([
    {
      id: 1,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 2,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 3,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 4,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 5,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 6,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 7,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 8,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 9,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 10,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 11,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 12,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 13,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 14,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 15,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 16,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    },
    {
      id: 17,
      name: '产品名称：直通商品：茅台',
      quantity: 2,
      price: 64,
      shipping: '0元',
      amount: '128元'
    }
  ])
  
  // 显示日期选择器
  const showDatePicker = () => {
    dataScreeningRef.value?.open()
  }
  
  // 处理搜索
  const handleSearch = () => {
    uni.showLoading({
      title: '导出中...'
    })
    
    setTimeout(() => {
      uni.hideLoading()
      uni.showToast({
        title: '导出成功',
        icon: 'success'
      })
    }, 2000)
  }
  
  // 处理筛选搜索
  const handleFilterSearch = (filterData) => {
    console.log('筛选数据：', filterData)
    // 这里可以根据筛选条件重新加载数据
    loadProductList(filterData)
  }
  
  // 重置筛选
  const handleReset = () => {
    searchKeyword.value = '日期:2025-05-06至2025-06-06,所属分销...'
    loadProductList()
  }
  
  // 显示产品详情
  const showProductDetail = (product) => {
    uni.navigateTo({
      url: `/pages/productInfo/index?id=${product.id}`
    })
  }
  
  // 加载产品列表
  const loadProductList = (filterData = null) => {
    uni.showLoading({
      title: '加载中...'
    })
    
    // 模拟API调用
    setTimeout(() => {
      uni.hideLoading()
      // 这里可以根据筛选条件调用实际的API
      console.log('加载产品列表', filterData)
    }, 1000)
  }
  
  // 页面加载时获取产品列表
  onMounted(() => {
    loadProductList()
  })
  </script>
  
  <style scoped lang="scss">
  @use './productQuery.scss';
  </style>