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
              <view class="share-btn" open-type="share" @click="shareToWechat(product)">
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
import { onShareAppMessage } from '@dcloudio/uni-app'

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

    // 添加分享功能
    const shareToWechat = (product) => {
    // 构建分享内容
    const shareData = {
      title: product.name,
      desc: `推荐一款好产品：${product.name}`,
      imageUrl: product.image,
      path: `/pages/productInfo/index?id=${product.id || 'default'}` // 分享页面路径
    }
    
    // 使用uni-app的分享API
    uni.share({
      provider: 'weixin',
      scene: 'WXSceneSession', // 分享到微信好友
      type: 0, // 图文分享
      title: shareData.title,
      summary: shareData.desc,
      imageUrl: shareData.imageUrl,
      href: shareData.path,
      success: (res) => {
        uni.showToast({
          title: '分享成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.error('分享失败:', err)
        // 如果原生分享失败，使用小程序的分享功能
        uni.showShareMenu({
          withShareTicket: true,
          success: () => {
            uni.showToast({
              title: '请点击右上角分享',
              icon: 'none'
            })
          }
        })
      }
    })
  }



</script>
<style lang="scss">
    @use "./ProductList.scss";
</style>