import { HTTP } from '../utils/http.js'
class CommentModel extends HTTP {
  getComment(bid, success) {
    var params = {
      url: 'book/' + bid + '/short_comment',
      success: success
    }
    this.request(params)
  }
  // 新增短评
  addComment(bid, comment, success){
    let params = {
      url:'book/add/short_comment',
      success:success,
      method:'POST',
      data:{
        book_id:bid,
        content:comment
      },
      error:(err)=>{
        wx.showToast({
          title: '评论失败',
        })
      }
    }
    this.request(params)
  }
}
export { CommentModel }