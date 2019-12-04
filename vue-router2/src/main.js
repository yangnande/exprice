// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

// 对象和数组常用的解构
// var obj = {
//   name: 'lele',
//   age: 18
// }
// var {name, age} = obj
// console.log(name, age, '对象常用的解构')
// var arr = ['name1', 'name2', 'name3']
// var [name1, name2, name3] = arr
// console.log(name1, name2, name3, '数组常用的解构')
// 1axios的基本使用
// axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
//   // method: 'post'
// }).then(res => {
//   console.log(res, '第一次请求的数据')
// })
// axios({
//   url: 'http://123.207.32.32:8000/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res, '第二次请求的数据')
// })
// 2.axios发送并发请求
// axios.all([axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }), axios({
//   url: 'http://123.207.32.32:8000/home/data',
//   params: {
//     type: 'sale',
//     page: 5
//   }
// })]).then(res => {
//   console.log(res, 'axios发送并发请求')
// })
// 3.使用全局的axios和对应的配置在进行网络请求
// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeOut = 5000
// axios.all([axios({
//   url: '/home/multidata'
// }), axios({
//   url: '/home/data',
//   params: {
//     type: 'sale',
//     page: 5
//   }
// })]).then(res => {
//   console.log(res, '全局的axios和对应的配置在进行网络请求')
// })
// axios.defaults.baseURL = 'http://223.207.32.32:8000'
// axios.defaults.timeOut = 10000
// axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
//   // method: 'post'
// }).then(res => {
//   console.log(res, '全局和局部的axios，局部优先')
// })
// 4.创建对应的axios的实例（规范相同和不同的地址）
// var instance1 = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
// instance1({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res, '创建对应的axios的实例1')
// })
// instance1({
//   url: '/home/data'
// }).then(res => {
//   console.log(res, '创建对应的axios的实例2')
// })
// 假的url
// var instance2 = axios.create({
//   baseURL: 'http://223.207.32.32:8000',
//   timeout: 5000
// })
// instance2({
//   url: '/home/data'
// }).then(res => {
//   console.log(res, '创建对应的axios的实例2')
// })
import {request} from '../network/request'
// 方法一
request('/home/multidata').then(res => {
  console.log(res, 'suc')
}, err => {
  console.log(err, 'err')
})
// 方法二
// request('/home/multidata').then(res => {
//   console.log(res, 'suc')
// }, err => {
//   console.log(err, 'err')
// })
// 方法三
// request({
//   baseConfig: '/home/multidata',
//   suc: function (res) {
//     console.log(res, 'suc')
//   },
//   fail: function (res) {
//     console.log(res, 'err')
//   }
// })
// 方法四
// request('/home/multidata', function (res) {
//   console.log(res, 'suc')
// }, function (res) {
//   console.log(res, 'err')
// })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
