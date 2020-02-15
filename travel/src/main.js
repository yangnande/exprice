// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import router from './router'
import store from './store'

import '@/styles/reset.css'
import '@/styles/border.css'
import '@/styles/iconfont.css'
import 'swiper/dist/css/swiper.css'

// 1像素边框
import fastClick from 'fastClick'
fastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(vueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
