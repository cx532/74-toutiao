import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  // 配置对象  基准路径  头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
  //   }
  // 最大安全数值处理
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})
// 请求拦截
instance.interceptors.request.use(config => {
  // 给头部加上认证信息
  const user = window.sessionStorage.getItem('toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(response => response, error => {
  // 做一些事情
  if (error.response && error.response.status === 401) {
    // hash 哈希   是url后  #开始的字符串
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
