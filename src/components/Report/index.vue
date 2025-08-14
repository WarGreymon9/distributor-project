<template>
    <view class="product-container" v-for="productInfo in productInfoList">
        <view class="product-image-container">
          <image 
            :src="productInfo.image" 
            class="product-image" 
            mode="aspectFill"
          ></image>
        </view>
    
        <!-- 产品信息 -->
        <view class="product-info">
          <view class="info-row">
            <text class="info-label">【规格】</text>
            <text class="info-value">{{ productInfo.specification }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">【容量】</text>
            <text class="info-value">{{ productInfo.capacity }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">【香型】</text>
            <text class="info-value">{{ productInfo.aroma }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">【价格】</text>
            <text class="info-value">{{ productInfo.price }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">【厂商】</text>
            <text class="info-value">{{ productInfo.manufacturer }}</text>
          </view>
        </view>
    
        <!-- 价格和库存信息 -->
        <view class="price-stock-info">
          <view class="price-section">
            <view class="price-item">
              <text class="price-label">市场价:</text>
              <text class="price-value member-price">{{ productInfo.marketPrice }}</text>
            </view>
            <view class="price-item">
              <text class="price-label">会员价:</text>
              <text class="price-value member-price">{{ productInfo.memberPrice }}</text>
            </view>
            <view class="price-item">
              <text class="price-label">价差:</text>
              <text class="price-value member-price">{{ productInfo.priceDiff }}</text>
            </view>
          </view>
          <view class="price-section">
            <view class="price-item">
              <text class="price-label">推广费:</text>
              <text class="price-value">{{ productInfo.stock }}</text>
            </view>
            <view class="price-item">
              <text class="price-label">单量:</text>
              <text class="price-value">{{ productInfo.stock }}</text>
            </view>
            <view class="price-item">
              <text class="price-label">库存:</text>
              <text class="price-value">{{ productInfo.stock }}</text>
            </view>
          </view>
        </view>
        <view class="bottom-action-btns">
          <view class="action-btn order-btn" @click="goToOrder">
            <text class="btn-text">订单</text>
          </view>
          <view class="action-btn stock-btn" @click="goToStock">
            <text class="btn-text">库存</text>
          </view>
          <view class="action-btn report-btn" @click="goToReport">
            <text class="btn-text">报表</text>
          </view>
        </view>
  
        <!-- 底部操作按钮 -->
      </view>
  <view v-if="showStockModal" class="stock-modal-overlay" @click="closeStockModal">
    <view class="stock-modal" @click.stop>
      <view class="stock-table">
        <view class="table-header">
          <view class="header-cell">规格名称</view>
          <view class="header-cell">库存</view>
        </view>
        <view class="table-row" v-for="(item, index) in stockData" :key="index">
          <view class="table-cell">{{ item.name }}</view>
          <view class="table-cell">{{ item.stock }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 响应式数据
const activeNavTab = ref('marketing')
const productId = ref('')
const showStockModal = ref(false)

const stockData = ref([
  { name: '总库存（数量）', stock: '1496' }
])
// 产品信息
const props = defineProps({
    productInfoList: {
        type: Object,
        default: () => ({

        })
    }
})

// 页面加载时获取产品ID
onLoad((options) => {
  if (options.id) {
    productId.value = options.id
    loadProductInfo()
  }
})



// 加载产品信息
const loadProductInfo = async () => {
  try {
    // 这里应该调用API获取产品详情
    console.log('加载产品信息:', productId.value)
  } catch (error) {
    console.error('加载产品信息失败:', error)
  }
}

// 跳转到订单页面
const goToOrder = () => {
  uni.navigateTo({
    url: '/pages/orderList/index'
  })
}

// 跳转到库存页面
const goToStock = () => {
  showStockModal.value = true
}

// 关闭库存弹窗
const closeStockModal = () => {
  showStockModal.value = false
}

// 跳转到报表页面
const goToReport = () => {
  uni.navigateTo({
    url: '/pages/reportForm/index'
  })
}

onMounted(() => {
  console.log('产品详情页面加载完成')
})
</script>

<style lang="scss" scoped>
  @use './Report.scss';
</style>