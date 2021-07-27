// 第二种实现-事件委托的方法

//->实现一个选项卡的封装;我们可以分析出,只要多个选项卡的主体结构一样，那么每一个思想都是一模一样的，唯一不一样的就是最外层的盒子不一样
~function() {
  // tabChange:封装一个选项卡的插件，只要大结构保持统一，以后实现选项卡的功能，只需要调取这个方法执行即可实现
  // —>container:当前要实现选项卡的这个容器
  // ->defaultIndex默认选中项的索引
  function tabChange(container,defaultIndex) {
    var tabFirst = utils.firstChild(container),oLis = utils.children(tabFirst),divList = utils.children(container,'div');
     //->1 让defaultIndex对应的页卡有选中的样式d
     defaultIndex =defaultIndex || 0;
     utils.addClass(oLis[defaultIndex],'select')
     utils.addClass(divList[defaultIndex],'select')
    // 使用事件委托来优化我们的点击操作
    tabFirst.onclick = function (e){
      e = e || window.event;
      e.target =e.target || e.srcElement;
      //->说明我当前点击是li标签
      if (e.target.tagName.toLowerCase() === "li") {
        detailFn.call(e.target,oLis,divList)
      }
    }
     
      for (var i = 0; i <oLis.length; i++){
          oLis[i].index = i
          oLis[i].onclick = function (){
              //->首先把兄弟元紊的选中样式都移除掉
              var cursiblings = utils.siblings(this);
              for (var i = 0; i < cursiblings.length; i++){
                  utils.removeClass(cursiblings[i], "select");
              }
              //->在让当前点击这个元素有选中的样式
              utils.addClass(this,"select");
              // changeTab(this.index)
              //->在让当前点击这个LI父亲元素的所有的弟弟元素中(三个DIV)和当前点击的这个li索引相同的有选中的样式,其余的移除选中样式
              var index = utils.index(this) ;
              // var divList = utils.nextAll(this.parentNode);
              for(i= 0;i < divList.length; i++){
                  i === index ? utils.addClass(divList[i],
                  "select") : utils.removeClass(divList[i],"select");
              }
          }
      }
  }
  function detailFn (oLis,divList) {
    // this->当前点击的这个li
    var index = utils.index(this);
    utils.addClass(this, "select");
    for(i= 0;i < divList.length; i++){
      i !== index ? utils.removeClass(oLis[i],"select"):null;
      i === index ? utils.addClass(divList[i],
        "select") : utils.removeClass(divList[i],"select");
    }
  }
  window.zhufengTab = tabChange
}()