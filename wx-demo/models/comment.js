import { HTTP } from '../utils/http.js'
class CommentModel extends HTTP {
  getComment(bid, success) {
    var params = {
      url: 'book/' + bid + '/short_comment',
      success: success
    }
    this.request(params)
  }
}
export { CommentModel }