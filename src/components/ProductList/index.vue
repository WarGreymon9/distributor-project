<template>
        <!-- 商品列表 -->
    <view class="product-list">
      <view class="product-grid">
        <view 
          class="product-item"
          v-for="(product, index) in productList"
          :key="product?.goodsId"
          @click="productClick(product?.goodsId)"
        >
        
          <view class="product-image" >
            <image :src="product?.goodsMainImages?.[0]?.fileUrl" mode="aspectFill"></image>
          </view>
          <view class="product-info">
            <text class="product-name">{{ product?.goodsName }}</text>
            <text class="product-desc">{{ product?.goodsSubname }}</text>
            <view class="product-price">
              <text class="price">¥ {{ product?.goodsSalesPrice }}</text>
              <!-- <text class="original-price" v-if="product?.originalPrice">¥{{ product?.originalPrice }}</text> -->
              <text class="original-price" >库存{{ product?.originalPrice|| "无" }}</text>
              <view class="share-btn" open-type="share" @click.stop="shareToWechat(product)">
                <view>
                </view>
                <view style="display: flex; align-items: center; justify-content: center;">
                  <img style="height: 48rpx; width: 48rpx;" src="../../assets/fx.png">
                  <text>分享</text>
                </view>
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

const emit = defineEmits(['shareToWechat'])

const productClick = (goodsld) => {
  console.log('商品点击', goodsld);
  
    uni.navigateTo({
        url: `/pages/productInfo/index?goodsld=${goodsld}`
    });
}

    // 添加分享功能
const shareToWechat = (product) => {
    emit('shareToWechat', product)
}



</script>
<style lang="scss">
    @use "./ProductList.scss";
</style>