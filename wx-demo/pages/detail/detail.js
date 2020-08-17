import { BookModel } from '../../models/book.js'
import { CommentModel } from '../../models/comment.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
const commentModel = new CommentModel()
const likeModel = new LikeModel()
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },
   /**
   * 组件的初始数据
   */
  data: {
    book: null,
    comments: [],
    like: false,
    count: 0,
    posting: false
  },
  onLoad (options) {
    let bid = options.bid
    // // console.log(bid,'bid')
    // let bid = '1398'
    bookModel.getDetail(bid,res => {
      this.setData({
        book: res
      })
    })
    commentModel.getComment(bid,res => {
      this.setData({
        comments: res.comments
      })
    })
    bookModel.getLikeStatus(bid,res => {
      this.setData({
        like: res.like_status,
        count: res.fav_nums
      })
    })
  },
  onFakePost() {
    console.log(22)
    this.setData({
      posting: true
    })
  },
  onCancel () {
    this.setData({
      posting: false
    })
  },
  onLike (event) {
    console.log(event.detail.behavior,'999')
    likeModel.like(event.detail.behavior,this.data.book.id,400)
  },
  onPost(event) {
    let content = event.detail.title || event.detail.value
    if (!content) {
      return
    }
    if(content.length>12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
    }
    commentModel.addComment(this.data.book.id,content,res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  }
})
