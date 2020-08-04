import {config} from '../config.js'
const tips = {
  '1':'网络错误',
  '401': 'appkey无效，请前往www.7yue.pro获取appkey',
  '3000': '期刊不存在'
}
class HTTP {
  request(params) {
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data||{},
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        let code = res.statusCode.toString()
        if(code.startsWith('2')) {
          params.success(res)
        }else{
          this._show_error(code)
        }
      },
      fail: err=> {
        this._show_error(err.error_code)
      }
    })
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