<template>
  <uni-popup ref="datePopupNew" type="top">
    <view class="date-picker-popup">
    <!-- <view class="popup-header">
      <text class="popup-title">订单列表</text>
      <text class="popup-close" @click="closeDatePicker">×</text>
    </view> -->
    
    <view class="date-picker-content">
      
      <view class="form-item" v-if="!props.isDistributorRanking">
        <text class="form-label">所属分销:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <!-- <view class="form-item">
        <text class="form-label">下级分销:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view> -->
      
      <view class="form-item" v-if="!props.isDistributorRanking">
        <text class="form-label">团品开始日期:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <view class="form-item" v-if="!props.isDistributorRanking">
        <text class="form-label">团品结束日期:</text>
        <picker mode="date" :value="endDate" @change="onEndDateChange">
          <view class="form-picker">{{ endDate || '2025-06-15' }}</view>
        </picker>
      </view>
      
      <view class="form-item" v-if="props.isDistributorRanking">
        <text class="form-label">团品日期:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
      <view class="form-item" v-if="props.isDistributorRanking">
        <text class="form-label">查看等级:</text>
        <picker mode="date" :value="startDate" @change="onStartDateChange">
          <view class="form-picker">{{ startDate || '2025-06-15' }}</view>
        </picker>
      </view>
    </view>

    
    <view class="popup-footer">
      <button class="popup-btn reset" @click="resetForm">重置</button>
      <button class="popup-btn search" @click="searchOrders">搜索</button>
    </view>
  </view>
</uni-popup>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
  
  // 搜索关键词
  
  // 日期选择
  const startDate = ref('2025-05-06')
  const endDate = ref('2025-06-06')

  // 在现有的 ref 数据中添加
  const orderNumber = ref('')
  const receiverName = ref('')
  const receiverPhone = ref('')
  const receiverAddress = ref('')
  const productName = ref('')

  const datePopupNew = ref(null)
  const props = defineProps({
    datePopup: {
      type: Object,
      default: () => ({})
    },
    isDistributorRanking: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['search', 'reset'])
  
  defineExpose({
    open: () => datePopupNew.value?.open(),
    close: () => datePopupNew.value?.close()
  })
    
//   const showProductDetail = (order) => {
//     uni.navigateTo({
//       url: '/pages/orderDetails/index'
//     })

//   }
  
//   // 获取状态样式类
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'pending':
//         return 'status-pending'
//       case 'shipped':
//         return 'status-shipped'
//       case 'delivered':
//         return 'status-delivered'
//       default:
//         return ''
//     }
//   }
  
//   // 显示日期选择器
//   const showDatePicker = () => {
//     datePopup.value?.open()
//   }
  
  // 关闭日期选择器
  const closeDatePicker = () => {
    datePopupNew.value?.close()
  }
  
  // 开始日期变化
  const onStartDateChange = (e) => {
    startDate.value = e.detail.value
  }
  
  // 结束日期变化
  const onEndDateChange = (e) => {
    endDate.value = e.detail.value
  }
  
//   // 确认日期范围
//   const confirmDateRange = () => {
//     if (!startDate.value || !endDate.value) {
//       uni.showToast({
//         title: '请选择完整的日期范围',
//         icon: 'none'
//       })
//       return
//     }
    
//     if (new Date(startDate.value) > new Date(endDate.value)) {
//       uni.showToast({
//         title: '开始日期不能大于结束日期',
//         icon: 'none'
//       })
//       return
//     }
    
//     searchKeyword.value = `日期:${startDate.value} 至 ${endDate.value},所属分销...`
//     closeDatePicker()
    
//     // 这里可以调用搜索API
//     searchOrders()
//   }
  
  // 搜索订单
  const searchOrders = () => {
  emit('search', {
    orderNumber: orderNumber.value,
    receiverName: receiverName.value,
    receiverPhone: receiverPhone.value,
    receiverAddress: receiverAddress.value,
    productName: productName.value,
    startDate: startDate.value,
    endDate: endDate.value
  })
  closeDatePicker()
}

const resetForm = () => {
  orderNumber.value = ''
  receiverName.value = ''
  receiverPhone.value = ''
  receiverAddress.value = ''
  productName.value = ''
  startDate.value = '2025-06-15'
  endDate.value = '2025-06-15'
  emit('reset')
}
  


  
  // 页面加载时获取订单列表
  onMounted(() => {
    // 这里可以调用API获取订单列表
    // loadOrderList()
  })
</script>

<style lang="scss" scoped>
    @use './DataScreening.scss';
</style>