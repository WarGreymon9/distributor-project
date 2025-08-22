import { ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'

export function useShare() {
  const currentShareProduct = ref(null)
  
  // 设置要分享的产品
  const setShareProduct = (product) => {
    currentShareProduct.value = product
  }
  
  // 微信分享回调
   onShareAppMessage((res) => {
    console.log('分享来源:', res.from)
    
    if (res.from === 'button') {
      console.log('来自分享按钮', currentShareProduct.value)
    }
    
    // 如果有产品信息，使用产品信息构建分享内容
    if (currentShareProduct.value) {
      return {
        title: currentShareProduct.value.goodsName || '商品分享',
        desc: currentShareProduct.value.goodsSubname || '精选商品推荐',
        imageUrl: currentShareProduct.value?.goodsMainImages?.[0]?.fileUrl || '',
        path: `/pages/productInfo/index?id=${currentShareProduct.value.goodsId}`
      }
    }
    
    // 默认分享内容
    return {
        title: currentShareProduct.value.goodsName || '商品分享',
        desc: currentShareProduct.value.goodsSubname || '精选商品推荐',
        imageUrl: currentShareProduct.value?.goodsMainImages?.[0]?.fileUrl || '',
        path: `/pages/productInfo/index?id=${currentShareProduct.value.goodsId}`
    }
  })
  
  return {
    currentShareProduct,
    setShareProduct,
    onShareAppMessage
  }
}