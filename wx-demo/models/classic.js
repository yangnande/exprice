import { HTTP } from '../utils/http.js'
class ClassicModel extends HTTP {
  // 获取最新期刊
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        sCallback(res)
      }
    })
  }
}
export {ClassicModel}