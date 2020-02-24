import axios from 'axios'
export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy',
		// baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
  },err => {
    console.log(err)
  })
   // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // 对响应数据做点什么
    return res.data
  },err => {
    console.log(err)
  })
  // 3.发送真正的网络请求
  return instance(config)
}
