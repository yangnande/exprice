import axios from 'axios'
// 方法一
export function request (config) {
  // 创建axois实例
  var instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return err
  })
  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    return err
  })
  return instance(config)
}
// 方法二
// export function request (config) {
//   return new Promise((resolve, reject) => {
//     var instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     instance(config).then(res => {
//       resolve(res)
//     }, err => {
//       reject(err)
//     })
//   })
// }
// 方法三
// export function request (config) {
//   // 创建axois实例
//   var instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   instance(config.baseConfig).then(res => {
//     config.suc(res)
//   }, err => {
//     config.fail(err)
//   })
// }
// 方法四
// export function request (config, suc, fail) {
//   // 创建axois实例
//   var instance = axios.create({
//     baseURL: 'http://223.207.32.32:8000',
//     timeout: 5000
//   })
//   instance(config).then(res => {
//     suc(res)
//   }, err => {
//     fail(err)
//   })
// }

// 函数传递方法
// function test (a, b) {
//   a('aa')
//   b('bb')
// }
// test(function (res) {
//   console.log(res, 'aaa')
// }, function (res) {
//   console.log(res, 'bbb')
// })
