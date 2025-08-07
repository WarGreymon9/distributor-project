<template>
    <view class="order-item" v-for="(order, index) in filteredOrders" :key="index" @click="orderClick(order)">
        <view class="order-header">
            <text class="order-number">订单编号：{{ order.orderNumber }}</text>
            <text class="order-status" :class="getStatusClass(order.status)">{{ getStatusText(order.status) }}</text>
        </view>
          
        <view class="order-content">
            <image class="product-image" :src="order.productImage" mode="aspectFill"></image>
            <view class="product-info">
                <text class="product-name">{{ order.productName }}</text>
                <text class="product-quantity">{{ order.quantity }}</text>
                <text class="order-date">下单日期：{{ order.orderDate }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    filteredOrders: {
        type: Array,
        default: () => []
    }
})

  const getStatusText = (status) => {
    const statusMap = {
      'pending': '待发货',
      'shipped': '已发货',
      'completed': '已完成'
    }
    return statusMap[status] || '未知状态'
  }

  const getStatusClass = (status) => {
    return `status-${status}`
  }

  const orderClick = (order) => {
    uni.navigateTo({
      url: '/pages/orderDetails/index'
    })
  }

</script>

<style lang="scss" scoped>
    @use '../../pages/orderList/orderList.scss'
</style>