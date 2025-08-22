<template>
    <view class="product-detail">
      <!-- 顶部商品图片 -->
      <view class="product-header">
        <image 
          class="product-main-image" 
          :src="productInfo?.goodsMainImages?.[0]?.fileUrl || ''" 
          mode="aspectFill"
        ></image>
        <view class="product-title">
          <text class="product-name">{{ productInfo?.goodsName }}</text>
          
        </view>
      </view>
      
      <!-- 中间Tab栏 -->
      <view class="tab-container">
        <view class="tab-bar">
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'detail' }"
            @click="switchTab('detail')"
          >
            <text>商品详情</text>
          </view>
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'photos' }"
            @click="switchTab('photos')"
          >
            <text>团品实拍</text>
          </view>
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'certificate' }"
            @click="switchTab('certificate')"
          >
            <text>资质授权</text>
          </view>
        </view>
      </view>
  
      <!-- 底部图片列表 -->
      <view class="content-area">
        <!-- 商品详情内容 -->
        <view v-if="activeTab === 'detail'" class="detail-content">

          <view class="detail-images">
            <image 
              v-for="(image, index) in productInfo?.goodsInfoImages" 
              :key="index"
              class="detail-image"
              :src="image?.fileUrl"
              mode="widthFix"
            ></image>
            
          </view>
        </view>
  
        <!-- 团品实拍内容 -->
        <view v-if="activeTab === 'photos'" class="photos-content">
            <view class="photos-grid">
                <view 
                    v-for="(item, index) in productInfo?.realPhotos" 
                    :key="index"
                    class="media-item"
                >
                <!-- 视频项 -->
                <view v-if="item.type === 'video'" class="video-container">
                    <video 
                        :src="item.url"
                        :poster="item.poster"
                        class="video-player"
                        controls
                        :show-center-play-btn="true"
                        :show-play-btn="true"
                    ></video>
                    <view class="video-actions">
                    <text class="video-title">{{ item.title }}</text>
                    <button 
                        class="download-btn"
                        @click="downloadVideo(item.url, item.title)"
                    >
                        下载视频
                    </button>
                    </view>
                </view>
                
                <!-- 图片项 -->
                <!-- <image 
                    v-else
                    class="photo-item"
                    :src="item.url"
                    mode="aspectFill"
                ></image> -->
            </view>
            </view>
        </view>
  
        <!-- 资质授权内容 -->
        <view v-if="activeTab === 'certificate'" class="certificate-content">
          <view class="certificate-images">
            <image 
              v-for="(cert, index) in productInfo?.goodsAuthImages" 
              :key="index"
              class="certificate-image"
              :src="cert?.fileUrl"
              mode="widthFix"
            ></image>
          </view>
        </view>
      </view>
      <view class="share-container">
        <button 
          class="share-btn"
          @click="shareToWechat"
          open-type="share"
        >
          <text class="share-text">分享给好友</text>
        </button>
      </view>
    </view>
  </template>



  
  <script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import api from '../../api/index.js'
  import { onShareAppMessage } from '@dcloudio/uni-app'

  const activeTab = ref('detail')
  // goodsAuthImages 商品认证图像
  // goodsInfoImages 商品信息图片
  // goodsMainImages 商品主要形象
    // 模拟商品数据
    const productInfo = ref({

    })
    const currentShareProduct = ref(null)

  

  const GoodsInfo = async (id) => {
    try{
      const res = await api.getGoodsInfo(id)
      productInfo.value = res.data

      currentShareProduct.value = res.data
      console.log("res.value", res.data);

      console.log("productInfo.value", productInfo.value);


      // return res

    }catch(err){
      console.log("err", err);
      
    }
 
  }

  onLoad((options) =>{ 
  console.log("options", options);
  
  // 修正参数名，支持多种参数名
  const goodsId = options.goodsId || options.id || options.goodsld;
  GoodsInfo(goodsId)
})


  const switchTab = (tab) => {
    activeTab.value = tab
  }

    // 添加分享功能
    const shareToWechat = () => {
      // const currentShareProduct = productInfo.value
      console.log("currentShareProduct", currentShareProduct);

  }

  const downloadVideo = (videoUrl, title) => {
    uni.showLoading({
        title: '准备下载...'
    })
    
    uni.downloadFile({
        url: videoUrl,
        success: (res) => {
        uni.hideLoading()
        if (res.statusCode === 200) {
            // 保存到相册
            uni.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
                uni.showToast({
                title: '视频已保存到相册',
                icon: 'success'
                })
            },
            fail: (err) => {
                console.error('保存失败:', err)
                uni.showToast({
                title: '保存失败',
                icon: 'error'
                })
            }
            })
        }
        },
        fail: (err) => {
        uni.hideLoading()
        console.error('下载失败:', err)
        uni.showToast({
            title: '下载失败',
            icon: 'error'
        })
        }
    })
    }

onShareAppMessage(() => {
  const pathGoodsId = `/pages/productInfo/index?goodsId=${currentShareProduct.value.goodsId}`
  console.log("pathGoodsId", pathGoodsId);

  
  return {
    title: currentShareProduct.value.goodsName || '商品分享',
    desc: currentShareProduct.value.goodsSubname || '精选商品推荐',
    imageUrl: currentShareProduct.value?.goodsMainImages?.[0]?.fileUrl || '',
    path: pathGoodsId
  }
})
  </script>
  
  <style scoped lang="scss">
  @use "./index.scss";
  </style>