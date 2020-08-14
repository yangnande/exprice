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
    count: 0
  },
  onLoad (options) {
    // let bid = options.bid
    // // console.log(bid,'bid')
    let bid = '1398'
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
  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  onLike (event) {
    console.log(event.detail.behavior,'999')
    likeModel.like(event.detail.behavior,this.data.book.id,400)
  }
})
