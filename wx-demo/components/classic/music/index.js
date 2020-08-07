import {classBehavior} from '../classic-beh.js'
let mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [classBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc: './image/player@playing.png',
    pauseSrc: './image/player@waitting.png'
  },
  // 在组件实例进入页面节点树时执行
  attached: function() {
    this._recoverPlaying()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if(!this.data.playing) {
        this.setData({
          playing: true
        })
        if(mMgr.src===this.properties.src) {
          mMgr.play()
        } else {
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      }else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    /**
     *  处理切换页面 当前播放页面播放状态不对
     */
    _recoverPlaying() {
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if(mMgr.src===this.properties.src) {
        if(!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },
    _monitorSwitch() {
      mMgr.onPlay(()=>{
        this._recoverPlaying()
      })
      mMgr.onPause(()=>{
        this._recoverPlaying()
      })
      mMgr.onStop(()=>{
        this._recoverPlaying()
      })
      mMgr.onEnded(()=>{
        this._recoverPlaying()
      })
    }
  }
})
