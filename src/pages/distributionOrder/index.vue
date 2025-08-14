<template>
    <view class="distribution-order">
      <!-- 搜索区域 -->
      <!-- <view class="search-section">
        <view class="search-box">
          <uni-icons type="search" size="20" color="#999"></uni-icons>
          <input 
            class="search-input" 
            placeholder="日期:2025-05-06 至 2025-06-06,所属分销..."
            v-model="searchKeyword"
            @focus="showDatePicker"
            readonly
          />
          
        </view>
        <button class="export-btn" @click="exportOrders">
            导出
          </button>
      </view> -->
      <view style=" position: sticky; top: 0; z-index: 100; width: 100%; display: flex; justify-content: space-between; align-items: center; background-color: #fff; padding: 20rpx; box-sizing: border-box;">  
        <input 
          style="width: 75%; padding: 12rpx 20rpx; background-color: rgb(242, 242, 242); border-radius: 32rpx;"
          placeholder="日期:2025-05-06 至 2025-06-06,所属分销..."
          v-model="searchKeyword"
          @focus="showDatePicker"
          readonly
        />
        <view>
            <button class="export-btn" @click="exportOrders">
              导出
            </button>
        </view>
      </view>
  
      <!-- 订单列表 -->
      <view class="order-list">
        <view 
          class="order-item" 
          v-for="(order, index) in orderList" 
          :key="order.id"
        >
          <!-- 订单头部 -->
          <view class="order-header">
            <view class="order-info">
              <text class="order-number">订单编号: {{ order.orderNumber }}</text>
              <text class="order-status" :class="getStatusClass(order.status)">{{ order.statusText }}</text>
            </view>
          </view>
  
          <!-- 商品信息 -->
          <view class="product-section" @click="showProductDetail">
            <view class="product-image">
              <image :src="order.productImage" mode="aspectFill"></image>
            </view>
            
            <view class="product-details">
              <view class="product-title">
                <text class="product-type">普通商品:</text>
                <text class="product-name">{{ order.productName }}</text>
              </view>
              
              <view class="product-specs">
                <view class="spec-row">
                  <text class="spec-label" style="min-width: 50%;">3瓶 X1</text>
                  <text class="spec-date">下单日期: {{ order.orderDate }}</text>
                </view>
                
                <view class="spec-row">
                  <text class="spec-quantity"  style="min-width: 50%;">单数: {{ order.quantity }}</text>
                  <text class="spec-distributor">所属分销: 
                    <text class="distributor-links">
                      <text class="distributor-link" v-for="(dist, idx) in order.distributors" :key="idx">
                        {{ dist }}<text v-if="idx < order.distributors.length - 1">+</text>
                      </text>
                    </text>
                  </text>
                </view>
                
                <view class="price-row">
                  <text class="price-label"  style="min-width: 50%;">售价: <text class="price-value">{{ order.salePrice }}元</text></text>
                  <text class="amount-label">上交金额: <text class="amount-value">{{ order.submitAmount }}元</text></text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 日期选择弹窗 -->
    <uni-popup ref="datePopup" type="top">
    <view class="date-picker-popup">
    <view class="popup-header">
      <text class="popup-title">订单列表</text>
      <text class="popup-close" @click="closeDatePicker">×</text>
    </view>
    
    <view class="date-picker-content">
      <view class="form-item">
        <text class="form-label">订单编号:</text>
        <input class="form-input" placeholder="请输入订单编号" v-model="orderNumber" />
      </view>
      
      <view class="form-item">
        <text class="form-label">收货人:</text>
        <input class="form-input" placeholder="请输入收货人" v-model="receiverName" />
      </view>
      
      <view class="form-item">
        <text class="form-label">收货电话:</text>
        <input class="form-input" placeholder="请输入收货电话" v-model="receiverPhone" />
      </view>
      
      <view class="form-item">
        <text class="form-label">收货地址:</text>
        <input class="form-input" placeholder="请输入收货地址" v-model="receiverAddress" />
      </view>
      
      <view class="form-item">
        <text class="form-label">商品名称:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="form-label">所属分销:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="form-label">下级分销:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="form-label">团品开始日期:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="form-label">团品结束日期:</text>
        <picker mode="date" :value="endDate" @change="onEndDateChange">
          <view class="form-picker">{{ endDate || '2025-06-15' }}</view>
        </picker>
      </view>
    </view>
    
    <view class="popup-footer">
      <button class="popup-btn reset" @click="resetForm">重置</button>
      <button class="popup-btn search" @click="searchOrders">搜索</button>
    </view>
  </view>
</uni-popup>
    </view>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  // 搜索关键词
  const searchKeyword = ref('日期:2025-05-06 至 2025-06-06,所属分销...')
  
  // 日期选择
  const startDate = ref('2025-05-06')
  const endDate = ref('2025-06-06')
  const datePopup = ref(null)

  // 在现有的 ref 数据中添加
  const orderNumber = ref('')
  const receiverName = ref('')
  const receiverPhone = ref('')
  const receiverAddress = ref('')
  const productName = ref('')

// 添加重置表单方法
  const resetForm = () => {
    orderNumber.value = ''
    receiverName.value = ''
    receiverPhone.value = ''
    receiverAddress.value = ''
    productName.value = ''
    startDate.value = '2025-06-15'
    endDate.value = '2025-06-15'
  }
  
  // 订单列表数据
  const orderList = ref([
    {
      id: 1,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 2,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 3,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 4,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 5,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 6,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 7,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 8,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 9,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 10,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 11,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 12,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    },
    {
      id: 13,
      orderNumber: '123456789123456',
      status: 'pending',
      statusText: '待发货',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg',
      productName: '传承百年固态发酵工艺',
      orderDate: '2025-06-19',
      quantity: 1,
      distributors: ['冲哥', '福星'],
      salePrice: '49',
      submitAmount: '44'
    }
  ])

  const showProductDetail = (order) => {
    uni.navigateTo({
      url: '/pages/orderDetails/index'
    })

  }
  
  // 获取状态样式类
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending'
      case 'shipped':
        return 'status-shipped'
      case 'delivered':
        return 'status-delivered'
      default:
        return ''
    }
  }
  
  // 显示日期选择器
  const showDatePicker = () => {
    datePopup.value?.open()
  }
  
  // 关闭日期选择器
  const closeDatePicker = () => {
    datePopup.value?.close()
  }
  
  // 开始日期变化
  const onStartDateChange = (e) => {
    startDate.value = e.detail.value
  }
  
  // 结束日期变化
  const onEndDateChange = (e) => {
    endDate.value = e.detail.value
  }
  
  // 确认日期范围
  const confirmDateRange = () => {
    if (!startDate.value || !endDate.value) {
      uni.showToast({
        title: '请选择完整的日期范围',
        icon: 'none'
      })
      return
    }
    
    if (new Date(startDate.value) > new Date(endDate.value)) {
      uni.showToast({
        title: '开始日期不能大于结束日期',
        icon: 'none'
      })
      return
    }
    
    searchKeyword.value = `日期:${startDate.value} 至 ${endDate.value},所属分销...`
    closeDatePicker()
    
    // 这里可以调用搜索API
    searchOrders()
  }
  
  // 搜索订单
  const searchOrders = () => {
    uni.showLoading({
      title: '搜索中...'
    })
    
    // 模拟API调用
    setTimeout(() => {
      uni.hideLoading()
      uni.showToast({
        title: '搜索完成',
        icon: 'success'
      })
    }, 1000)
  }
  
  // 导出订单
  const exportOrders = () => {
    uni.showLoading({
      title: '导出中...'
    })
    
    // 模拟导出功能
    setTimeout(() => {
      uni.hideLoading()
      uni.showToast({
        title: '导出成功',
        icon: 'success'
      })
    }, 2000)
  }
  
  // 页面加载时获取订单列表
  onMounted(() => {
    // 这里可以调用API获取订单列表
    // loadOrderList()
  })
  </script>

  <style lang="scss" scoped>
    @use './distributionOrder.scss';
  </style>