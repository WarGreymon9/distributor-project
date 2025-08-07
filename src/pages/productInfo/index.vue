<template>
    <view class="product-detail">
      <!-- 顶部商品图片 -->
      <view class="product-header">
        <image 
          class="product-main-image" 
          :src="productInfo.mainImage" 
          mode="aspectFill"
        ></image>
        <view class="product-title">
          <text class="product-name">{{ productInfo.name }}</text>
          
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
              v-for="(image, index) in productInfo.detailImages" 
              :key="index"
              class="detail-image"
              :src="image"
              mode="widthFix"
            ></image>
          </view>
        </view>
  
        <!-- 团品实拍内容 -->
        <view v-if="activeTab === 'photos'" class="photos-content">
            <view class="photos-grid">
                <view 
                    v-for="(item, index) in productInfo.realPhotos" 
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
              v-for="(cert, index) in productInfo.certificates" 
              :key="index"
              class="certificate-image"
              :src="cert"
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
  
  const activeTab = ref('detail')
  
  // 模拟商品数据
  const productInfo = ref({
    name: '泸州老窖头曲白酒',
    mainImage: 'https://img.alicdn.com/imgextra/i1/2616970884/O1CN01w3UVZo1IOv2GUZCO2_!!2616970884.png',
    detailImages: [
      'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN01EDBpVY1glPN1NqTrK_!!2200629544182-0-scmitem6000.jpeg',
      'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN014TFHFe1glPN0LdX68_!!2200629544182-0-scmitem6000.jpeg',
      'https://img.alicdn.com/imgextra/i1/2200629544182/O1CN014HwvxZ1glPMzKZx1i_!!2200629544182-0-scmitem6000.jpeg',
      'https://img.alicdn.com/imgextra/i3/2200629544182/O1CN01oWoti71glPN0pXimS_!!2200629544182-0-scmitem6000.jpeg',
      'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN016lfmXX1glPN1Ns1X0_!!2200629544182-0-scmitem6000.jpeg',
      'https://img.alicdn.com/imgextra/i4/2200629544182/O1CN016lfmXX1glPN1Ns1X0_!!2200629544182-0-scmitem6000.jpeg'
    ],
    realPhotos: [
        {
            type: 'video',
            url: 'https://cloud.video.taobao.com/play/u/725677994/p/2/e/6/t/1/402519950243.mp4?appKey=38829',
            poster: 'https://img.alicdn.com/imgextra/i2/6000000004467/O1CN01b2smVu1irwIxC3xeo_!!6000000004467-0-sm.jpg',
            // title: '产品展示视频1'
        }
    ],
    certificates: [
      'https://img.alicdn.com/imgextra/i2/2200629544182/O1CN01TTBJ5M1glPMz91l4K_!!2200629544182-0-scmitem6000.jpeg'
    ]
  })
  
  const switchTab = (tab) => {
    activeTab.value = tab
  }

    // 添加分享功能
    const shareToWechat = () => {
    // 构建分享内容
    const shareData = {
      title: productInfo.value.name,
      desc: `推荐一款好产品：${productInfo.value.name}`,
      imageUrl: productInfo.value.mainImage,
      path: `/pages/productInfo/index?id=${productInfo.value.id || 'default'}` // 分享页面路径
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
  </script>
  
  <style scoped lang="scss">
  @use "./index.scss";
  </style>