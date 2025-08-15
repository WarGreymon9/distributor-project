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
      <canvas 
        id="ocrCanvas"
        type="2d"
        style="position: fixed; top: -1000px; left: -1000px; width: 1px; height: 1px;"
      ></canvas>
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
      </view>{{ test }}

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
      console.log("tempFilePath", tempFilePath);
      
      // 保存图片路径
      formData.value.businessLicense = tempFilePath
      
      // 显示加载提示
      uni.showLoading({
        title: 'OCR识别中...'
      })
      
      // 调用OCR识别功能
      performOCRRecognition(tempFilePath)
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
const test = ref("识别到的文字")
// OCR识别功能
const performOCRRecognition = (imagePath) => {
  // 首先需要将图片转换为ArrayBuffer
  convertImageToArrayBuffer(imagePath).then(({ frameBuffer, width, height }) => {
    
    // 创建VK会话
    const session = wx.createVKSession({
      track: {
        OCR: { mode: 2 } // mode: 2 - 手动传入图像
      },
    })
    
    // 监听OCR识别结果
    session.on('updateAnchors', anchors => {
      const recognizedText = anchors.map(anchor => anchor.text).join('')
      console.log('识别到的文字:', recognizedText)
      test.value = recognizedText
      
      // 解析营业执照信息
      parseBusinessLicenseInfo(recognizedText)
      
      // 关闭加载提示
      uni.hideLoading()
      
      uni.showToast({
        title: 'OCR识别完成',
        icon: 'success'
      })
    })
    
    // 启动OCR会话
    session.start(errno => {
      if (errno) {
        console.error('OCR启动失败:', errno)
        uni.hideLoading()
        uni.showToast({
          title: 'OCR识别失败',
          icon: 'none'
        })
      } else {
        // 执行OCR检测
        session.runOCR({
          frameBuffer, // 图片 ArrayBuffer 数据
          width,       // 图像宽度
          height,      // 图像高度
        })
      }
    })
    
  }).catch(error => {
    console.error('图片转换失败:', error)
    uni.hideLoading()
    uni.showToast({
      title: '图片处理失败',
      icon: 'none'
    })
  })
}

// 将图片转换为ArrayBuffer
const convertImageToArrayBuffer = (imagePath) => {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    // 使用新版Canvas API
    const query = uni.createSelectorQuery()
    query.select('#ocrCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
          reject(new Error('Canvas节点获取失败'))
          return
        }
        
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          reject(new Error('Canvas上下文创建失败'))
          return
        }
        
        // 获取图片信息
        uni.getImageInfo({
          src: imagePath,
          success: (imageInfo) => {
            const { width, height } = imageInfo
            
            // 设置canvas尺寸
            canvas.width = width
            canvas.height = height
            
            // 创建图片对象
            const img = canvas.createImage()
            img.onload = () => {
              try {
                // 绘制图片
                ctx.drawImage(img, 0, 0, width, height)
                
                // 获取图片数据
                const imageData = ctx.getImageData(0, 0, width, height)
                
                resolve({
                  frameBuffer: imageData.data.buffer,
                  width: width,
                  height: height
                })
              } catch (error) {
                console.error('图片处理失败:', error)
                reject(new Error('图片处理失败'))
              }
            }
            
            img.onerror = () => {
              reject(new Error('图片加载失败'))
            }
            
            img.src = imagePath
          },
          fail: reject
        })
      })
    // #endif
    
    // #ifndef MP-WEIXIN
    reject(new Error('OCR功能仅在微信小程序中可用'))
    // #endif
  })
}

const parseBusinessLicenseInfo = (text) => {
  // 优化后的正则表达式，适应OCR识别的不规律文本
  const patterns = {
    // 统一社会信用代码：匹配18位字母数字组合
    creditCode: /([A-Z0-9]{18})/,
    
    // 企业名称：在"名称"前后查找，或直接匹配公司结尾的名称
    companyName: /(?:名称|企业名称|公司名称)[^\u4e00-\u9fa5]*([\u4e00-\u9fa5]+(?:公司|企业|集团|有限责任公司|股份有限公司))/,
    
    // 法定代表人：在"法定代表人"、"法人"等关键词后查找中文姓名
    legalPerson: /(?:法定代表人|法人|代表人)[^\u4e00-\u9fa5]*([\u4e00-\u9fa5]{2,4})/,
    
    // 注册资本：匹配数字+万元、元等单位
    registeredCapital: /(?:注册资本|资本)[^0-9]*([0-9]+(?:\.[0-9]+)?[万千百十]*元?)/,
    
    // 成立日期：匹配YYYY年MM月DD日格式
    establishDate: /(?:成立日期|成立时间)[^0-9]*([0-9]{4}年[0-9]{1,2}月[0-9]{1,2}日)/,
    
    // 经营范围：匹配"经营范围"后的长文本
    businessScope: /(?:经营范围)[^\u4e00-\u9fa5]*([\u4e00-\u9fa5，。；：、\s]{20,}?)(?=依法|国家|\s*$)/
  }
  
  // 提取信息并自动填充表单
  Object.keys(patterns).forEach(key => {
    const match = text.match(patterns[key])
    if (match && match[1]) {
      let value = match[1].trim()
      
      // 对特定字段进行后处理
      if (key === 'companyName') {
        // 清理企业名称中的多余字符
        value = value.replace(/[^\u4e00-\u9fa5\(\)（）]/g, '')
      } else if (key === 'creditCode') {
        // 确保信用代码格式正确
        value = value.toUpperCase()
      } else if (key === 'legalPerson') {
        // 确保法定代表人只包含中文
        value = value.replace(/[^\u4e00-\u9fa5]/g, '')
      }
      
      // 根据字段自动填充表单
      switch(key) {
        case 'companyName':
          formData.value.companyName = value
          break
        case 'creditCode':
          formData.value.creditCode = value
          break
        case 'legalPerson':
          formData.value.legalPerson = value
          break
        case 'registeredCapital':
          formData.value.registeredCapital = value
          break
        case 'establishDate':
          formData.value.establishDate = value
          break
        case 'businessScope':
          formData.value.businessScope = value
          break
      }
      
      console.log(`自动填充 ${key}:`, value)
    }
  })
  
  // 提示用户检查自动填充的信息
  uni.showModal({
    title: '信息识别完成',
    content: '已自动填充营业执照信息，请检查并确认',
    showCancel: false
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