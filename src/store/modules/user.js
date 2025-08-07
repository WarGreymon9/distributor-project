import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: '',
    isLogin: false
  }),
  
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getLoginStatus: (state) => state.isLogin
  },
  
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.isLogin = true
    },
    
    setToken(token) {
      this.token = token
    },
    
    logout() {
      this.userInfo = null
      this.token = ''
      this.isLogin = false
    }
  }
})