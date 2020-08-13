import {HTTP} from '../utils/http.js'
class BookModel extends HTTP {
  // 获取书籍列表
  getHotList(success) {
    var params = {
      url: 'book/hot_list',
      success: success
    }
    this.request(params)    
  }
  // 获取书籍详情
  getDetail(bid, success){
    let params = {
      url:'book/'+ bid +'/detail',
      success:success
    }
    this.request(params)
  }
  // 获取书籍喜欢的状态和数量
  getLikeStatus(bid,success){
    let params = {
      url: 'book/' + bid + '/favor',
      success:success
    }
    this.request(params)
  }

  getMyBookCount(success){
    let params = {
      url:'book/favor/count',
      success:success
    }
    this.request(params)
  }
}
export{BookModel}