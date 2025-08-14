<template>
    <view class="distributor-list-container">
      <!-- 搜索区域 -->
      <!-- <view class="search-section">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <text class="date-text">日期:2025-05-19</text>
        </view>
      </view> -->
      <view class="search-section">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input 
            class="input" 
            v-model="searchKeyword" 
            @focus="showDatePicker" 
            placeholder="日期:2025-05-19" 
            placeholder-class="placeholder" 
          /> 
        </view> 
        <!-- <button class="search-btn" @click="handleSearch">导出</button>  -->
      </view> 
  
      <!-- 表格头部 -->
      <view class="table-header">
        <view class="header-item sequence">序号</view>
        <view class="header-item name">分销名称</view>
        <view class="header-item quantity">单量</view>
      </view>
  
      <!-- 分销商列表 -->
      <view class="distributor-list">
        <view 
          class="distributor-item" 
          v-for="(item, index) in distributorList" 
          :key="index"
          @click="showDistributorDetail(item)"
        >
          <view class="item-sequence">{{ index + 1 }}</view>
          <view class="item-name">
            <view class="name-avatar">冲</view>
            <text class="name-text">{{ item.name }}</text>
          </view>
          <view class="item-quantity">{{ item.quantity }}</view>
        </view>
      </view>
  
      <!-- 空状态 -->
      <view class="empty-state" v-if="distributorList.length === 0">
        <text class="empty-text">暂无数据</text>
      </view>
    </view>
    <DataScreening ref="dataScreeningRef" @search="handleFilterSearch" @reset="handleReset" :isDistributorRanking="true"/>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import DataScreening from '../../../../components/DataScreening/index.vue'

  
  // 分销商列表数据
  const distributorList = ref([
    {
      name: '冲哥+编号',
      quantity: 1
    }
  ])
  const dataScreeningRef = ref(null)

  // 显示分销商详情
  const showDistributorDetail = (distributor) => {
    console.log('查看分销商详情：', distributor)
    // 这里可以跳转到详情页面或显示详情弹窗
    uni.navigateTo({
      url: `/pages/distributorDetail/index?id=${distributor.id}`
    })
  }
  
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
  
  // 加载分销商列表
  const loadDistributorList = () => {
    uni.showLoading({
      title: '加载中...'
    })
    
    // 模拟API调用
    setTimeout(() => {
      uni.hideLoading()
      // 这里可以调用实际的API获取数据
      console.log('加载分销商列表完成')
    }, 1000)
  }
  
  // 页面加载时获取分销商列表
  onMounted(() => {
    loadDistributorList()
  })
  </script>
  
  <style scoped lang="scss">
  @use './distributorRanking.scss';
  </style>