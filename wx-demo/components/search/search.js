import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
let keywordModel = new KeywordModel()
let bookModel = new BookModel()
Component({
  properties: {
    more: {
      type: String,
      observer: '_lodeMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: '',
    loading: false // 解决操作过快，频繁加载数据问题
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
    _lodeMore () {
      let start = this.data.dataArray.length
      let word = this.data.q
      console.log(start,word,'到达底部了')
      if(this.data.loading) {
        return
      }
      if(word) {
        this.data.loading = true
        bookModel.search(start,word,res => {
          this.data.loading = false
          this.setData({
            dataArray: this.data.dataArray.concat(res.books)
          })
        })
      }
    },
    onCancel () {
      this.triggerEvent('cancel',{},{})
    },
    onDelete() {
      console.log('555',this.data.searching)
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
      if(word) {
        bookModel.search(0,word,res => {
          this.setData({
            dataArray: res.books,
            q:word
          })
          keywordModel.addToHistory(word)
        })
      }
    }
  }
})
