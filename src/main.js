import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api/axios'
import components from '@/components'
// 导入全局样式
import '@/styles/index.less'
Vue.use(components)
// import axios from 'axios'
// // 基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // token认证
// axios.defaults.headers = {
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
// }
Vue.prototype.axios = axios
Vue.use(Element)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
