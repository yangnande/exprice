import { HTTP } from '../utils/http.js'
class LikeModel extends HTTP {
  like(behavior,artID,category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  getClassicLikeStatus(cid,type,success) {
    var params = {
      url: 'classic/' + type + '/' + cid + '/favor',
      success: success
    }
    this.request(params)
  }
}
export {LikeModel}