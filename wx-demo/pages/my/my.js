import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
const bookModel = new BookModel()
const classicModel = new ClassicModel()
// pages/my/my.js
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
    myBooksCount: 0,
    hasUserInfo: true,
    userInfo: null,
    classics: null
  },
  onLoad () {
    this.hasGottenUserInfo()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyBookCount () {
    bookModel.getMyBookCount(data => {
      // console.log(data,'data')
      this.setData({
        myBooksCount: data.count
      })
    })
  },
  getMyFavor: function() {
    classicModel.getMyFavor((data) => {
      console.log(data)
      this.setData({
        classics: data
      })
    })
  },
  hasGottenUserInfo () {
    wx.getSetting({
      success: data => {
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                hasUserInfo: true
              })
            }
          })
        }else{
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  getUserInfo (e) {
    const userInfo = e.detail.userInfo
    if(userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }else{
      this.setData({
        hasUserInfo: false
      })
    }
  },
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  onStudy () {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }
})
