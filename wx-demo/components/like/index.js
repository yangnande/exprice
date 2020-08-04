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
      let like = this.properties.like
      let count = this.properties.count
      this.setData({
        like: !like,
        count: like? ++count : --count
      })
    }
  }
})
