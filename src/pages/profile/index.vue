<template>
    <view class="profile-container">
      <!-- 顶部用户信息区域 -->
      <view class="user-header">
        <view class="user-info">
          <view class="avatar">
            <image src="/static/avatar.png" mode="aspectFill" class="avatar-img" />
          </view>
          <view class="user-details">
            <view class="username">用户名123</view>
            <view class="user-id">级别：分销</view>
            <view class="user-id">用户: 123456789</view>
          </view>
        </view>
      </view>
      
      <!-- 功能菜单列表 -->
      <view class="menu-list">
        <view class="menu-item" @click="handleMenuClick('password')">
          <view class="menu-left">
            <view class="menu-icon password-icon"></view>
            <text class="menu-text">修改密码</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('nickname')">
          <view class="menu-left">
            <view class="menu-icon nickname-icon"></view>
            <text class="menu-text">修改昵称</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('logout')">
          <view class="menu-left">
            <view class="menu-icon logout-icon"></view>
            <text class="menu-text">邀请注册</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('address')">
          <view class="menu-left">
            <view class="menu-icon address-icon"></view>
            <text class="menu-text">地址管理</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('orders')">
          <view class="menu-left">
            <view class="menu-icon orders-icon"></view>
            <text class="menu-text">订单列表</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('collection')">
          <view class="menu-left">
            <view class="menu-icon collection-icon"></view>
            <text class="menu-text">收益数据</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('exit')">
          <view class="menu-left">
            <view class="menu-icon exit-icon"></view>
            <text class="menu-text">退出登录</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
      </view>
        <TabBar :current="currentTab" @change="handleTabChange" />
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import TabBar from '../../components/TabBar/index.vue'
  
  const currentTab = ref('profile')
  const userInfo = ref({
    username: '用户名123',
    userId: '123456789',
    avatar: '/static/avatar.png'
  })
  
  const handleMenuClick = (type) => {
    switch (type) {
      case 'password':
        uni.showToast({
          title: '修改密码功能',
          icon: 'none'
        })
        break
      case 'nickname':
        uni.showToast({
          title: '修改昵称功能',
          icon: 'none'
        })
        break
      case 'logout':
        uni.showToast({
          title: '登录注销功能',
          icon: 'none'
        })
        break
      case 'address':
        uni.showToast({
          title: '地址管理功能',
          icon: 'none'
        })
        break
      case 'orders':
        uni.navigateTo({
          url: '/pages/orderList/index' 
        })

        break
      case 'collection':
        uni.showToast({
          title: '收藏列表功能',
          icon: 'none'
        })
        break
      case 'exit':
        uni.showModal({
          title: '提示',
          content: '确定要退出登录吗？',
          success: (res) => {
            if (res.confirm) {
              // 清除用户信息，跳转到登录页
              uni.redirectTo({
                url: '/pages/login/index'
              })
            }
          }
        })
        break
      default:
        break
    }
  }

  const handleTabChange = (tab) => {
    currentTab.value = tab
    // 这里可以处理tab切换逻辑，比如跳转到其他页面
    console.log('切换到:', tab)
  }
  </script>
  
  <style scoped lang="scss">
    @use './profile.scss';
  </style>