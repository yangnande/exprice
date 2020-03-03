import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'FastClick'
import vueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
// 创建一个事件总线 可以跨组件接收和发送事件
Vue.prototype.$bus = new Vue()
//安装toast
Vue.use(toast)
Vue.use(vueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
