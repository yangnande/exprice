import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBehaviors } from '../../behaviors/pagination.js'
let keywordModel = new KeywordModel()
let bookModel = new BookModel()
Component({
  properties: {
    more: {
      type: String,
      observer: 'lodeMore'
    }
  },
  behaviors: [paginationBehaviors],
  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: '',
    
    loadCenter: false
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
    lodeMore () {
      let word = this.data.q
      if(this.isLocked()) {
        return
      }
      if(word) {
        if(this.hasMore()) {
          this.locked()
          bookModel.search(this.getCurrentStart(),word,res => {
            this.setMoreData(res.books)
            this.unLocked()
          },err => {
            this.unLocked()
          })
        }
      }
    },
    onCancel () {
      this.initPagination()
      this.triggerEvent('cancel',{},{})
    },
    onDelete() {
      this.setData({
        searching: false
      })
      this.initPagination()
    },
    onConfirm (event) {
      this.initPagination()
      this._showResult()
      let word = event.detail.value || event.detail.title
      if(word) {
        this._showLoadingCenter()
        bookModel.search(0,word,res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q:word
          })
          keywordModel.addToHistory(word)
          this._closeLoadingCenter()
        })
      }
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false
      })
    },
   
    _showLoadingCenter() {
      this.setData({
        loadCenter: true
      })
    },
    _closeLoadingCenter() {
      this.setData({
        loadCenter: false
      })
    }
  }
})
