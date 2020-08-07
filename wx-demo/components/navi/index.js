// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'image/triangle.dis@left.png',
    highLeftSrc: 'image/triangle@left.png',
    disRightSrc: 'image/triangle.dis@right.png',
    highRightSrc: 'image/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if(!this.properties.latest) {
        this.triggerEvent('left',{},{})
      }
    },
    onRight() {
      if(!this.properties.first) {
        this.triggerEvent('right',{},{})
      }
    }
  }
})
