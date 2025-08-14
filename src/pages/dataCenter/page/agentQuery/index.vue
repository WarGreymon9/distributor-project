<template>
    <view class="agent-stats-container">
      <!-- 统计卡片区域 -->
      <view class="stats-section">
        <!-- 直推代理 -->
        <view class="stats-card">
          <view class="stats-title">直推代理</view>
          <view class="stats-number direct">{{ directAgentCount }}</view>
        </view>
        
        <!-- 团队代理 -->
        <view class="stats-card">
          <view class="stats-title">团队代理</view>
          <view class="stats-number team">{{ teamAgentCount }}</view>
        </view>
      </view>
  
      <!-- 空白区域 -->
      <view class="empty-area">
        <!-- 这里可以添加其他内容或保持空白 -->
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // 统计数据
  const directAgentCount = ref(0)
  const teamAgentCount = ref(1)
  
  // 加载统计数据
  const loadStatsData = () => {
    uni.showLoading({
      title: '加载中...'
    })
    
    // 模拟API调用
    setTimeout(() => {
      uni.hideLoading()
      // 这里可以调用实际的API获取统计数据
      console.log('加载统计数据完成')
    }, 1000)
  }
  
  // 页面加载时获取统计数据
  onMounted(() => {
    loadStatsData()
  })
  </script>
  
  <style scoped lang="scss">
  @use './agentQuery.scss';
  </style>