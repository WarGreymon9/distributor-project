<template>
    <view class="order-details-container">
      <!-- 收货地址信息 -->
      <view class="address-section">
        <view class="address-header">
          <view class="location-icon">📍</view>
          <view class="address-info">
            <view class="contact-info">
              <text class="name">包贝尔</text>
              <text class="phone">12345678912</text>
            </view>
            <text class="address">北京市北京市海淀区五道口购物中心发货v海北文和的发表vSUV就</text>
          </view>
        </view>
      </view>
  
      <!-- 订单信息 -->
      <!-- <view class="order-section">
        <view class="order-header">
          <view class="order-number">
            <text class="label">订单编号：</text>
            <text class="number">123456789123456</text>
          </view>
          <text class="order-status pending">待发货</text>
        </view> -->
        
        <!-- 商品信息 -->
        <!-- <view class="product-info">
          <image class="product-image" :src="orderData.productImage" mode="aspectFill"></image>
          <view class="product-details">
            <text class="product-name">{{ orderData.productName }}</text>
            <text class="product-quantity">{{ orderData.quantity }}</text>
            <text class="order-date">下单日期：{{ orderData.orderDate }}</text>
            <text class="product-price">¥{{ orderData.price }}</text>
          </view>
        </view>
      </view> -->
      <OrderItem :filteredOrders = "filteredOrders"/>
      <!-- 物流信息 -->
    <view class="logistics-section">
        <view class="section-title">
          <view class="title-bar"></view>
          <text class="title-text">物流信息</text>
        </view>
        
        <view class="tracking-info">
          <text class="tracking-number">圆通速递：YT255640280869</text>
        </view>
        
        <!-- 物流时间线 -->
        <view class="timeline">
          <!-- <view class="timeline-item" v-for="(item, index) in logisticsData" :key="index">
            <view class="timeline-dot" :class="{ active: index === 0 }"></view>
            <view class="timeline-content">
              <view class="timeline-time">{{ item.time }}</view>
              <view class="timeline-location">{{ item.location }}</view>
              <view class="timeline-status">{{ item.status }}</view>
            </view>
          </view> -->
          <uni-steps :options="list" active-color="#007AFF" :active="active" direction="column" />
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import OrderItem from '../../components/OrderItem/index.vue'

  
  const activeStatus = ref('all')
  
  // 模拟订单数据
  const orderList = ref([
    {
      orderNumber: '123456789123456',
      status: 'pending',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    }
  ])
  
  // 根据状态筛选订单
  const filteredOrders = computed(() => {
    if (activeStatus.value === 'all') {
      return orderList.value
    }
    return orderList.value.filter(order => order.status === activeStatus.value)
  })
  const active = ref(2);

  const list = ref([
                {
					title: '买家下单',
					desc: '2018-11-11',
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]);
  
  // 物流数据
//   const logisticsData = ref([
//     {
//       time: '2025-02-03 12:33',
//       location: '北京转运中心',
//       status: '已发出，下一站北京市海淀区营业部'
//     },
//     {
//       time: '2025-02-03 12:33',
//       location: '北京转运中心',
//       status: '已到达'
//     },
//     {
//       time: '2025-02-03 12:33',
//       location: '郑州转运中心',
//       status: '已发出，下一站北京转运中心'
//     },
//     {
//       time: '2025-02-03 12:33',
//       location: '郑州转运中心',
//       status: '已收入'
//     },
//     {
//       time: '2025-02-03 12:33',
//       location: '广东省东莞市新市有限公司',
//       status: '已揽收'
//     }
//   ])
  </script>
  
  <style scoped lang="scss">
    @use './orderDetails.scss';
  </style>