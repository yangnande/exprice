// 第三种实现-构造函数

//->实现一个选项卡的封装;我们可以分析出,只要多个选项卡的主体结构一样，那么每一个思想都是一模一样的，唯一不一样的就是最外层的盒子不一样
~function() {
  function TabChange(container, defaultIndex) {
    return this.init(container, defaultIndex)
  }
  TabChange.prototype = {
    constructor: TabChange,
    //->按照索引来设置影认选中的页卡
    defaultIndexEven : function () {
      utils.addClass(this.oLis[this.defaultIndex],'select')
      utils.addClass(this.divList[this.defaultIndex],'select')
    },
    // 事件委托绑定切换
    liveClick:function() {
      let _this = this
      this.tabFirst.onclick = function (e){
          e = e || window.event;
          e.target =e.target || e.srcElement;
          //->说明我当前点击是li标签
          if (e.target.tagName.toLowerCase() === "li") {
            _this.detailFn(e.target)
          }
        }
    },
    detailFn:function(curEle) {
         // this->当前点击的这个li
        var index = utils.index(curEle);
        utils.addClass(curEle, "select");
        for(i= 0;i < this.divList.length; i++){
          i !== index ? utils.removeClass(this.oLis[i],"select"):null;
          i === index ? utils.addClass(this.divList[i],
            "select") : utils.removeClass(this.divList[i],"select");
        }
    },
    // 初始化，也是当前插件的唯一入口
    init: function (container, defaultIndex) {
      container = container || null;
      this.defaultIndex = defaultIndex;
      this.tabFirst = utils.firstChild(container);
      this.oLis = utils.children(this.tabFirst);
      this.divList = utils.children(container,'div');
      this.defaultIndexEven()
      this.liveClick()
      return this
    }
  }
  window.zhufengTab = TabChange
}()