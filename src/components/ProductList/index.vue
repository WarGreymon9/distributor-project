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
            <text class="product-desc">{{ product?.goodsSubname || "无"}}</text>
            <view class="product-price">
              <text class="price">¥ {{ product?.goodsSalesPrice }}</text>
              <!-- <text class="original-price" v-if="product?.originalPrice">¥{{ product?.originalPrice }}</text> -->
              <text class="original-price" >库存{{ product?.originalPrice|| "无" }}</text>
              <view class="share-btn">
                <button open-type="share" plain="true" @click.stop="shareToWechat(product)" style="padding: 0 10rpx 0 0; background-color: #fff; border: 1rpx solid white; display: flex; align-items: center; justify-content: center;">
                  <img style="height: 48rpx; width: 48rpx;" src="../../assets/fx.png">
                  <text>分享</text>
                </button>
              </view>
            </view>
          </view> 
        </view>
      </view>
    </view>
</template>

<script setup> 
import { ref } from 'vue'

const emit = defineEmits(['share'])

const props = defineProps({
    productList: {
      type: Array,
      default: () =>[]
    }
})


const productClick = (goodsld) => {
  console.log('商品点击', goodsld);
  
    uni.navigateTo({
        url: `/pages/productInfo/index?goodsId=${goodsld}`
    });
}

// 分享功能 - 通过事件传递给父页面
const shareToWechat = (product) => {
  console.log('分享商品', product);
  
  // 通过事件将分享数据传递给父页面
  emit('share', product)
}



// onShareAppMessage(() => {
//   const pathGoodsId = `/pages/productInfo/index?goodsId=${currentShareProduct.value.goodsId}`
//   console.log("pathGoodsId", pathGoodsId);

  
//   return {
//     title: currentShareProduct.value.goodsName || '商品分享',
//     desc: currentShareProduct.value.goodsSubname || '精选商品推荐',
//     imageUrl: currentShareProduct.value?.goodsMainImages?.[0]?.fileUrl || '',
//     path: pathGoodsId
//   }
// })


</script>
<style lang="scss">
    @use "./ProductList.scss";
</style>