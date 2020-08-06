// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titie: String,
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
      console.log(this.properties.latest,'this.properties.latest')
      if(!this.properties.latest) {
        this.triggerEvent('left',{},{})
      }
    },
    onRight() {
      console.log(this.properties.first,'this.properties.first')
      if(!this.properties.first) {
        this.triggerEvent('right',{},{})
      }
    }
  }
})
