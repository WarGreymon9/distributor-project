<template>
    <view class="report-form">
      <!-- 基础信息 -->
      <view class="section">
        <view class="section-title">基础信息</view>
        <view class="form-item">
          <text class="label">团品日期</text>
          <picker mode="date" :value="formData.orderDate" @change="onDateChange">
            <view class="picker-value">{{ formData.orderDate }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">分销人员</text>
          <text class="value">{{ formData.distributor }}</text>
        </view>
      </view>
  
      <!-- 收货信息 -->
      <view class="section">
        <view class="section-title">收货信息</view>
        
        <!-- 智能识别 -->
        <view class="form-item">
          <text class="label">智能识别</text>
          <button class="smart-btn" @click="smartRecognition">粘贴并识别</button>
        </view>
        
        <!-- 收货地区 -->
        <view class="form-item" @click="showRegionPicker">
          <text class="label">收货地区</text>
          <view class="picker-value">{{ formData.region || '请选择收货地区' }}</view>
        </view>
        
        <!-- 详细地址 -->
        <view class="form-item">
          <text class="label">详细地址</text>
          <input 
            class="input" 
            v-model="formData.detailAddress" 
            placeholder="请识别地址，识别后可修改"
          />
        </view>
        
        <!-- 收货人 -->
        <view class="form-item">
          <text class="label">收货人</text>
          <view class="search-input">
            <input 
              class="input" 
              v-model="formData.receiver" 
              placeholder="可输入关键字搜索"
              @input="searchReceiver"
            />
            <button class="search-btn" @click="searchReceiver">搜索</button>
          </view>
        </view>
        
        <!-- 收货电话 -->
        <view class="form-item">
          <text class="label">收货电话</text>
          <input 
            class="input" 
            v-model="formData.phone" 
            placeholder="请输入收货电话"
            type="number"
          />
        </view>
      </view>
  
      <!-- 产品信息 -->
      <view class="section">
        <view class="section-title">产品信息</view>
        
        <!-- 产品名称 -->
        <view class="form-item" @click="showProductPicker">
          <text class="label">产品名称</text>
          <view class="picker-value">{{ formData.productName || '请选择产品名称' }}</view>
        </view>
        
        <!-- 单数 -->
        <view class="form-item">
          <text class="label">单数(请注意是单数，不是数量)</text>
          <view class="counter">
            <button class="counter-btn" @click="decreaseCount">-</button>
            <text class="counter-value">{{ formData.unitCount }}</text>
            <button class="counter-btn" @click="increaseCount">+</button>
          </view>
        </view>
        
        <!-- 实际下单产品总数量 -->
        <view class="form-item">
          <text class="label">实际下单产品总数量</text>
          <text class="total-count">{{ totalProductCount }}</text>
        </view>
        
        <!-- 备注 -->
        <view class="form-item">
          <text class="label">备注</text>
          <input 
            class="input" 
            v-model="formData.remark" 
            placeholder="请输入备注"
          />
        </view>
      </view>
  
      <!-- 保存订单 -->
      <view class="save-section">
        <button class="save-btn" @click="saveOrder">保存订单</button>
      </view>
  
      <!-- 地区选择弹窗 -->
      <uni-popup ref="regionPopup" type="bottom">
        <view class="popup-content">
          <view class="popup-header">
            <text class="popup-title">选择收货地区</text>
            <text class="popup-close" @click="closeRegionPicker">取消</text>
          </view>
          <view class="region-list">
            <view 
              class="region-item" 
              v-for="region in regionList" 
              :key="region.id"
              @click="selectRegion(region)"
            >
              {{ region.name }}
            </view>
          </view>
        </view>
      </uni-popup>
  
      <!-- 产品选择弹窗 -->
      <uni-popup ref="productPopup" type="bottom">
        <view class="popup-content">
          <view class="popup-header">
            <text class="popup-title">选择产品</text>
            <text class="popup-close" @click="closeProductPicker">取消</text>
          </view>
          <view class="search-box">
            <input 
              class="search-input" 
              v-model="productSearchKey" 
              placeholder="输入关键字搜索"
              @input="searchProduct"
            />
          </view>
          <view class="product-list">
            <view 
              class="product-item" 
              v-for="product in filteredProductList" 
              :key="product.id"
              @click="selectProduct(product)"
            >
              {{ product.name }}
            </view>
          </view>
          <view class="popup-footer">
            <button class="popup-btn cancel" @click="closeProductPicker">取消</button>
            <button class="popup-btn confirm" @click="confirmProduct">确认</button>
          </view>
        </view>
      </uni-popup>
  
      <!-- 确认弹窗 -->
      <uni-popup ref="confirmPopup" type="center">
        <view class="confirm-popup">
          <text class="confirm-title">请再次确认收货地址</text>
          <view class="confirm-address">
            <text>{{ formData.region }} {{ formData.detailAddress }}</text>
          </view>
          <view class="confirm-buttons">
            <button class="confirm-btn cancel" @click="closeConfirmPopup">取消</button>
            <button class="confirm-btn confirm" @click="confirmOrder">确认</button>
          </view>
        </view>
      </uni-popup>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          orderDate: this.getCurrentDate(),
          distributor: '冲哥+瑞星（S001）', // 自动识别当前登录账号
          region: '',
          detailAddress: '',
          receiver: '',
          phone: '',
          productName: '',
          unitCount: 1,
          remark: ''
        },
        regionList: [
          { id: 1, name: '北京市' },
          { id: 2, name: '上海市' },
          { id: 3, name: '广州市' },
          { id: 4, name: '深圳市' },
          { id: 5, name: '杭州市' }
        ],
        productList: [
          { id: 1, name: '普通商品：不锈钢炒锅一个', count: 1 },
          { id: 2, name: '普通商品：电饭煲一个', count: 1 },
          { id: 3, name: '普通商品：保温杯一个', count: 1 },
          { id: 4, name: '套装商品：厨具三件套', count: 3 }
        ],
        filteredProductList: [],
        productSearchKey: '',
        selectedProduct: null
      }
    },
    computed: {
      totalProductCount() {
        if (this.selectedProduct) {
          return this.formData.unitCount * this.selectedProduct.count
        }
        return 0
      }
    },
    mounted() {
      this.filteredProductList = this.productList
    },
    methods: {
      getCurrentDate() {
        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      },
      
      onDateChange(e) {
        this.formData.orderDate = e.detail.value
      },
      
      smartRecognition() {
        // 智能识别功能 - 获取剪贴板内容并解析地址信息
        uni.getClipboardData({
          success: (res) => {
            const clipboardData = res.data
            // 这里可以添加地址解析逻辑
            this.parseAddress(clipboardData)
          },
          fail: () => {
            uni.showToast({
              title: '获取剪贴板失败',
              icon: 'none'
            })
          }
        })
      },
      
      parseAddress(text) {
        // 简单的地址解析示例
        // 实际项目中可以调用第三方地址解析API
        if (text.includes('北京')) {
          this.formData.region = '北京市'
        } else if (text.includes('上海')) {
          this.formData.region = '上海市'
        }
        this.formData.detailAddress = text
      },
      
      showRegionPicker() {
        this.$refs.regionPopup.open()
      },
      
      closeRegionPicker() {
        this.$refs.regionPopup.close()
      },
      
      selectRegion(region) {
        this.formData.region = region.name
        this.closeRegionPicker()
      },
      
      searchReceiver() {
        // 搜索收货人功能 - 从历史客户数据中搜索
        if (this.formData.receiver) {
          // 这里可以调用API搜索历史客户
          console.log('搜索收货人:', this.formData.receiver)
        }
      },
      
      showProductPicker() {
        this.$refs.productPopup.open()
      },
      
      closeProductPicker() {
        this.$refs.productPopup.close()
      },
      
      searchProduct() {
        if (this.productSearchKey) {
          this.filteredProductList = this.productList.filter(product => 
            product.name.includes(this.productSearchKey)
          )
        } else {
          this.filteredProductList = this.productList
        }
      },
      
      selectProduct(product) {
        this.selectedProduct = product
        this.formData.productName = product.name
      },
      
      confirmProduct() {
        if (this.selectedProduct) {
          this.closeProductPicker()
        } else {
          uni.showToast({
            title: '请选择产品',
            icon: 'none'
          })
        }
      },
      
      decreaseCount() {
        if (this.formData.unitCount > 1) {
          this.formData.unitCount--
        }
      },
      
      increaseCount() {
        this.formData.unitCount++
      },
      
      saveOrder() {
        this.$refs.confirmPopup.open()
      },
      
      closeConfirmPopup() {
        this.$refs.confirmPopup.close()
      },
      
      confirmOrder() {
        // 验证必填信息
        if (!this.formData.receiver) {
          uni.showToast({
            title: '收货人不能为空',
            icon: 'none'
          })
          return
        }
        
        if (!this.formData.phone) {
          uni.showToast({
            title: '收货电话不能为空',
            icon: 'none'
          })
          return
        }
        
        if (!this.formData.region || !this.formData.detailAddress) {
          uni.showToast({
            title: '收货地址不能为空',
            icon: 'none'
          })
          return
        }
        
        if (!this.formData.productName) {
          uni.showToast({
            title: '请选择产品',
            icon: 'none'
          })
          return
        }
        
        // 保存订单逻辑
        console.log('保存订单:', this.formData)
        uni.showToast({
          title: '订单保存成功',
          icon: 'success'
        })
        
        this.closeConfirmPopup()
        
        // 可以在这里跳转到订单列表页面
        // uni.navigateTo({
        //   url: '/pages/orderList/index'
        // })
      }
    }
  }
  </script>
  
  <style lang="scss">
  .report-form {
    padding: 20rpx;
    background-color: #f5f5f5;
    min-height: 100vh;
  }
  
  .section {
    background-color: white;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
  }
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    border-left: 8rpx solid #ff6b6b;
    padding-left: 20rpx;
  }
  
  .form-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .label {
    width: 200rpx;
    font-size: 28rpx;
    color: #666;
    flex-shrink: 0;
  }
  
  .value {
    flex: 1;
    font-size: 28rpx;
    color: #333;
  }
  
  .picker-value {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    padding: 20rpx;
    background-color: #f8f8f8;
    border-radius: 8rpx;
  }
  
  .input {
    flex: 1;
    font-size: 28rpx;
    padding: 20rpx;
    background-color: #f8f8f8;
    border-radius: 8rpx;
    border: none;
  }
  
  .smart-btn {
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 8rpx;
    padding: 15rpx 30rpx;
    font-size: 24rpx;
  }
  
  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20rpx;
  }
  
  .search-btn {
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8rpx;
    padding: 15rpx 20rpx;
    font-size: 24rpx;
  }
  
  .counter {
    display: flex;
    align-items: center;
    gap: 20rpx;
  }
  
  .counter-btn {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #007aff;
    color: white;
    border: none;
    font-size: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .counter-value {
    font-size: 32rpx;
    font-weight: bold;
    min-width: 60rpx;
    text-align: center;
  }
  
  .total-count {
    flex: 1;
    font-size: 32rpx;
    color: #ff6b6b;
    font-weight: bold;
    text-align: right;
  }
  
  .save-section {
    padding: 40rpx 0;
  }
  
  .save-btn {
    width: 100%;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 50rpx;
    padding: 30rpx;
    font-size: 32rpx;
    font-weight: bold;
  }
  
  .popup-content {
    background-color: white;
    border-radius: 20rpx 20rpx 0 0;
    max-height: 80vh;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
  }
  
  .popup-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
  
  .popup-close {
    font-size: 28rpx;
    color: #999;
  }
  
  .search-box {
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
  }
  
  .search-input {
    width: 100%;
    padding: 20rpx;
    background-color: #f8f8f8;
    border-radius: 8rpx;
    border: none;
    font-size: 28rpx;
  }
  
  .region-list,
  .product-list {
    max-height: 400rpx;
    overflow-y: auto;
  }
  
  .region-item,
  .product-item {
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    font-size: 28rpx;
    color: #333;
    
    &:active {
      background-color: #f0f0f0;
    }
  }
  
  .popup-footer {
    display: flex;
    padding: 30rpx;
    gap: 20rpx;
  }
  
  .popup-btn {
    flex: 1;
    padding: 25rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: none;
    
    &.cancel {
      background-color: #f0f0f0;
      color: #666;
    }
    
    &.confirm {
      background-color: #007aff;
      color: white;
    }
  }
  
  .confirm-popup {
    background-color: white;
    border-radius: 20rpx;
    padding: 40rpx;
    width: 600rpx;
  }
  
  .confirm-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30rpx;
  }
  
  .confirm-address {
    padding: 30rpx;
    background-color: #f8f8f8;
    border-radius: 8rpx;
    margin-bottom: 40rpx;
    
    text {
      font-size: 28rpx;
      color: #666;
    }
  }
  
  .confirm-buttons {
    display: flex;
    gap: 20rpx;
  }
  
  .confirm-btn {
    flex: 1;
    padding: 25rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: none;
    
    &.cancel {
      background-color: #f0f0f0;
      color: #666;
    }
    
    &.confirm {
      background-color: #ff6b6b;
      color: white;
    }
  }
  </style>