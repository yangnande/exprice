var utils = {
  flag: "getComputedStyle" in window,
  listToArray:function (likeAry){
    var ary =[];
    try {
      ary = Array.prototype.slice.call(likeAry) 
    } catch (e) {
      for (var i = 0; i < likeAry.length; i++) {
        ary[ary.length] = likeAry[i]
      }
    }
    return ary
  },
  //->jsonParse:把JSON格式的字符串转换为JSON格式的对象
  jsonParse: function(str) {
    // var val = null
    // try {
    //   val = JSON.parse(str)
    // } catch (error) {
    //   val = eval("("+ str +")")
    // }
    // return val
    return "JSON" in window ? JSON.parse(str) : eval("("+ str +")")
  },
  getCss:function(curEle, attr) {
    var val = null;
    // console.log("getComputedStyle" in window);
    if ("getComputedStyle" in window){
        val = window.getComputedStyle(curEle,null)[attr];
    } else { // IE6~8
        //->如果传递进来的结果是opacity,说明我想获取到的是透明度,但是在工E6~8下获取透明度需要使用filter
        if (attr === " opacity"){
            val = curEle.currentstyle["filter"];
            //->"alpha(opacity=10)”把获取到的结果进行剖析,获取里面的数字,让数字乘以100才和标准的值,览器保持了一致
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1

        }else {
            val = curEle.currentstyle[attr];
        }
    }
    // console.log(window.getComputedStyle(curEle,null)[attr]);
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/;
    return reg.test(val) ? parseFloat (val) :val;
    // return val;
    // return parseFloat(val);//->这样写肯定不行,对于某些样式属相的值是不能去单位的,例如:float、position.margin、padding、border这些复合值、background ..
  },
  offset:function (curEle) {
    var totalLeft = null, totalTop = null, par = curEle.offsetParent;
    //->首先把自己本身的进行累加
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;
    //->只要没有找到body,我们就把父级参照物的边框和偏移也进行累加
    while (par) {
        if (navigator.userAgent.indexOf ("MSIE 8.0") === -1 ) {//->不是标准的IE8浏览器, 我们才进行累加边框
            //->累加父级参照物的边框
            totalLeft += par.clientLeft;
            totalTop += par.clientTop;
        }
        
        //->累加父级参照物本身的偏移
        totalLeft += par.offsetLeft;
        totalTop += par.offsetTop;
        par = par.offsetParent;
    }
    return {left: totalLeft, top: totalTop};
  },
  // win:获取或者设置关于浏览器的盒子模型的信息
  win:function (attr, value) {
    //->不传value的话默认是获取样式值
    if (typeof value === "undefined"){
      return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
  },
  //->children:获取curEle下所有的元素子节点(兼容所有的浏览器),如果传递了tagName,可以在获取的集合中进行二次筛选,把指定标签名的获取到
  children:function (curEle,tagName){
    var ary = [];
    //->IE6~8下不能使用内置的children属性,我们自己写代码实现
    if (/MSIE(6|7|8)/i.test(navigator.userAgent)) {
        var nodeList =curEle.childNodes;
        for (var i = 0, len = nodeList.length; i < len; i++){
            var curNode = nodeList[i]; 
            curNode.nodeType === 1 ? ary[ary.length] = curNode : null
        }
        nodeList = null
    }else {
        //->标准浏览器中,我们直接使用children即可，但是这样获取的是一个元素集合(类数组),为了和IE6~8下保持一致,我们借用数组原型上的slice,实现把类数组转换为数组
        ary = this.listToArray(curEle.children)
    }
    // 二次筛选
    if(typeof tagName === "string") {
        for (var k = 0;k < ary.length; k++){
            var curEleNode = ary[k];
            if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()){
                //->不是我想要的标签
                ary.splice(k,1);
                k--;
            }
        }
    }
    return ary
  },
  //->prev:获取上一个哥哥元素节点
  //->首先获取当前元素的上一个哥哥节点,判断是否为元素节点，不是的话基于当前的继续找上面的哥哥节点...一直到找到哥哥元素节点为止,如果没有哥哥元素节点，返回null即可
  prev:function(curEle){
    if (this.flag){
      return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1){
      pre = pre.previousSibling;
    }
    return pre
  },
  //->next:获取下一个弟弟元素节点
  next:function(curEle){
    if (this.flag){
      return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1){
      nex = nex.nextSibling;
    }
    return nex
  },
  // ->prevAll:获取所有的哥哥元素节点
  prevAll:function(curEle) {
    var ary = [];
    var pre = this.prev(curEle);
    while (pre) {
      ary.unshift(pre);
      pre = this.prev(pre);
    }
    return ary;
  },
  // ->nextAll:获取所有的弟弟元素节点
 nextAll:function(curEle) {
    var ary = [];
    var nex= this.next(curEle);
    while (nex) {
      ary.push(nex);
      nex= this.next(pre);
    }
    return ary;
  },
  //->sibling:获取相邻的两个元紊节点
  sibling: function(curEle) {
    var pre = this.prev(curEle);
    var nex = this.next(curEle);
    var ary = [];
    pre ? ary.push(pre) : null;
    nex ? ary.push(nex): null;
    return ary;
  },
  //->siblings:获取所有的兄弟元素节点
  siblings:function(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle))
  },
  //->index:获取当前元素的索引
  index: function (curEle){
    return this.prevAll(curEle).length;
  },
  //->firstChild:获取第一个元素子节点
  firstChild: function (curEle){
    var chs = this.children(curEle);
    return chs.length > 0 ? chs[0] : null;
  },
  //->lastChild:获取最后一个元素子节点
  lastChild: function (curEle){
    var chs = this.children(curEle);
    return chs.length > 0 ? chs[chs.length-1] : null;
  },
  //->append: 向指定容器的末尾追加元素
  append:function (newEle, container){
    container.appendchild(newEle)
  },
  //->prepend:向指定容器的开头追加元素
  //->把新的元素添加到容器中第一个子元素节点的前面
  prepend: function (newEle, container) {
    var fir = this.firstChild(container);
    if(fir) {
      container.insertBefore(newEle,fir);
      return;
    }
    container.appendChild (newEle) ;
  },
  //->insertBefore:把新元素(newEle)追加到指定元素(oldEle)的前面
  insertBefore: function (newEle, oldEle) {
    oldEle.parentNode.insertBefore(newEle,oldEle);
  },
  // ->insertAfter:把新元素(newEle)追加到指定元素(oldEle)的后面
  //->相当于追加到oldEle弟弟元素的前面,如果弟弟不存在，也就是当前元素已经是最后一个了，我们把新的元素放在最末尾即可
  insertAfter: function (newEle, oldEle) {
    var nex = this.next(oldEle);
    if (nex) {
      oldEle.parentNode.insertBefore(newEle, nex);
      return;
    }
    oldEle.parentNode.appendChild(newEle);
  }
}