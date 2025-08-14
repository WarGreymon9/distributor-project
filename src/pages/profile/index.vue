<template>
    <view class="profile-container">
      <!-- 顶部用户信息区域 -->
      <view class="user-header">
        <view class="user-info">
          <view class="avatar">
            <image src="/static/avatar.png" mode="aspectFill" class="avatar-img" />
          </view>
          <view class="user-details">
            <view class="username">用户名123</view>
            <view class="user-id">级别：分销</view>
            <view class="user-id">用户: 123456789</view>
          </view>
        </view>
      </view>
      
      <!-- 功能菜单列表 -->
      <view class="menu-list">
        <view class="menu-item" @click="handleMenuClick('password')">
          <view class="menu-left">
            <view class="menu-icon password-icon"></view>
            <text class="menu-text">修改密码</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('nickname')">
          <view class="menu-left">
            <view class="menu-icon nickname-icon"></view>
            <text class="menu-text">修改昵称</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('register')">
          <view class="menu-left">
            <view class="menu-icon logout-icon"></view>
            <text class="menu-text">邀请注册</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('address')">
          <view class="menu-left">
            <view class="menu-icon address-icon"></view>
            <text class="menu-text">地址管理</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('orders')">
          <view class="menu-left">
            <view class="menu-icon orders-icon"></view>
            <text class="menu-text">订单列表</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('collection')">
          <view class="menu-left">
            <view class="menu-icon collection-icon"></view>
            <text class="menu-text">数据中心</text>
          </view>
          <view class="menu-arrow"><uni-icons type="right" size="20"></uni-icons></view>
        </view>
        
        <view class="menu-item" @click="handleMenuClick('exit')">
          <view class="menu-left">
            <view class="menu-icon exit-icon"></view>
            <text class="menu-text">退出登录</text>
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
  
  const currentTab = ref('profile')
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
          url: '/pages/distributionOrder/index' 
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
    @use './profile.scss';
  </style>