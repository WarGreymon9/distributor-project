// 请求基础配置
const BASE_URL = 'https://hbkadmin.xiaohe.com/api'
const TIMEOUT = 30000

// 创建请求实例
class Request {
  constructor() {
    this.baseURL = BASE_URL
    this.timeout = TIMEOUT
  }

  // 请求拦截器
  interceptRequest(config) {
    // 添加 token
    const token = uni.getStorageSync('token')
    if (token) {
      config.header = {
        ...config.header,
        'Authorization': `Bearer ${token}`
      }
    }

    // 添加通用请求头
    config.header = {
      'Content-Type': 'application/json',
      ...config.header
    }

    // 显示加载提示
    uni.showLoading({
      title: '加载中...',
      mask: true
    })

    console.log('请求拦截:', config)
    return config
  }

  // 响应拦截器
  interceptResponse(response, config) {
    // 隐藏加载提示
    uni.hideLoading()

    console.log('响应拦截:', response)

    const { statusCode, data } = response

    // HTTP 状态码处理
    if (statusCode === 200) {
      // 业务状态码处理
      if (data.code === 200 || data.code === 0) {
        return Promise.resolve(data)
      } else if (data.code === 401) {
        // token 过期，清除本地存储并跳转登录
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        uni.showToast({
          title: '登录已过期，请重新登录',
          icon: 'none'
        })
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/index'
          })
        }, 1500)
        return Promise.reject(data)
      } else {
        // 其他业务错误
        uni.showToast({
          title: data.message || '请求失败',
          icon: 'none'
        })
        return Promise.reject(data)
      }
    } else {
      // HTTP 错误处理
      let errorMessage = '网络错误'
      switch (statusCode) {
        case 400:
          errorMessage = '请求参数错误'
          break
        case 401:
          errorMessage = '未授权访问'
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求地址不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        case 502:
          errorMessage = '网关错误'
          break
        case 503:
          errorMessage = '服务不可用'
          break
        case 504:
          errorMessage = '网关超时'
          break
        default:
          errorMessage = `连接错误${statusCode}`
      }
      
      uni.showToast({
        title: errorMessage,
        icon: 'none'
      })
      return Promise.reject({ statusCode, message: errorMessage })
    }
  }

  // 错误处理
  handleError(error, config) {
    uni.hideLoading()
    console.error('请求错误:', error)
    
    let errorMessage = '网络连接失败'
    if (error.errMsg) {
      if (error.errMsg.includes('timeout')) {
        errorMessage = '请求超时'
      } else if (error.errMsg.includes('fail')) {
        errorMessage = '网络连接失败'
      }
    }
    
    uni.showToast({
      title: errorMessage,
      icon: 'none'
    })
    
    return Promise.reject(error)
  }

  // 通用请求方法
  request(options) {
    // 合并配置
    
    const config = {
      url: this.baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {},
      timeout: options.timeout || this.timeout,
    }
    console.log("options", options);


    // 请求拦截
    const interceptedConfig = this.interceptRequest(config)

    return new Promise((resolve, reject) => {
      uni.request({
        ...interceptedConfig,
        success: (response) => {
          this.interceptResponse(response, interceptedConfig)
            .then(resolve)
            .catch(reject)
        },
        fail: (error) => {
          this.handleError(error, interceptedConfig)
            .then(resolve)
            .catch(reject)
        }
      })
    })
  }

  // GET 请求
  get(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'GET',
      data,
      ...options
    })
  }

  // POST 请求
  post(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
      ...options
    })
  }

  // PUT 请求
  put(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'PUT',
      data,
      ...options
    })
  }

  // DELETE 请求
  delete(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'DELETE',
      data,
      ...options
    })
  }

  // 文件上传
  upload(url, filePath, formData = {}, options = {}) {
    const token = uni.getStorageSync('token')
    const header = {
      ...options.header
    }
    
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }

    uni.showLoading({
      title: '上传中...',
      mask: true
    })

    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: this.baseURL + url,
        filePath,
        name: options.name || 'file',
        formData,
        header,
        success: (response) => {
          uni.hideLoading()
          try {
            const data = JSON.parse(response.data)
            if (data.code === 200 || data.code === 0) {
              resolve(data)
            } else {
              uni.showToast({
                title: data.message || '上传失败',
                icon: 'none'
              })
              reject(data)
            }
          } catch (e) {
            uni.showToast({
              title: '上传失败',
              icon: 'none'
            })
            reject(e)
          }
        },
        fail: (error) => {
          uni.hideLoading()
          uni.showToast({
            title: '上传失败',
            icon: 'none'
          })
          reject(error)
        }
      })
    })
  }
}

// 创建实例并导出
const request = new Request()
export default request