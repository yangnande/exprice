import {HTTP} from '../utils/http.js'
class KeywordModel extends HTTP{
  key = 'q'
  max = 5

  getHistory(){
    let words = wx.getStorageSync(this.key)
    if(!words) {
      return []
    }
    return words
  }

  getHot(success){
    this.request({
      url:'book/hot_keyword',
      success:success
    })
  }

  addToHistory(word){
    let keywords = this.getHistory()
    console.log(word,'word')
    if(word) {
      if(keywords) {
        let has = keywords.includes(word)
        if(!has) {
          if(keywords.length>=this.max) {
            keywords.pop()
          }
          keywords.unshift(word)
        }
      }else {
        keywords.push(word)
      }
      wx.setStorageSync(this.key,keywords)
    }
  }
}

export { KeywordModel}