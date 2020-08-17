import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
let keywordModel = new KeywordModel()
let bookModel = new BookModel()
Component({
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ''
  },

  attached:function(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   * 
   */
  methods: {
    onCancel () {
      this.triggerEvent('cancel',{},{})
    },
    onDelete(event) {
      this.setData({
        searching: false
      })
    },
    onConfirm (event) {
      console.log(event)
      let word = event.detail.value || event.detail.title
      this.setData({
        searching: true
      })
      bookModel.search(0,word,res => {
        this.setData({
          dataArray: res.books
        })
        keywordModel.addToHistory(word)
      })
    }
  }
})
