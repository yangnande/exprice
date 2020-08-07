import {config} from '../config.js'
const tips = {
  '1':'网络错误',
  '401': 'appkey无效，请前往www.7yue.pro获取appkey',
  '3000': '期刊不存在'
}
class HTTP {
  request(url,data={},method='GET') {
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,data={},method='GET') {
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        let code = res.statusCode.toString()
        if(code.startsWith('2')) {
          resolve(res.data)
        }else{
          reject(this._show_error(code))
        }
      },
      fail: err=> {
        reject(this._show_error(code))
      }
    })
    // 剥夺了函数return的能力 因为res是通过异步的方法获取
  }
  // _开头代表是私有方法，外部环境不能调用
  _show_error(code) {
    wx.showToast({
      title: tips[code]?tips[code]:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}