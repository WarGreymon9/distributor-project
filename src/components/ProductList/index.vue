<template>
        <!-- 商品列表 -->
    <view class="product-list">
      <view class="product-grid">
        <view 
          class="product-item"
          v-for="(product, index) in productList"
          :key="index"
        >
          <view class="product-image" @click="productClick">
            <image :src="product?.image" mode="aspectFill"></image>
          </view>
          <view class="product-info">
            <text class="product-name">{{ product?.name }}</text>
            <text class="product-desc">{{ product?.desc }}</text>
            <view class="product-price">
              <text class="price">¥ {{ product?.price }}</text>
              <text class="original-price" v-if="product?.originalPrice">¥{{ product?.originalPrice }}</text>
              <view class="share-btn">
                <view>
                </view>
                <text>分享</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
</template>

<script setup> 
import { ref } from 'vue'

const props = defineProps({
    productList: {
      type: Array,
      default: () =>[]
    }
})

const productClick = () => {
    uni.navigateTo({
        url: '/pages/productInfo/index'
    });
}



</script>
<style lang="scss">
    @use "./ProductList.scss";
</style>