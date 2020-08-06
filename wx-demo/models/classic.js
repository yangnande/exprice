import { HTTP } from '../utils/http.js'
class ClassicModel extends HTTP {
  // 获取最新期刊
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.data.index)
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
    let params = {
      url: "classic/" + index + "/" + next_or_previous,
      success: function(data) {
        sCallback(data)
      }
    }
    this.request(params)
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
}
export {ClassicModel}