import { BookModel } from '../../models/book.js'
import { CommentModel } from '../../models/comment.js'
const bookModel = new BookModel()
const commentModel = new CommentModel()
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  onLoad (option) {
    // let bid = option.bid
    let bid = '1120'
    bookModel.getDetail(bid,res => {
      // console.log(res,'1')
      this.setData({
        book: res
      })
    })
    commentModel.getComment(bid,res => {
      console.log(res,'2')
      this.setData({
        comments: res.comments
      })
    })
    bookModel.getLikeStatus(bid,res => {
      // console.log(res,'3')
      this.setData({
        like: res.like_status,
        count: res.fav_nums
      })
    })
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
  
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
