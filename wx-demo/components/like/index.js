// components/like/index.js
Component({
  /**
   * 组件的属性列表-外部可获取，修改
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据-私有的属性
   */
  data: {
    yesSrc: './image/like.png',
    noSrc:'./image/like@dis.png'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      if(this.properties.readOnly) {
        return
      }
      
      let like = this.properties.like
      let count = this.properties.count
      this.setData({
        like: !this.properties.like,
        count: this.properties.like? --count  :  ++count
      })
      // 确定是点赞还是取消
      let behavior = this.properties.like ? 'like' : 'cancel'
      // 激活自定义事件
      this.triggerEvent('like', {
        behavior:behavior
      },{})
    }
  }
})
