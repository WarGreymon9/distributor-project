<template>
    <view class="address-manage">
      <!-- 表单区域 -->
      <view class="form-section">
        <!-- 收货人 -->
        <view class="form-item">
          <text class="label required">收货人</text>
          <input 
            class="input" 
            placeholder="请输入收货人"
            v-model="formData.receiverName"
          />
        </view>
  
        <!-- 收货电话 -->
        <view class="form-item">
          <text class="label required">收货电话</text>
          <input 
            class="input" 
            placeholder="请输入收货电话"
            v-model="formData.receiverPhone"
            type="number"
          />
        </view>
  
        <!-- 收货地区 -->
        <view class="form-item">
          <text class="label required">收货地区</text>
          <picker 
            mode="region" 
            @change="onRegionChange" 
            :value="region"
            style="width: 70%;"
          >
            <view class="picker-text">
              {{ regionText || '请选择收货地区' }}
            </view>
          </picker>
        </view>
  
        <!-- 详细地址 -->
        <view class="form-item address-item" style="display: flex; flex-direction: column; height: 300rpx; gap: 12rpx;">
          <text class="label required">详细地址</text>
          <textarea 
            class="textarea" 
            placeholder="请输入详细地址"
            v-model="formData.detailAddress"
            maxlength="200"
          ></textarea>
        </view>
      </view>
  
      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleSave">保存地址</button>
      </view>
  
      <!-- 地区选择弹窗 -->
      <uni-popup ref="regionPopup" type="bottom">
        <view class="popup-content">
          <view class="popup-header">
            <text class="popup-title">选择收货地区</text>
            <text class="popup-close" @click="closeRegionPicker">取消</text>
          </view>
          <picker-view 
            class="picker-view" 
            :value="pickerValue" 
            @change="onPickerChange"
          >
            <picker-view-column>
              <view 
                class="picker-item" 
                v-for="(province, index) in provinces" 
                :key="index"
              >
                {{ province.name }}
              </view>
            </picker-view-column>
            <picker-view-column>
              <view 
                class="picker-item" 
                v-for="(city, index) in cities" 
                :key="index"
              >
                {{ city.name }}
              </view>
            </picker-view-column>
            <picker-view-column>
              <view 
                class="picker-item" 
                v-for="(area, index) in areas" 
                :key="index"
              >
                {{ area.name }}
              </view>
            </picker-view-column>
          </picker-view>
          <view class="popup-footer">
            <button class="popup-btn cancel" @click="closeRegionPicker">取消</button>
            <button class="popup-btn confirm" @click="confirmRegion">确认</button>
          </view>
        </view>
      </uni-popup>
    </view>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  // 表单数据
  const formData = ref({
    receiverName: '',
    receiverPhone: '',
    region: [],
    detailAddress: ''
  })
  
  // 地区选择相关
  const regionText = ref('')
  const pickerValue = ref([0, 0, 0])
  const region = ref([])
  const remark = ref('')

  
  // 模拟地区数据（实际项目中应该从API获取）
  const provinces = ref([
    { name: '北京市', code: '110000' },
    { name: '上海市', code: '310000' },
    { name: '广东省', code: '440000' },
    { name: '浙江省', code: '330000' },
    { name: '江苏省', code: '320000' }
  ])
  
  const allCities = ref({
    '110000': [{ name: '北京市', code: '110100' }],
    '310000': [{ name: '上海市', code: '310100' }],
    '440000': [
      { name: '广州市', code: '440100' },
      { name: '深圳市', code: '440300' },
      { name: '珠海市', code: '440400' }
    ],
    '330000': [
      { name: '杭州市', code: '330100' },
      { name: '宁波市', code: '330200' }
    ],
    '320000': [
      { name: '南京市', code: '320100' },
      { name: '苏州市', code: '320500' }
    ]
  })
  
  const allAreas = ref({
    '110100': [{ name: '东城区', code: '110101' }, { name: '西城区', code: '110102' }],
    '310100': [{ name: '黄浦区', code: '310101' }, { name: '徐汇区', code: '310104' }],
    '440100': [{ name: '荔湾区', code: '440103' }, { name: '越秀区', code: '440104' }],
    '440300': [{ name: '罗湖区', code: '440303' }, { name: '福田区', code: '440304' }],
    '440400': [{ name: '香洲区', code: '440402' }, { name: '斗门区', code: '440403' }],
    '330100': [{ name: '上城区', code: '330102' }, { name: '下城区', code: '330103' }],
    '330200': [{ name: '海曙区', code: '330203' }, { name: '江北区', code: '330205' }],
    '320100': [{ name: '玄武区', code: '320102' }, { name: '秦淮区', code: '320104' }],
    '320500': [{ name: '虎丘区', code: '320505' }, { name: '吴中区', code: '320506' }]
  })
  
  // 计算当前选中的城市和区域
  const cities = computed(() => {
    const provinceCode = provinces.value[pickerValue.value[0]]?.code
    return allCities.value[provinceCode] || []
  })
  
  const areas = computed(() => {
    const cityCode = cities.value[pickerValue.value[1]]?.code
    return allAreas.value[cityCode] || []
  })
  
  // 监听省份变化，重置市和区的选择
  watch(() => pickerValue.value[0], () => {
    pickerValue.value[1] = 0
    pickerValue.value[2] = 0
  })
  
  // 监听城市变化，重置区的选择
  watch(() => pickerValue.value[1], () => {
    pickerValue.value[2] = 0
  })
  
  // 方法
  // const showRegionPicker = () => {
  //   uni.$refs.regionPopup?.open()
  // }
  
  const closeRegionPicker = () => {
    uni.$refs.regionPopup?.close()
  }
  
  const onPickerChange = (e) => {
    pickerValue.value = e.detail.value
  }
  
  const confirmRegion = () => {
    const province = provinces.value[pickerValue.value[0]]
    const city = cities.value[pickerValue.value[1]]
    const area = areas.value[pickerValue.value[2]]
    
    if (province && city && area) {
      formData.value.region = [province.name, city.name, area.name]
      regionText.value = formData.value.region.join(' ')
      closeRegionPicker()
    } else {
      uni.showToast({
        title: '请选择完整的地区信息',
        icon: 'none'
      })
    }
  }

  const onRegionChange = (e) => {
    region.value = e.detail.value
    regionText.value = e.detail.value.join(' ')
  }
  
  // 表单验证
  const validateForm = () => {
    const { receiverName, receiverPhone, region, detailAddress } = formData.value
    
    if (!receiverName.trim()) {
      uni.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return false
    }
    
    if (!receiverPhone.trim()) {
      uni.showToast({
        title: '请输入收货电话',
        icon: 'none'
      })
      return false
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(receiverPhone)) {
      uni.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return false
    }
    
    if (!region.length) {
      uni.showToast({
        title: '请选择收货地区',
        icon: 'none'
      })
      return false
    }
    
    if (!detailAddress.trim()) {
      uni.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false
    }
    
    return true
  }
  
  // 保存地址
  const handleSave = async () => {
    if (!validateForm()) {
      return
    }
    
    try {
      uni.showLoading({
        title: '保存中...'
      })
      
      // 这里调用保存地址的API
      // const result = await saveAddressApi(formData.value)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      uni.hideLoading()
      
      uni.showToast({
        title: '地址保存成功',
        icon: 'success'
      })
      
      // 保存成功后可以返回上一页或跳转到地址列表
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
      
    } catch (error) {
      uni.hideLoading()
      uni.showToast({
        title: error.message || '保存失败，请重试',
        icon: 'none'
      })
    }
  }
  </script>
  
  <style lang="scss" scoped>
    @use './addressManage.scss'
  </style>