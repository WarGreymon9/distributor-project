<template>
    <view class="team-query-container">
      <!-- 搜索区域 -->
      <view class="search-section">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input 
            class="input" 
            v-model="searchKeyword" 
            @focus="showDatePicker" 
            placeholder="日期:2025-05-02至2025-05-31,所属..." 
            placeholder-class="placeholder" 
          /> 
        </view> 
        <button class="search-btn" @click="handleSearch">导出</button> 
      </view> 
  
      <!-- 分销商列表 -->
      <view class="distributor-list">
        <view 
          class="distributor-item" 
          v-for="(item, index) in distributorList" 
          :key="index"
          @click="showDistributorDetail(item)"
        >
          <view class="distributor-header">
            <view class="distributor-info">
              <text class="distributor-name">分销名称：{{ item.distributorName }}</text>
              <text class="wholesaler-name">所属小批发商：{{ item.wholesalerName }}</text>
            </view>
          </view>
          
          <view class="distributor-details">
            <view class="detail-row">
              <view class="detail-item">
                <text class="detail-label">分销编码：</text>
                <text class="detail-value code">{{ item.distributorCode }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">分销级别：</text>
                <text class="detail-value">{{ item.distributorLevel }}</text>
              </view>
            </view>
            
            <view class="detail-row">
              <view class="detail-item">
                <text class="detail-label">销售单数：</text>
                <text class="detail-value count">{{ item.salesCount }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">销售金额：</text>
                <text class="detail-value amount">{{ item.salesAmount }}元</text>
              </view>
            </view>
            
            <view class="detail-row">
              <view class="detail-item full-width">
                <text class="detail-label">上交金额：</text>
                <text class="detail-value amount highlight">{{ item.submitAmount }}元</text>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 加载更多 -->
      <view class="load-more" v-if="distributorList.length > 0">
        <text class="load-more-text">加载更多</text>
      </view>
  
      <!-- 数据筛选组件 -->
      <DataScreening ref="dataScreeningRef" @search="handleFilterSearch" @reset="handleReset"/>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import DataScreening from '../../../../components/DataScreening/index.vue'
  
  // 搜索关键词
  const searchKeyword = ref('日期:2025-05-02至2025-05-31,所属...')
  const dataScreeningRef = ref(null)
  
  // 分销商列表数据
  const distributorList = ref([
    {
      distributorName: '冲哥+编号',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001PZDP',
      distributorLevel: '分销',
      salesCount: 30,
      salesAmount: 2333.1,
      submitAmount: 2009
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
    },
    {
      distributorName: '编老师',
      wholesalerName: '中龙科技（君通）',
      distributorCode: 'S00001QOAC',
      distributorLevel: '分销',
      salesCount: 3,
      salesAmount: 188.8,
      submitAmount: 167
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
    loadDistributorList(filterData)
  }
  
  // 重置筛选
  const handleReset = () => {
    searchKeyword.value = '日期:2025-05-02至2025-05-31,所属...'
    loadDistributorList()
  }
  
  // 显示分销商详情
  const showDistributorDetail = (distributor) => {
    console.log('查看分销商详情：', distributor)
    // 这里可以跳转到详情页面或显示详情弹窗
  }
  
  // 加载分销商列表
  const loadDistributorList = (filterData = null) => {
    uni.showLoading({
      title: '加载中...'
    })
    
    // 模拟API调用
    setTimeout(() => {
      uni.hideLoading()
      // 这里可以根据筛选条件调用实际的API
      console.log('加载分销商列表', filterData)
    }, 1000)
  }
  
  // 页面加载时获取分销商列表
  onMounted(() => {
    loadDistributorList()
  })
  </script>
  
  <style scoped lang="scss">
  @use './salesRanking.scss';
  </style>