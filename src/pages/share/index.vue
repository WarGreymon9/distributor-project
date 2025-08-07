<template>
    <view class="search-page">
      <!-- 搜索栏 -->
      <view class="search-container">
        <view class="search-bar">
          <input 
            class="search-input"
            v-model="searchValue"
            placeholder="请输入关键字"
            @input="onSearchInput"
          />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </view>
      </view>
  
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 无搜索值时显示空状态 -->
        <view v-if="!searchValue" class="empty-state">
          <!-- <image 
            class="empty-image" 
            src="" 
            mode="aspectFit"
          ></image> -->
          <text class="empty-text">请输入关键字搜索</text>
        </view>
  
        <!-- 有搜索值时显示搜索结果 -->
        <view v-else class="search-results">
          <ProductList :productList="products" />
          <!-- 无搜索结果 -->
          <view v-if="products.length === 0" class="no-results">
            <!-- <image 
              class="no-results-image" 
              src="/static/no-results.png" 
              mode="aspectFit"
            ></image> -->
            <text class="no-results-text" >未找到相关商品</text>
          </view>
        </view>
      </view>
      <TabBar :current="currentTab" @change="handleTabChange" />
    </view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import ProductList from '../../components/ProductList/index.vue'
  import TabBar from '../../components/TabBar/index.vue'

  const currentTab = ref('share')

  
  const searchValue = ref('')
  
  
  // 模拟商品数据
  const products = ref([
    {
      id: 1,
      name: '醉梦琼浆',
      description: '品味时光，沉醉佳酿',
      price: '999.9',
      originalPrice: '999',
      image: 'https://img.alicdn.com/imgextra/i1/2616970884/O1CN01w3UVZo1IOv2GUZCO2_!!2616970884.png'
    },
    {
      id: 2,
      name: '泸州老窖头曲',
      description: '传统工艺，醇香回甘',
      price: '888.8',
      originalPrice: '999',
      image: 'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN01EDBpVY1glPN1NqTrK_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 3,
      name: '五粮液经典',
      description: '五粮精酿，香醇甘美',
      price: '1299.9',
      originalPrice: '1399',
      image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014TFHFe1glPN0LdX68_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 4,
      name: '泸州老窖头曲',
      description: '传统工艺，醇香回甘',
      price: '888.8',
      originalPrice: '999',
      image: 'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN01EDBpVY1glPN1NqTrK_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 5,
      name: '五粮液经典',
      description: '五粮精酿，香醇甘美',
      price: '1299.9',
      originalPrice: '1399',
      image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014TFHFe1glPN0LdX68_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 6,
      name: '泸州老窖头曲',
      description: '传统工艺，醇香回甘',
      price: '888.8',
      originalPrice: '999',
      image: 'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN01EDBpVY1glPN1NqTrK_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 7,
      name: '五粮液经典',
      description: '五粮精酿，香醇甘美',
      price: '1299.9',
      originalPrice: '1399',
      image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014TFHFe1glPN0LdX68_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 8,
      name: '泸州老窖头曲',
      description: '传统工艺，醇香回甘',
      price: '888.8',
      originalPrice: '999',
      image: 'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN01EDBpVY1glPN1NqTrK_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 9,
      name: '五粮液经典',
      description: '五粮精酿，香醇甘美',
      price: '1299.9',
      originalPrice: '1399',
      image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014TFHFe1glPN0LdX68_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 10,
      name: '泸州老窖头曲',
      description: '传统工艺，醇香回甘',
      price: '888.8',
      originalPrice: '999',
      image: 'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN01EDBpVY1glPN1NqTrK_!!2200629544182-0-scmitem6000.jpeg'
    },
    {
      id: 11,
      name: '五粮液经典',
      description: '五粮精酿，香醇甘美',
      price: '1299.9',
      originalPrice: '1399',
      image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014TFHFe1glPN0LdX68_!!2200629544182-0-scmitem6000.jpeg'
    }
  ])
  
  // 搜索过滤
  const filteredProducts = computed(() => {
    if (!searchValue.value) return []
    return products.value.filter(product => 
      product.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  })
  
  // 搜索输入处理
  const onSearchInput = (e) => {
    searchValue.value = e.detail.value
  }
  
  // 搜索按钮处理
  const handleSearch = () => {
    if (!searchValue.value.trim()) {
      uni.showToast({
        title: '请输入搜索关键字',
        icon: 'none'
      })
      return
    }
    // 这里可以添加搜索统计或其他逻辑
  }

  const handleTabChange = (tab) => {
    currentTab.value = tab
    // 这里可以处理tab切换逻辑，比如跳转到其他页面
    console.log('切换到:', tab)
  }
  
  // 跳转到商品详情
  const goToProductDetail = (product) => {
    uni.navigateTo({
      url: `/pages/productInfo/index?id=${product.id}`
    })
  }
  
  // 分享商品
  const shareProduct = (product) => {
    uni.share({
      provider: 'weixin',
      scene: 'WXSceneSession',
      type: 0,
      title: product.name,
      summary: product.description,
      imageUrl: product.image,
      success: () => {
        uni.showToast({
          title: '分享成功',
          icon: 'success'
        })
      },
      fail: () => {
        uni.showToast({
          title: '分享失败',
          icon: 'error'
        })
      }
    })
  }
  </script>
  
  <style scoped lang="scss">
    @use "./share.scss";
  </style>