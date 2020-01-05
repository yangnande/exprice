import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'

Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
