<template>
    <view class="change-password">
      <!-- 提示信息 -->
    <view>
      <view class="tips-section">
        <view class="tips-title">提示</view>
        <view class="tips-content">
          新密码必须大于等于8位，同时必须包含数字、小写字母、大写字母、英文符号任意三种字符类型组合
        </view>
      </view>
      
      <!-- 表单区域 -->
      <view class="form-section">
        <!-- 旧登录密码 -->
        <view class="form-item">
          <text class="label required">旧登录密码</text>
          <input 
            class="input" 
            type="password"
            placeholder="请输入旧登录密码"
            v-model="formData.oldPassword"
          />
        </view>
  
        <!-- 新登录密码 -->
        <view class="form-item">
          <text class="label required">新登录密码</text>
          <input 
            class="input" 
            type="password"
            placeholder="请输入新登录密码"
            v-model="formData.newPassword"
          />
        </view>
  
        <!-- 确认新密码 -->
        <view class="form-item">
          <text class="label required">确认新密码</text>
          <input 
            class="input" 
            type="password"
            placeholder="请输入确认新密码"
            v-model="formData.confirmPassword"
          />
        </view>
      </view>
      </view>
  
      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleSubmit">确认修改并重新登录</button>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 表单数据
  const formData = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // 模拟当前用户的旧密码（实际项目中应该从后端验证）
  const currentPassword = 'oldPassword123'
  
  // 密码验证规则
  const validatePassword = (password) => {
    // 至少8位
    if (password.length < 8) {
      return false
    }
    
    // 检查字符类型
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    // 至少包含三种字符类型
    const typeCount = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar].filter(Boolean).length
    
    return typeCount >= 3
  }
  
  // 验证旧密码
  const validateOldPassword = (password) => {
    // 实际项目中应该调用API验证
    return password === currentPassword
  }
  
  // 提交处理
  const handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = formData.value
    
    // 检查是否填写完整
    if (!oldPassword || !newPassword || !confirmPassword) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    // 1. 判断旧密码输入是否正确
    if (!validateOldPassword(oldPassword)) {
      uni.showToast({
        title: '旧密码输入错误，请重新输入',
        icon: 'none'
      })
      return
    }
    
    // a. 正确：判断新登录密码是否符合提示
    if (!validatePassword(newPassword)) {
      // Ⅱ. 不符合：toast提示
      uni.showToast({
        title: '密码不符合要求，请按提示输入，谢谢',
        icon: 'none'
      })
      return
    }
    
    // Ⅰ. 符合：判断两次输入是否一致
    if (newPassword !== confirmPassword) {
      // 不一致：toast提示
      uni.showToast({
        title: '两次输入的密码不一致，请重新输入',
        icon: 'none'
      })
      return
    }
    
    // 一致：点击按钮跳转到登录界面
    uni.showToast({
      title: '密码修改成功',
      icon: 'success',
      duration: 2000
    })
    
    // 延迟跳转到登录页面
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/login/index'
      })
    }, 2000)
  }
  </script>
  
  <style lang="scss" scoped>
    @use './changePassword.scss'
  </style>