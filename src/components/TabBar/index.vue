<template>
    <view class="tab-bar">
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'home' }"
        @click="switchTab('home')"
      >
        <img src="../../assets/sy.png" v-if="activeTab != 'home'" class="tab-icon share-icon">
        <img src="../../assets/sy_xz.png" v-if="activeTab === 'home'" class="tab-icon share-icon">
        <text class="tab-text">首页</text>
      </view>
      
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'share' }"
        @click="switchTab('share')"
      >
        <!-- <view class="tab-icon share-icon"></view> -->
        <img src="../../assets/fl.png" v-if="activeTab != 'share'" class="tab-icon share-icon">
        <img src="../../assets/fl_xz.png" v-if="activeTab === 'share'" class="tab-icon share-icon">
        <text class="tab-text">分类</text> 
      </view> 

      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'reportForm' }" 
        v-if="isDistributor"
        @click="switchTab('reportForm')"
      >
        <img src="../../assets/bd.png" v-if="activeTab != 'reportForm'" class="tab-icon share-icon">
        <img src="../../assets/bd_xz.png" v-if="activeTab === 'reportForm'" class="tab-icon share-icon">
        <text class="tab-text">报单</text>
      </view>
       
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'profile' }" 
        v-if="isDistributor"
        @click="switchTab('profile')"
      >
        <img src="../../assets/wd.png" v-if="activeTab != 'profile'" class="tab-icon share-icon">
        <img src="../../assets/wd_xz.png" v-if="activeTab === 'profile'" class="tab-icon share-icon">
        <text class="tab-text">我的</text>
      </view>
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'profileTourist' }" 
        v-if="isDistributor"
        @click="switchTab('profileTourist')"
      >
        <img src="../../assets/wd.png" v-if="activeTab != 'profileTourist'" class="tab-icon share-icon">
        <img src="../../assets/wd_xz.png" v-if="activeTab === 'profileTourist'" class="tab-icon share-icon">
        <text class="tab-text">查单</text>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    current: {
      type: String,
      default: 'home'
    },
    isDistributor: {
      type: Boolean,
      default: true
    }

  })
  
  const emit = defineEmits(['change'])
  
  const activeTab = ref(props.current)
  
  const switchTab = (tab) => {
    activeTab.value = tab
    // emit('change', tab)
    switch (tab) {
      case 'home':
        uni.redirectTo({
          url: '/pages/index/index'
        });
        break
      case 'share':
        uni.redirectTo({
          url: '/pages/classification/index'
        });
        break
      case 'reportForm':
        uni.redirectTo({
          url: '/pages/reportList/index'
        });
        break
      case 'profileTourist':
        uni.redirectTo({
          url: '/pages/profileTourist/index'
        });
      break
      case 'profile':
        uni.redirectTo({
          url: '/pages/profile/index'
        });
      break
    }
  }
  </script>
  
  <style scoped lang="scss">
    @use "./TabBar.scss";
  </style>