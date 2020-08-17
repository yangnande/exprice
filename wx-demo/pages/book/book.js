import { BookModel } from '../../models/book.js'
const bookModel = new BookModel()
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  onLoad() {
    bookModel.getHotList(res => {
      // console.log(res)
      this.setData({
        books: res
      })
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    books: [],
    searchPanel: true
  },

  onActivateSearch () {
    this.setData({
      searchPanel: true
    })
  },
  onCancel () {
    this.setData({
      searchPanel: false
    })
  }
})
