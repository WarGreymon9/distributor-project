<template>
    <view class="data-center-container">
      <!-- 顶部导航 -->
      <!-- <view class="header">
        <view class="back-btn" @click="goBack">
          <uni-icons type="left" size="20" color="#333"></uni-icons>
        </view>
        <view class="title">数据中心</view>
        <view class="more-btn">
          <uni-icons type="more-filled" size="20" color="#333"></uni-icons>
        </view>
      </view> -->
  
      <!-- 日期选择 -->
      <view class="date-tabs">
        <view class="date-tabsgroup">
          <view 
            class="date-tab" 
            :class="{ active: activeDate === item.key }"
            v-for="item in dateTabs" 
            :key="item.key"
            @click="selectDate(item.key)"
          >
            {{ item.label }}
          </view>
        </view>

      </view>
  
      <!-- 净收益 -->
      <view class="profit-section">
        <view class="profit-header">
          <text class="profit-title">净收益</text>
          <uni-icons type="eye" size="16" color="#666"></uni-icons>
        </view>
        <view class="profit-amount">
          <text class="amount-number">32</text>
        </view>
      </view>
  
      <!-- 自销收益 -->
      <view class="self-sales-section">
        <view class="section-header">
          <view class="section-title">
            <view class="title-bar"></view>
            <text class="title-text">自销收益</text>
          </view>
        </view>
        <view class="data-grid">
          <view class="data-item">
            <text class="data-label">单数</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">销售额</text>
            <text class="data-value">2,335</text>
          </view>
          <view class="data-item">
            <text class="data-label">差价</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">应收劳务</text>
            <text class="data-value">0</text>
          </view>
        </view>
      </view>
  
      <!-- 团队数据 -->
      <view class="team-section">
        <view class="section-header">
          <view class="section-title">
            <view class="title-bar"></view>
            <text class="title-text">团队数据</text>
          </view>
        </view>
        <view class="data-grid">
          <view class="data-item">
            <text class="data-label">单数</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">销售额</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">上交额</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">差价</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">应收劳务</text>
            <text class="data-value">0</text>
          </view>
        </view>
      </view>
  
      <!-- 大团队数据 -->
      <view class="big-team-section">
        <view class="section-header">
          <view class="section-title">
            <view class="title-bar"></view>
            <text class="title-text">大团队数据</text>
          </view>
        </view>
        <view class="data-grid">
          <view class="data-item">
            <text class="data-label">总单量</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">有效单量</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">上交金额</text>
            <text class="data-value">0</text>
          </view>
          <view class="data-item">
            <text class="data-label">有效金额</text>
            <text class="data-value">0</text>
          </view>
        </view>
      </view>
  
      <!-- 功能菜单 -->
      <view class="menu-section">
        <view class="menu-item" @click="navigateTo('/pages/dataCenter/page/distributionData/index')">
          <view class="menu-left">
            <view class="menu-icon distribution-icon"></view>
            <text class="menu-text">分销数据汇总</text>
          </view>
          <uni-icons type="right" size="16" color="#ccc"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/dataCenter/page/productQuery/index')">
          <view class="menu-left">
            <view class="menu-icon product-icon"></view>
            <text class="menu-text">产品数据查询</text>
          </view>
          <uni-icons type="right" size="16" color="#ccc"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/dataCenter/page/teamQuery/index')">
          <view class="menu-left">
            <view class="menu-icon team-icon"></view>
            <text class="menu-text">团队业绩查询</text>
          </view>
          <uni-icons type="right" size="16" color="#ccc"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/dataCenter/page/salesRanking/index')">
          <view class="menu-left">
            <view class="menu-icon sales-icon"></view>
            <text class="menu-text">销售龙虎榜</text>
          </view>
          <uni-icons type="right" size="16" color="#ccc"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/dataCenter/page/distributorRanking/index')">
          <view class="menu-left">
            <view class="menu-icon ranking-icon"></view>
            <text class="menu-text">销售排行榜</text>
          </view>
          <uni-icons type="right" size="16" color="#ccc"></uni-icons>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/dataCenter/page/agentQuery/index')">
          <view class="menu-left">
            <view class="menu-icon agent-icon"></view>
            <text class="menu-text">代理人数查询</text>
          </view>
          <uni-icons type="right" size="16" color="#ccc"></uni-icons>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 日期选项
  const dateTabs = [
    { key: '04', label: '04日' },
    { key: '05', label: '05日' },
    { key: '06', label: '06日' },
    { key: 'month', label: '本月' },
    { key: 'lastMonth', label: '上月' }
  ]
  
  const activeDate = ref('04')
  
  // 选择日期
  const selectDate = (key) => {
    activeDate.value = key
    console.log('选择日期：', key)
  }
  
  // 返回上一页
  const goBack = () => {
    uni.navigateBack()
  }
  
  // 页面跳转
  const navigateTo = (url) => {
    uni.navigateTo({ url })
  }
  </script>
  
  <style scoped lang="scss">
    @use './dataCenter.scss';
  </style>