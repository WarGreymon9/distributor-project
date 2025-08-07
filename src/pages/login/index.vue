<template>
    <view class="login-container">
      <view class="login-content">
        <!-- 标题 -->
        <view class="title">
          欢伯客
        </view>
        
        <!-- 输入框区域 -->
        <view class="input-section">
          <view class="input-item">
            <input 
              type="text" 
              placeholder="请输入手机号码" 
              v-model="phone"
              class="input-field"
              maxlength="11"
            />
          </view>
          
          <view class="input-item">
            <input 
              type="password" 
              placeholder="请输入密码" 
              v-model="password"
              class="input-field"
            />
          </view>
        </view>
        
        <!-- 登录按钮 -->
        <view class="login-btn" @click="handleLogin">
          <text class="btn-text">登录</text>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const phone = ref('')
  const password = ref('')
  
  const handleLogin = () => {
    if (!phone.value) {
      uni.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return
    }
    
    if (!password.value) {
      uni.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    
    // 这里添加登录逻辑
    console.log('登录信息:', { phone: phone.value, password: password.value })
    
    // 登录成功后跳转到首页
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
  </script>
  
  <style scoped lang="scss">
    @use './login.scss';
  </style>