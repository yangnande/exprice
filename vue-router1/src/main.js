import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store/index.js'
Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 加入sotre的配置
  render: h => h(App)
})
