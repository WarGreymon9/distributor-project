<template>
    <view class="profile-container">
      <!-- 顶部用户信息区域 -->
      <view class="user-header">
        <view class="user-info">
          <!-- <view class="avatar">
          </view> -->
          <image style="width: 100%; height: 250rpx;" src="../../assets/cd_bj.png" mode="aspectFill" class="avatar-img" />

          <!-- <view class="user-details">
            <view class="username">用户名123</view>
            <view class="user-id">级别：分销</view>
            <view class="user-id">用户: 123456789</view>
          </view> -->
        </view>
      </view>
      
      <!-- 功能菜单列表 -->
      <view class="menu-list">
        
        <view class="menu-item" @click="handleMenuClick('orders')">
          <view class="menu-left">
            <img style="height: 36rpx; width: 36rpx;" src="../../assets/me/dd_cx.png">
            <text class="menu-text">订单查询</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号</button>
     
        
        <view class="menu-item" @click="handleMenuClick('exit')">
          <view class="menu-left">
            <img style="height: 36rpx; width: 36rpx;" src="../../assets/me/fxs_dl.png">
            <text class="menu-text">分销商登录</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
      </view>
      <view v-if="showNicknameModal" class="modal-overlay" @click="closeNicknameModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">修改账号昵称</text>
        </view>
        <view class="modal-body">
          <input 
            v-model="newNickname" 
            class="nickname-input" 
            placeholder="请输入新昵称"
            maxlength="20"
            :focus="showNicknameModal"
          />
        </view>
        <view class="modal-footer">
          <view class="modal-btn cancel-btn" @click="closeNicknameModal">
            <text>取消</text>
          </view>
          <view class="modal-btn confirm-btn" @click="confirmNickname">
            <text>确认</text>
          </view>
        </view>
      </view>
    </view>
        <TabBar :current="currentTab" @change="handleTabChange" />
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import TabBar from '../../components/TabBar/index.vue'
  
  const currentTab = ref('profileTourist')
  const showNicknameModal = ref(false)
  const newNickname = ref('')
  const userInfo = ref({
    username: '用户名123',
    userId: '123456789',
    avatar: '/static/avatar.png'
  })
  
  const handleMenuClick = (type) => {
    switch (type) {
      case 'password':
        uni.navigateTo({
          url: '/pages/changePassword/index' 
        })
        break
      case 'nickname':
        newNickname.value = userInfo.value.username
        showNicknameModal.value = true
        break
      case 'register':
        uni.navigateTo({
          url: '/pages/register/index' 
        })
        break
      case 'address':
        uni.navigateTo({
          url: '/pages/addressList/index'
        })
        break
      case 'orders':
        uni.navigateTo({
          url: '/pages/orderList/index' 
        })

        break
      case 'collection':
        uni.navigateTo({
          url: '/pages/dataCenter/index'
        })
        break
      case 'exit':
        uni.showModal({
          title: '提示',
          content: '确定要退出登录吗？',
          success: (res) => {
            if (res.confirm) {
              // 清除用户信息，跳转到登录页
              uni.redirectTo({
                url: '/pages/login/index'
              })
            }
          }
        })
        break
      default:
        break
    }
  }
  const closeNicknameModal = () => {
  showNicknameModal.value = false
  newNickname.value = ''
}

  const confirmNickname = async () => {
    if (!newNickname.value.trim()) {
      uni.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return
    }
    
    try {
      // 这里调用API更新昵称
      // await updateNickname(newNickname.value)
      
      // 更新本地用户信息
      userInfo.value.username = newNickname.value
      
      uni.showToast({
        title: '修改成功',
        icon: 'success'
      })
      
      closeNicknameModal()
    } catch (error) {
      uni.showToast({
        title: '修改失败，请重试',
        icon: 'none'
      })
    }
  }
  const handleTabChange = (tab) => {
    currentTab.value = tab
    // 这里可以处理tab切换逻辑，比如跳转到其他页面
    console.log('切换到:', tab)
  }
  </script>
  
  <style scoped lang="scss">
    @use './profileTourist.scss';
  </style>