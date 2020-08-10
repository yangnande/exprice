import {HTTP} from '../utils/http.js'
class BookModel extends HTTP {
  getHotList(success) {
    var params = {
      url: 'book/hot_list',
      success: success
    }
    this.request(params)    
  }
}
export{BookModel}