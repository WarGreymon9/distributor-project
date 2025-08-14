<template>
  <view class="register-page">
    <!-- 表单区域 -->
    <view class="form-section">
      <!-- 所属人 -->
      <view class="form-item">
        <text class="label required">所属人:</text>
        <input 
          class="input" 
          placeholder="请输入所属人姓名"
          v-model="formData.ownerName"
        />
      </view>

      <!-- 手机号 -->
      <view class="form-item">
        <text class="label required">手机号:</text>
        <input 
          class="input" 
          placeholder="请输入手机号码"
          v-model="formData.phone"
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

    <!-- 工商信息标题 -->
    <view class="section-title">
      <text class="title-text">工商信息</text>
    </view>

    <!-- 工商信息区域 -->
    <view class="form-section" style="padding-top: 20rpx;">
      <!-- 营业执照 -->
      <view class="form-item upload-item">
        <text class="label required">营业执照:</text>
        <view class="upload-container" style="padding: 0 20rpx 20rpx;">
          <view v-if="!formData.businessLicense" class="upload-box" @click="uploadBusinessLicense">
            <view class="upload-icon">+</view>
            <text class="upload-text">上传</text>
          </view>
          <view v-else class="uploaded-file" @click="previewBusinessLicense">
            <image :src="formData.businessLicense" class="uploaded-image" mode="aspectFill"></image>
            <view class="delete-btn" @click.stop="deleteBusinessLicense">
              <text>×</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 企业名称 -->
      <view class="form-item">
        <text class="label required">企业名称:</text>
        <input 
          class="input" 
          placeholder="请输入企业名称"
          v-model="formData.companyName"
        />
      </view>

      <!-- 法定代表人姓名 -->
      <view class="form-item">
        <text class="label required">法定代表人姓名:</text>
        <input 
          class="input" 
          placeholder="请输入法定代表人姓名"
          v-model="formData.legalRepresentative"
        />
      </view>

      <!-- 统一社会信用代码 -->
      <view class="form-item">
        <text class="label required">统一社会信用代码:</text>
        <input 
          class="input" 
          placeholder="请输入统一社会信用代码"
          v-model="formData.creditCode"
        />
      </view>

      <!-- 成立日期 -->
      <view class="form-item">
        <text class="label required">成立日期:</text>
        <picker 
          mode="date" 
          :value="formData.establishDate" 
          @change="onDateChange"
          class="date-picker"
        >
          <input 
            class="input date-input" 
            placeholder="请选择成立日期"
            :value="formData.establishDate"
            disabled
          />
        </picker>
      </view>

      <!-- 注册地址 -->
      <view class="form-item" style="border-bottom: 2rpx solid #f5f5f5;">
        <text class="label required">注册地址:</text>
        <input 
          class="input" 
          placeholder="请输入注册地址"
          v-model="formData.registeredAddress"
        />
      </view>
    </view>

    <!-- 推荐人信息 -->
    <view class="referrer-section">
      <view class="referrer-item">
        <text class="referrer-label">推荐人</text>
        <text class="referrer-value">{{ referrerCode }}</text>
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
  ownerName: '',
  phone: '',
  password: '',
  confirmPassword: '',
  businessLicense: '',
  companyName: '',
  legalRepresentative: '',
  creditCode: '',
  establishDate: '',
  registeredAddress: ''
})

// 推荐人代码
const referrerCode = ref('UA000J3NEO')

// 日期选择处理
const onDateChange = (e) => {
  formData.value.establishDate = e.detail.value
}

// 上传营业执照
const uploadBusinessLicense = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      // 这里可以上传到服务器，现在先用本地路径
      formData.value.businessLicense = tempFilePath
      
      uni.showToast({
        title: '上传成功',
        icon: 'success'
      })
    },
    fail: (err) => {
      uni.showToast({
        title: '上传失败',
        icon: 'none'
      })
    }
  })
}

// 预览营业执照
const previewBusinessLicense = () => {
  uni.previewImage({
    urls: [formData.value.businessLicense],
    current: formData.value.businessLicense
  })
}

// 删除营业执照
const deleteBusinessLicense = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除营业执照吗？',
    success: (res) => {
      if (res.confirm) {
        formData.value.businessLicense = ''
      }
    }
  })
}

// 表单验证
const validateForm = () => {
  const { ownerName, phone, password, confirmPassword, businessLicense, companyName, legalRepresentative, creditCode, establishDate, registeredAddress } = formData.value
  
  if (!ownerName.trim()) {
    uni.showToast({ title: '请输入所属人姓名', icon: 'none' })
    return false
  }
  
  if (!phone.trim()) {
    uni.showToast({ title: '请输入手机号码', icon: 'none' })
    return false
  }
  
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone)) {
    uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
    return false
  }
  
  if (!password.trim()) {
    uni.showToast({ title: '请输入登录密码', icon: 'none' })
    return false
  }
  
  if (password.length < 6) {
    uni.showToast({ title: '密码长度不能少于6位', icon: 'none' })
    return false
  }
  
  if (!confirmPassword.trim()) {
    uni.showToast({ title: '请输入确认密码', icon: 'none' })
    return false
  }
  
  if (password !== confirmPassword) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return false
  }
  
  if (!businessLicense) {
    uni.showToast({ title: '请上传营业执照', icon: 'none' })
    return false
  }
  
  if (!companyName.trim()) {
    uni.showToast({ title: '请输入企业名称', icon: 'none' })
    return false
  }
  
  if (!legalRepresentative.trim()) {
    uni.showToast({ title: '请输入法定代表人姓名', icon: 'none' })
    return false
  }
  
  if (!creditCode.trim()) {
    uni.showToast({ title: '请输入统一社会信用代码', icon: 'none' })
    return false
  }
  
  if (!establishDate) {
    uni.showToast({ title: '请选择成立日期', icon: 'none' })
    return false
  }
  
  if (!registeredAddress.trim()) {
    uni.showToast({ title: '请输入注册地址', icon: 'none' })
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
    uni.showLoading({ title: '注册中...' })
    
    // 构建注册数据
    const registerData = {
      ...formData.value,
      referrerCode: referrerCode.value
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

<style scoped lang="scss">
@use './register.scss';
</style>