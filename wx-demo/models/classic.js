import { HTTP } from '../utils/http.js'
class ClassicModel extends HTTP {
  prefix = 'classic'
  // 获取最新期刊
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }
  // 获取前一个数据
  getPrevious(index,sCallback) {
    this._getClassic(index,'previous',sCallback)
  }
  // 获取下一个数据
  getNext(index,sCallback) {
    this._getClassic(index,'next',sCallback)
  }
  // 获取数据-期刊，电影，句子
  _getClassic(index,next_or_previous,sCallback) {
    let key = next_or_previous === 'next' ? this._fullKey(index+1) : this._fullKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      let params = {
        url: "classic/" + index + "/" + next_or_previous,
        success: data => {
          sCallback(data)
          let key = this._fullKey(data.index)
          wx.setStorageSync(key,data)
        }
      }
      this.request(params)
    } else {
      sCallback(classic)
    }
  }
  isFirst(index) {
    if(index === 1) {
      return true
    } else {
      return false
    }
  }
  isLatest(index) {
    let latestEpsoide = wx.getStorageSync('lastest')
    if(index==latestEpsoide) {
      return true
    }else {
      return false
    }
  }
  // 在缓存中存放最新一期的期数
  _setLatestIndex(index) {
    wx.setStorageSync('lastest',index)
  }
  // 缓存存储数据
  _fullKey(partKey) {
    // console.log(partKey,'---22----')
    return this.prefix + '-' + partKey
  }
  getMyFavor(success){
    let params={
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }
}
export {ClassicModel}