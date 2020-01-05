import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 创建一个事件总线 可以跨组件接收和发送事件
Vue.properType.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
