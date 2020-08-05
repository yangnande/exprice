// components/classic/epsoide/index.js
Component({
  // 在组件实例进入页面节点树时执行
  attached: function() {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth()
    this.setData({
      month: this.data.months[m],
      year: y
    })
  },
  // 在组件在视图层布局完成后执行
  ready: function() {
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer:function(newVal,val) {
        let result = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: result
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月',
      '十二月'
    ],
    month: '',
    year: 0,
    _index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
