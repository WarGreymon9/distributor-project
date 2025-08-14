<template>
  <view class="address-library">
    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <uni-icons type="search" size="20" color="#999"></uni-icons>
        <input 
          class="search-input" 
          placeholder="请选择搜索条件"
          v-model="searchKeyword"
          @input="onSearch"
        />
      </view>
    </view>

    <!-- 地址列表 -->
    <view class="address-list">
      <view 
        class="address-item" 
        v-for="(item, index) in filteredAddressList" 
        :key="item.id"
      >
        <!-- 编码 -->
        <view class="address-code">
          <view style="display: flex; align-items: center; justify-content: flex-start;"> 

            <text class="code-label">编码：</text>
            <text class="code-value">{{ item.code }}</text>
          </view>
          <text class="status-tag" :class="{ active: item.isDefault }">{{ item.isDefault ? '常用' : '否' }}</text>
        </view>

        <!-- 收货信息 -->
        <view class="address-info">
          <view style="display: flex; align-items: center; justify-content: space-between;">
            <view class="info-row">
                <!-- <text class="info-label">收货人:</text> -->
                <text class="info-value">收货人：{{ item.receiverName }}</text>
            </view>
            <view class="info-row">
                <!-- <text class="info-label"></text> -->
                <text class="info-value">收货电话：{{ item.receiverPhone }}</text>
            </view>
          </view>
          <view class="info-row address-row">
            <!-- <text class="info-label">收货地址:</text> -->
            <text class="info-value address-text">收货地址：{{ item.fullAddress }}</text>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="action-buttons">
          <button 
            class="action-btn toggle-btn" 
            :class="{ active: item.isDefault }"
            @click="toggleDefault(item)"
          >
            {{ item.isDefault ? '切换常用' : '切换常用' }}
          </button>
          <button class="action-btn edit-btn" @click="editAddress(item)">
            编辑
          </button>
          <button class="action-btn delete-btn" @click="deleteAddress(item)">
            删除
          </button>
        </view>
      </view>
    </view>

    <!-- 新增地址按钮 -->
    <view class="add-section">
      <button class="add-btn" @click="addNewAddress">
        新增地址
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 搜索关键词
const searchKeyword = ref('')

// 地址列表数据
const addressList = ref([
  {
    id: 1,
    code: 'UA000J3NEO',
    receiverName: '包',
    receiverPhone: '12345678912',
    region: ['北京市', '北京市', '海淀区'],
    detailAddress: '五道口五号设计风尚viu配发发发湖北和的发发SUV就',
    fullAddress: '北京市北京市海淀区五道口五号设计风尚viu配发发发湖北和的发发SUV就',
    isDefault: true
  },
  {
    id: 2,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 3,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 4,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 5,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 6,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 7,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 8,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 9,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 10,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 1,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 12,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  },
  {
    id: 13,
    code: 'UA000J3NE1',
    receiverName: '张三',
    receiverPhone: '13800138000',
    region: ['上海市', '上海市', '浦东新区'],
    detailAddress: '陆家嘴金融贸易区世纪大道100号',
    fullAddress: '上海市上海市浦东新区陆家嘴金融贸易区世纪大道100号',
    isDefault: false
  }
])

// 过滤后的地址列表
const filteredAddressList = computed(() => {
  if (!searchKeyword.value.trim()) {
    return addressList.value
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return addressList.value.filter(item => 
    item.code.toLowerCase().includes(keyword) ||
    item.receiverName.toLowerCase().includes(keyword) ||
    item.receiverPhone.includes(keyword) ||
    item.fullAddress.toLowerCase().includes(keyword)
  )
})

// 搜索方法
const onSearch = () => {
  // 实时搜索，由computed自动处理
}

// 切换默认地址
const toggleDefault = (item) => {
  // 如果当前不是默认地址，则设为默认
  if (!item.isDefault) {
    // 先取消所有默认地址
    addressList.value.forEach(addr => {
      addr.isDefault = false
    })
    // 设置当前为默认
    item.isDefault = true
    
    uni.showToast({
      title: '已设为常用地址',
      icon: 'success'
    })
  } else {
    // 如果已是默认地址，可以选择取消默认
    uni.showModal({
      title: '提示',
      content: '确定取消常用地址吗？',
      success: (res) => {
        if (res.confirm) {
          item.isDefault = false
          uni.showToast({
            title: '已取消常用地址',
            icon: 'success'
          })
        }
      }
    })
  }
}

// 编辑地址
const editAddress = (item) => {
  uni.navigateTo({
    url: `/pages/addressManage/index?id=${item.id}&mode=edit`
  })
}

// 删除地址
const deleteAddress = (item) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这个地址吗？',
    success: (res) => {
      if (res.confirm) {
        const index = addressList.value.findIndex(addr => addr.id === item.id)
        if (index > -1) {
          addressList.value.splice(index, 1)
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    }
  })
}

// 新增地址
const addNewAddress = () => {
  uni.navigateTo({
    url: '/pages/addressManage/index?mode=add'
  })
}

// 页面加载时获取地址列表
onMounted(() => {
  // 这里可以调用API获取地址列表
  // loadAddressList()
})
</script>

<style lang="scss" scoped>
    @use './addressList.scss';
</style>