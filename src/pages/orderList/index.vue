<template>
    <view class="order-list-container">
      <!-- 状态筛选标签 -->
      <view class="status-tabs">
        <view 
          class="tab-item"
          :class="{ active: activeStatus === 'all' }"
          @click="switchStatus('all')"
        >
          <text>全部</text>
        </view>
        <view 
          class="tab-item"
          :class="{ active: activeStatus === 'pending' }"
          @click="switchStatus('pending')"
        >
          <text>待发货</text>
        </view>
        <view 
          class="tab-item"
          :class="{ active: activeStatus === 'shipped' }"
          @click="switchStatus('shipped')"
        >
          <text>已发货</text>
        </view>
        <view 
          class="tab-item"
          :class="{ active: activeStatus === 'completed' }"
          @click="switchStatus('completed')"
        >
          <text>已完成</text>
        </view>
      </view>
  
      <!-- 订单列表 -->
      <scroll-view class="order-list" scroll-y="true">        

        <OrderItem :filteredOrders = "filteredOrders"/>
      </scroll-view>
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
    },
    {
      orderNumber: '123456789123456',
      status: 'shipped',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'shipped',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
      productName: '传承百年国窖发酵工艺',
      quantity: '3瓶 X1',
      orderDate: '2025-06-19',
      productImage: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
    },
    {
      orderNumber: '123456789123456',
      status: 'completed',
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
  
  // 切换状态
  const switchStatus = (status) => {
    activeStatus.value = status
  }
  
//   // 获取状态文本
//   const getStatusText = (status) => {
//     const statusMap = {
//       'pending': '待发货',
//       'shipped': '已发货',
//       'completed': '已完成'
//     }
//     return statusMap[status] || '未知状态'
//   }
  
//   // 获取状态样式类
//   const getStatusClass = (status) => {
//     return `status-${status}`
//   }
  </script>
  
  <style scoped lang="scss">
    @use './orderList.scss'
  </style>