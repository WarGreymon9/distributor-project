<template>
    <view class="report-form">
      <!-- 基础信息 -->
      <view class="section">
        <view class="section-title">基础信息</view>
        <view class="form-item">
          <text class="label">&nbsp;&nbsp;&nbsp;团品日期</text>
          <picker 
            mode="date" 
            @change="onSelectDate" 
            :value="selectDate"
            style="width: 70%;"
          >
            <view class="picker-text">
              {{ selectDateText || '请选择团品日期' }}
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label required">分销人员</text>
          <!-- <text class="value">冲哥+瑞星（S001）</text> -->
          <picker 
            @change="onSelectUser" 
            :value="selectUser"
            style="width: 70%;"
          >
            <view class="picker-text">
              {{ selectUserText || '请选择分销人员' }}
            </view>
          </picker>
        </view>
      </view>
  
      <!-- 收货信息 -->
      <view class="section">
        <view class="section-title">收货信息</view>
        
        <!-- 智能识别 -->
        <view class="form-item">
          <text class="label">&nbsp;&nbsp;&nbsp;智能识别</text>
          <view class="input-group">
            <input 
              class="input" 
              placeholder="请粘贴需识别的内容" 
              v-model="recognizeText"
            />
            <button class="btn-recognize" @click="handleRecognize">粘贴并识别</button>
          </view>
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
        <view class="form-item">
          <text class="label required">详细地址</text>
          <input 
            class="input" 
            placeholder="请详填地址（识别后可修改）" 
            v-model="detailAddress"
          />
        </view>
  
        <!-- 收货人 -->
        <view class="form-item">
          <text class="label required">收货人</text>
          <view class="input-group">
          <picker 
            @change="onSelectUser" 
            :value="region"
            style="width: 70%;"
          >
            <input
              class="input" 
              placeholder="可输入关键字搜索" 
              v-model="receiverName"
            />
          </picker>

            <button class="btn-search">搜索</button>
          </view>
        </view>
  
        <!-- 收货电话 -->
        <view class="form-item">
          <text class="label required">收货电话</text>
          <input 
            class="input" 
            placeholder="请输入收货电话" 
            v-model="receiverPhone"
          />
        </view>
  
        <!-- 提示信息 -->
        <view class="warning-text">
          请注意核对收货地址是否正确！
        </view>
        <view class="info-text">
          本系统仅提供信息录入及统计功能，不承担任何作为生产、销售者的责任。
        </view>
      </view>
  
      <!-- 产品信息 -->
      <view class="section">
        <view class="section-title">产品信息</view>
        
        <!-- 产品名称 -->
        <view class="form-item">
          <text class="label required">产品名称</text>
          <picker @change="onProductChange" :range="productList" range-key="name">
            <view class="picker-text">
              {{ selectedProduct?.name || '请选择产品名称' }}
            </view>
          </picker>
        </view>
  
        <!-- 单数 -->
        <view class="form-item" style="display: flex; align-items: center; justify-content: space-between;">
          <text class="label-new required">单数(请注意是单数,不是数量)</text>
          <view class="quantity-control">
            <!-- <button class="btn-minus" @click="decreaseQuantity">-</button>
            <input class="quantity-input" v-model.number="quantity" type="number" />
            <button class="btn-plus" @click="increaseQuantity">+</button> -->
            <uni-number-box :min="0" :max="9999999999" :value="555" />
          </view>
        </view>
  
        <!-- 实际下单产品总数量 -->
        <view class="form-item" style="display: flex; align-items: center; justify-content: space-between;">
            <text class="label-new">&nbsp;&nbsp;&nbsp;实际下单产品总数量</text>
          <text class="total-quantity">{{ totalQuantity }}</text>
        </view>
  
        <!-- 备注 -->
        <view class="form-item">
          <text class="label">&nbsp;&nbsp;&nbsp;备注</text>
          <textarea 
            class="textarea"
            placeholder="请输入备注" 
            v-model="remark"
          ></textarea>
        </view>
      </view>
  
      <!-- 保存按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleSubmit">保存订单</button>
      </view>
    </view>
    <!-- <TabBar :current="currentTab" @change="handleTabChange" /> -->

  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  // import TabBar from '../../components/TabBar/index.vue'

  // 响应式数据
  const recognizeText = ref('')
  const region = ref([])
  const regionText = ref('')
  const selectUser = ref('')
  const selectUserText = ref('')
  const selectDate = ref('')
  const selectDateText = ref('')
  const detailAddress = ref('')
  const receiverName = ref('')
  const receiverPhone = ref('')
  const selectedProduct = ref(null)
  const quantity = ref(1)
  const remark = ref('')

  const currentTab = ref('reportForm')

  
  // 产品列表
  const productList = ref([
    { id: 1, name: '产品A', unitQuantity: 10 },
    { id: 2, name: '产品B', unitQuantity: 20 },
    { id: 3, name: '产品C', unitQuantity: 15 }
  ])
  
  // 计算总数量
  const totalQuantity = computed(() => {
    if (selectedProduct.value && quantity.value) {
      return selectedProduct.value.unitQuantity * quantity.value
    }
    return 0
  })
  // const handleTabChange = (tab) => {
  //   currentTab.value = tab
  //   // 这里可以处理tab切换逻辑，比如跳转到其他页面
  //   console.log('切换到:', tab)
  // }
  
  // 方法
  const handleRecognize = () => {
    // 智能识别逻辑
    uni.showToast({
      title: '识别功能开发中',
      icon: 'none'
    })
  }
  
  const onRegionChange = (e) => {
    region.value = e.detail.value
    regionText.value = e.detail.value.join(' ')
  }

  const onSelectDate = (e) => {
    console.log("e",e.detail.value);
    
    selectDate.value = e.detail.value
    selectDateText.value = e.detail.value
  }

  const onSelectUser = (e) => {
    selectUser.value = e.detail.value
    selectUserText.value = e.detail.value
  }
  
  const onProductChange = (e) => {
    selectedProduct.value = productList.value[e.detail.value]
  }
  
  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }
  
  const increaseQuantity = () => {
    quantity.value++
  }
  
  const handleSubmit = () => {
    // 表单验证
    if (!regionText.value) {
      uni.showToast({
        title: '请选择收货地区',
        icon: 'none'
      })
      return
    }
    
    if (!detailAddress.value) {
      uni.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
      return
    }
    
    if (!receiverName.value) {
      uni.showToast({
        title: '请填写收货人',
        icon: 'none'
      })
      return
    }
    
    if (!receiverPhone.value) {
      uni.showToast({
        title: '请填写收货电话',
        icon: 'none'
      })
      return
    }
    
    if (!selectedProduct.value) {
      uni.showToast({
        title: '请选择产品',
        icon: 'none'
      })
      return
    }
    
    // 提交订单
    const orderData = {
      region: regionText.value,
      detailAddress: detailAddress.value,
      receiverName: receiverName.value,
      receiverPhone: receiverPhone.value,
      product: selectedProduct.value,
      quantity: quantity.value,
      totalQuantity: totalQuantity.value,
      remark: remark.value
    }
    
    console.log('订单数据:', orderData)
    
    uni.showToast({
      title: '订单保存成功',
      icon: 'success'
    })
    
    // 可以在这里调用API保存订单
  }
  </script>
  
  <style lang="scss" scoped>
    @use './reportForm.scss';
  </style>