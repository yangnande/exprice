import { BookModel } from '../../models/book.js'
const bookModel = new BookModel()
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  onLoad() {
    const bookData = bookModel.getHotList()
    bookData.then(res => {
      console.log(res)
    })
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
