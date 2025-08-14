<template>
    <view class="product-query-container">
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
  
      <!-- 产品信息卡片 -->
      <view class="product-info-card">
        <view class="info-row">
          <view class="info-item">
            <text class="info-label">分销名称:</text>
            <text class="info-value">{{ productInfo.distributorName }}</text>
          </view>
        </view>
        
        <view class="info-row">
          <view class="info-item">
            <text class="info-label">分销编码:</text>
            <text class="info-value code">{{ productInfo.distributorCode }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">分销级别:</text>
            <text class="info-value">{{ productInfo.distributorLevel }}</text>
          </view>
        </view>
        
        <view class="info-row">
          <view class="info-item">
            <text class="info-label">销售单数:</text>
            <text class="info-value count">{{ productInfo.salesCount }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">上交金额:</text>
            <text class="info-value amount">{{ productInfo.submitAmount }}元</text>
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
  
  // 产品信息数据
  const productInfo = ref({
    distributorName: '冲哥+编号',
    distributorCode: 'S00001PZDP',
    distributorLevel: '微酒铺',
    salesCount: 30,
    submitAmount: 2009
  })
  
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
    loadProductInfo(filterData)
  }
  
  // 重置筛选
  const handleReset = () => {
    searchKeyword.value = '日期:2025-05-06至2025-06-06,所属分销...'
    loadProductInfo()
  }
  
  // 加载产品信息
  const loadProductInfo = (filterData = null) => {
    uni.showLoading({
      title: '加载中...'
    })
    
    // 模拟API调用
    setTimeout(() => {
      uni.hideLoading()
      // 这里可以根据筛选条件调用实际的API
      console.log('加载产品信息', filterData)
    }, 1000)
  }
  
  // 页面加载时获取产品信息
  onMounted(() => {
    loadProductInfo()
  })
  </script>
  
  <style scoped lang="scss">
  @use './teamQuery.scss';
  </style>