import {HTTP} from '../utils/http-p.js'
class BookModel extends HTTP {
  getHotList() {
    console.log('book1')
    return this.request('book/hot_list',{
      name: 1,
      age: 18
    })
  }
}
export{BookModel}