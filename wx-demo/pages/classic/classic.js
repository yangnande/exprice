import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
const classModel = new ClassicModel()
const likeModel = new LikeModel()
Page({
  data: {
    classic: null
  },
  onLike: function(e) {
    // console.log(e,'classic')
    let behavior = e.detail.behavior
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
  },
  /**
   * 生命周期函数-监听页面加载（在onReady，onShow这些周期函数之前执行）
   */
  onLoad:function(options) {
    classModel.getLatest(res=>{
      this.setData({
        classic: res.data
      })
      // console.log(res,'res')
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
    
  }
})