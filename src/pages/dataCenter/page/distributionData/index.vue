<template>
    <view class="distribution-data-container">
      <!-- 顶部导航 -->
      <!-- <view class="header">
        <view class="back-btn" @click="goBack">
          <uni-icons type="left" size="20" color="#333"></uni-icons>
        </view>
        <view class="title">分销数据汇总</view>
        <view class="more-btn">
          <uni-icons type="more-filled" size="20" color="#333"></uni-icons>
        </view>
      </view> -->
  
      <!-- 搜索区域 -->
      <view class="search-section">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input 
            class="input" 
            v-model="searchKeyword" 
            @focus="showDatePicker"
            readonly
            placeholder="日期: 2025-05-06至2025-06-06所属分销: 李"
            placeholder-class="placeholder"
          />
        </view>
      </view>
  
      <!-- 分销汇总数据 -->
      <view class="summary-section">
        <view class="section-header">
          <view class="section-title">
            <view class="title-bar"></view>
            <text class="title-text">分销汇总数据</text>
          </view>
        </view>
        
        <view class="summary-content">
          <view class="summary-row">
            <view class="summary-item">
              <text class="label">编码:</text>
              <text class="value">S00001QQ4D</text>
            </view>
            <view class="summary-item">
              <text class="label">当前分销:</text>
              <text class="value">李</text>
            </view>
          </view>
          
          <view class="summary-row">
            <view class="summary-item">
              <text class="label">总单数:</text>
              <text class="value">0</text>
            </view>
            <view class="summary-item">
              <text class="label">推广单量:</text>
              <text class="value">0</text>
            </view>
          </view>
          
          <view class="summary-row">
            <view class="summary-item">
              <text class="label">销售金额:</text>
              <text class="value red">0元</text>
            </view>
            <view class="summary-item">
              <text class="label">有效金额:</text>
              <text class="value red">0元</text>
            </view>
          </view>
          
          <view class="summary-row">
            <view class="summary-item">
              <text class="label">上交金额:</text>
              <text class="value red">0元</text>
            </view>
          </view>
          
          <view class="summary-row">
            <view class="summary-item">
              <text class="label">差价:</text>
              <text class="value red">0元</text>
            </view>
          </view>
          
          <view class="summary-row">
            <view class="summary-item">
              <text class="label">劳务推广:</text>
              <text class="value red">0元</text>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 分销对账单 -->
      <view class="statement-section">
        <view class="section-header">
          <view class="section-title">
            <view class="title-bar"></view>
            <text class="title-text">分销对账单</text>
          </view>
          <view class="hide-btn">
            <uni-icons type="eye" size="16" color="#666"></uni-icons>
            <text class="hide-text">隐藏</text>
          </view>
        </view>
        
        <!-- 表格头部 -->
        <view class="table-header">
          <view class="table-cell" style="width: 25%;">分销名称</view>
          <view class="table-cell" style="width: 35%;">电话|级别</view>
          <view class="table-cell" style="width: 20%;">单量</view>
          <view class="table-cell" style="width: 20%;">上交金额</view>
        </view>
        
        <!-- 表格内容 -->
        <view class="table-content">
          <view class="table-row" v-for="item in statementList" :key="item.id">
            <view class="table-cell">{{ item.name }}</view>
            <view class="table-cell">
              <text class="phone">{{ item.phone }}|</text>
              <text class="level">{{ item.level }}</text>
            </view>
            <view class="table-cell">{{ item.quantity }}</view>
            <view class="table-cell">{{ item.amount }}</view>
          </view>
          <DataScreening ref="dataScreeningRef" @search="handleSearch" @reset="handleReset"/>
          <!-- 空状态 -->
          <view class="empty-state" v-if="statementList.length === 0">
            <text class="empty-text">暂无数据</text>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import DataScreening from '../../../../components/DataScreening/index.vue'
  
  // 搜索关键词 
  const searchKeyword = ref('')
  const dataScreeningRef = ref(null)



  // 对账单数据
  const statementList = ref([
    {
      id: 1,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 2,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 3,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 4,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 5,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 6,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 7,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 8,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 9,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 10,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 11,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 12,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 13,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 14,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 15,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 16,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 17,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    },
    {
      id: 18,
      name: '李',
      phone: '123****3456',
      level: '微酒铺',
      quantity: 0,
      amount: 0
    }
  ])

  const showDatePicker = () => {
    dataScreeningRef.value?.open()
  }
  // 返回上一页
  const goBack = () => {
    uni.navigateBack()
  }
  </script>
  
  <style scoped lang="scss">
    @use './distributionData.scss';
  </style>