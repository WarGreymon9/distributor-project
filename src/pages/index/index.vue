<template>
  <view class="container">
    <!-- 顶部防伪横幅 -->
    <view class="top-banner">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="500">
        <swiper-item v-for="(item, index) in list" :key="index">
          <image :src="item.image" mode="aspectFill" class="swiper-image" ></image>
          <view class="swiper-title">{{ item.title }}</view>
        </swiper-item>
      </swiper>

    </view>
    
    <!-- 商品分类标签 -->
    <view class="category-tabs">
      <view 
        class="tab-item"
        :class="{ active: activeCategory === 'new' }"
        @click="switchCategory('new')"
      >
        <text>新品区</text>
      </view>
      <view 
        class="tab-item"
        :class="{ active: activeCategory === 'daily' }"
        @click="switchCategory('daily')"
      >
        <text>日常区</text>
      </view>
    </view>
    <ProductList :productList="productList" />
    <!-- 底部tab栏 -->
    <TabBar :current="currentTab" @change="handleTabChange" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import TabBar from '../../components/TabBar/index.vue'
import ProductList from '../../components/ProductList/index.vue'
const activeCategory = ref('new')
const currentTab = ref('home')

// 模拟商品数据
const productList = ref([
  {
    id: 1,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 2,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 3,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 4,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 5,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 6,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 7,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  },
  {
    id: 8,
    name: '醉梦琼浆',
    desc: '品味好光，沉醉佳酿',
    price: '999.9',
    originalPrice: '999',
    image: 'https://img.alicdn.com/imgextra/i1/1597499963/O1CN01FBojkI2NT73DsvdX0_!!1597499963.jpg'
  }
])

const list= ref( [{
						image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014dew0Y1glPPH6GpqE_!!2200629544182-1-scmitem6000.gif',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014dew0Y1glPPH6GpqE_!!2200629544182-1-scmitem6000.gif',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014dew0Y1glPPH6GpqE_!!2200629544182-1-scmitem6000.gif',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				]);

const switchCategory = (category) => {
  activeCategory.value = category
  // 这里可以根据分类加载不同的商品数据
}

const handleTabChange = (tab) => {
  currentTab.value = tab
  // 这里可以处理tab切换逻辑，比如跳转到其他页面
  console.log('切换到:', tab)
}
</script>

<style scoped lang="scss">
  @use "./home.scss";
</style>