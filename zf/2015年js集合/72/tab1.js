// 第一种实现-普通方法

//->实现一个选项卡的封装;我们可以分析出,只要多个选项卡的主体结构一样，那么每一个思想都是一模一样的，唯一不一样的就是最外层的盒子不一样
~function() {
  // tabChange:封装一个选项卡的插件，只要大结构保持统一，以后实现选项卡的功能，只需要调取这个方法执行即可实现
  // —>container:当前要实现选项卡的这个容器
  // ->defaultIndex默认选中项的索引
  function tabChange(container,defaultIndex) {
    // var tabFir = document.getElementById(container);
    // var tabOptions = document.getElementById("tabOptions");
    // var oLis =utils.children(tabOptions);
    // var oDivs = utils.children(tabFir,'div');
    var tabFirst = utils.firstChild(container),oLis = utils.children(tabFirst),divList = utils.children(container,'div');
      //->1 让defaultIndex对应的页卡有选中的样式d
      defaultIndex =defaultIndex || 0;
      utils.addClass(oLis[defaultIndex],'select')
      utils.addClass(divList[defaultIndex],'select')
      // function changeTab(n){
      //     for (var i=0; i<oLis.length; i++){
      //         oLis[i].className=null
      //         oDivs[i].className=null
      //     }
      //     oLis[n].className="select"
      //     oDivs[n].className="select"
      // }
      //->不行:JS中所有的事件绑定都是异步编程,开始我们只是给元素的点击行为绑定了一个方法,但是需要手动点击才会执行这个方法,在此期间,不会干等着点击,继续执行下一次露环,当点击的时候,循环早已经结束
      //->在给元素绑定事件的时候,绑定的这个方法还只是定义的部分,此时方法中存储的都是字符串,我们看到的只是个字符
      //->当点击的时候,执行对应的绑定方法,形成一个私有的作用域A,在A中会使用到变量,而i不是自己私有的是上级作用域window下的i,此时window下的i已经变为oLis.length了
      // for (var i = 0; i <oLis.length; i++){
      //     oLis[i].onclick = function (){
      //         changeTab(i)
      //     }
      // }
      //->解决:
      //1)使用自定义属性的方式->我们要操作(获取/修改)当前元素的某个值,但是还不想受执行顺序和环境的影响,我们最简单的方式就是把其放在自己的自定义属性上即可
      //->2 实现具体的切换功能
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
      //2)使用闭包
      // for (var i = 0; i <oLis.length; i++){
      //     ~function(i){
      //         oLis[i].onclick = function (){
      //             changeTab(i)
      //         }
      //     }(i)
      // }
      // for (var i = 0; i <oLis.length; i++){
      //     oLis[i].onclick = (function(i){
      //         return function (){
      //             changeTab(i)
      //         }
      //     })(i)
      // }
  }
  window.zhufengTab = tabChange
}()