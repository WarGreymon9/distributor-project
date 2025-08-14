<template>
    <view class="register-page">
      <!-- 表单区域 -->
      <view class="form-section">
        <!-- 邀请人昵称 -->
        <view class="form-item">
          <text class="label">邀请人昵称:</text>
          <text class="value">冲哥+瑞星</text>
        </view>
  
        <!-- 邀请码 -->
        <view class="form-item">
          <text class="label">邀请码:</text>
          <text class="value">S00001PZDP</text>
        </view>
  
        <!-- 昵称 -->
        <view class="form-item">
          <text class="label required">昵称:</text>
          <input 
            class="input" 
            placeholder="请输入昵称"
            v-model="formData.nickname"
          />
        </view>
  
        <!-- 用户名 -->
        <view class="form-item">
          <text class="label required">用户名:</text>
          <input 
            class="input" 
            placeholder="请输入手机号码"
            v-model="formData.username"
            type="number"
          />
        </view>
  
        <!-- 登录密码 -->
        <view class="form-item">
          <text class="label required">登录密码:</text>
          <input 
            class="input" 
            type="password"
            placeholder="请输入登录密码"
            v-model="formData.password"
          />
        </view>
  
        <!-- 确认密码 -->
        <view class="form-item">
          <text class="label required">确认密码:</text>
          <input 
            class="input" 
            type="password"
            placeholder="请输入确认密码"
            v-model="formData.confirmPassword"
          />
        </view>
      </view>
  
      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleRegister">立即注册</button>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 表单数据
  const formData = ref({
    nickname: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  
  // 邀请信息（从路由参数或其他方式获取）
  const inviterInfo = ref({
    nickname: '冲哥+瑞星',
    inviteCode: 'S00001PZDP'
  })
  
  // 表单验证
  const validateForm = () => {
    const { nickname, username, password, confirmPassword } = formData.value
    
    if (!nickname.trim()) {
      uni.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return false
    }
    
    if (!username.trim()) {
      uni.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return false
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(username)) {
      uni.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return false
    }
    
    if (!password.trim()) {
      uni.showToast({
        title: '请输入登录密码',
        icon: 'none'
      })
      return false
    }
    
    // 密码强度验证
    if (password.length < 6) {
      uni.showToast({
        title: '密码长度不能少于6位',
        icon: 'none'
      })
      return false
    }
    
    if (!confirmPassword.trim()) {
      uni.showToast({
        title: '请输入确认密码',
        icon: 'none'
      })
      return false
    }
    
    if (password !== confirmPassword) {
      uni.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return false
    }
    
    return true
  }
  
  // 注册处理
  const handleRegister = async () => {
    if (!validateForm()) {
      return
    }
    
    try {
      // 显示加载状态
      uni.showLoading({
        title: '注册中...'
      })
      
      // 构建注册数据
      const registerData = {
        nickname: formData.value.nickname,
        username: formData.value.username,
        password: formData.value.password,
        inviteCode: inviterInfo.value.inviteCode
      }
      
      // 这里调用注册API
      // const result = await registerApi(registerData)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      uni.hideLoading()
      
      uni.showToast({ 
        title: '注册成功',
        icon: 'success'
      })
      
      // 注册成功后跳转到登录页面
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }, 1500)
      
    } catch (error) {
      uni.hideLoading()
      uni.showToast({
        title: error.message || '注册失败，请重试',
        icon: 'none'
      })
    }
  }
  </script>
  
  <style lang="scss" scoped>
    @use './register.scss'
  </style>