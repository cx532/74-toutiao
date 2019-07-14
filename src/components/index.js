// 封装一个vue插件 完成当前文件在所有的组件全局注册
// 调用install方法时，默认传入Vue对象
import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    // 有其他组件继续写就可以了
  }
}