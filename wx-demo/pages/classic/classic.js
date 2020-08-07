import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
const classModel = new ClassicModel()
const likeModel = new LikeModel()
Page({
  data: {
    classic: null,
    first: false,
    latest: true
  },
  onLike: function(e) {
    // console.log(e,'classic')
    let behavior = e.detail.behavior
    // console.log('like--',this.data.classic)
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
  },
  onPrev() {
    this._updateClassic('previous')
  },
  onNext() {
    this._updateClassic('next')
  },
  /**
   * 生命周期函数-监听页面加载（在onReady，onShow这些周期函数之前执行）
   */
  onLoad:function(options) {
    classModel.getLatest(data=>{
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data,
        first: classModel.isFirst(data.index),
        latest: classModel.isLatest(data.index)
      })
      // console.log(this.data,'data')
    })
  },
  /**
   * 生命周期函数-监听页面初次加载完成
   */
  onReady:function(options) {
    
  },
  /**
    * 生命周期函数-监听页面显示
    */
  onShow:function(options) {
    
  },
  /**
    * 生命周期函数-监听页面隐藏
    */
  onHide:function(options) {
    
  },
  methods: {
    
  },
  /**
   *  公共部分-上一页，下一页
   */
  _updateClassic:function(nextOrPrevious) {
    let index = this.data.classic.index
    classModel._getClassic(index,nextOrPrevious,data=>{
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data,
        first: classModel.isFirst(data.index),
        latest: classModel.isLatest(data.index)
      })
    })
  },
  /**
   *  公共部分-喜欢状态
   */
  _getLikeStatus:function(cid,type) {
    likeModel.getClassicLikeStatus(cid,type,data => {
      this.setData({
        like:data.like_status,
        count:data.fav_nums
      })
    })
  }
})