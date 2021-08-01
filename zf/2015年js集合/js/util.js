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
    } else {
        //->标准浏览器中,我们直接使用children即可,但是这样获取的是一个元素集合(类数组),为了和IE6~8下保持一致,我们借用数组原型上的slice,实现把类数组转换为数组
        // console.log(curEle.children);
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
  //->首先获取当前元素的上一个哥哥节点,判断是否为元素节点,不是的话基于当前的继续找上面的哥哥节点...一直到找到哥哥元素节点为止,如果没有哥哥元素节点,返回null即可
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
      nex= this.next(nex);
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
  //->相当于追加到oldEle弟弟元素的前面,如果弟弟不存在,也就是当前元素已经是最后一个了,我们把新的元素放在最末尾即可
  insertAfter: function (newEle, oldEle) {
    var nex = this.next(oldEle);
    if (nex) {
      oldEle.parentNode.insertBefore(newEle, nex);
      return;
    }
    oldEle.parentNode.appendChild(newEle);
  },
  hasClass:function (curEle, className) {
    var reg = new RegExp("(^| +)" + className + "( +|$)");
    return reg.test(curEle.className)
  },
  addClass:function (curEle,className) {
    //->为了防止className传递进来的值包含多个样式类名,我们把传递进来的字符串按照一到多个空格拆分成数组中的每一项
    var ary = className.split(/ +/g);
    //->循环数组, 一项项的进行验证增加即可
    for (var i = 0, len = ary.length; i < len; i++) {
        var curName = ary[i];
        if (!this.hasClass (curEle,curName) ) {
            curEle.className +=" " + className;
        }
    }
  },
  removeClass: function (curEle,className) {
    //->为了防止className传递进来的值包含多个样式类名,我们把传递进来的字符串按照一到多个空格拆分成数组中的每一项
    var ary = className.split(/ +/g);
    //->循环数组, 一项项的进行验证增加即可
    for (var i = 0, len = ary.length; i < len; i++) {
        var curName = ary[i];
        if (this.hasClass(curEle,curName)) {
            var reg = new RegExp("(^| +)" + curName + "( +|$)","g");
            curEle.className = curEle.className.replace(reg," ")
        }
    }
  },
  //->getElementsByClass:通过元素的样式类名获取一组元素集合
  //->className:要获取的样式类名(可能是一个也可能是多个)
  //->context:获取元素的上下文->如果这个值不传递的话,默认document
  getElementsByClass:function (className, context) {
    context = context||document;
    if(this.flag) {
      return this.listToArray(context.getElementsByClassName(className))
    }
    //->把传递进来的样式类名的首尾空格先去掉,然后在按照中间的空格把它里面的每一项拆分成数组
    var classNameAry = className.replace(/(^ +| +$)/g, "").split(/ +/g);
    var ary = []
    //->获取指定上下文中的所有的元素标签,循环这些标签,获取每一个标签的className样式类名的字符串
    var nodeList = context.getElementsByTagName("*");//->获取指定上下文中的所有的元素标签
    for (var i = 0,len = nodeList.length; i < len; i++){
        var curNode = nodeList[i] ;
        console.log(curNode.className);
        //->> 判断curNode.className是否即包含"w3"也包含"w1",如果两个都包含的话, curNode就是我想要的,否则就不是我想要的
        //->在循环["w3","w1"]
        var isOk = true; //->我们假设curNode中包含了所有的样式
        for (var k = 0; k < classNameAry.length; k++) {
            var reg = new RegExp("(^| +)" + classNameAry[k] + "( +|$)") ;
            //->都一次"w3"/(^| +)w3( +|$)/
            //->都-次"w1" /(^| +)w1( +|S)/
            if (!reg.test (curNode.className)) {
                isOk = false;
                break;
            }
            
        }
        if(isOk) 
        {//->拿每一个标签分别和所有样式类名比较后,如果结果还是true的话,说明当前元素标签包含了所有的样式,也是我们想要的
            ary.push(curNode)
        }
    }
    return ary
  },
  // ->setCss:给当前元素的某一个样式属性设置值(增加在行内样式上的)
  setCss:function (curEle,attr, value){
    //->在JS中设置float样式值的话也需要处理兼容
    if (attr === "f1oat"){
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
        return;
    }

    //->如果打算设置的是元素的透明度,我们需要设置两套样式来兼容所有的浏览器
    if (attr === "opacity") {
        curEle["style"]["opacity"] = value;
        curEle["style"]["filter"]="alpha(opacity=" + value*100+")";
        return 
    }
    //->对于某些样式属性,如果传递进来的值没有加单位,我们需要把单位默认的补充上,这样的话,这个方法就会人性化一些
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
    // console.log(reg.test(attr));
    if(reg.test(attr)) {
        if (!isNaN (value)) {//->在判断传递进来的value值是否是一个有效的数字,如果是有效数字的话,证明当前传递进来的值没有加单位,我们给补充单位
            value += "px"
        }
    }
    curEle["style"][attr] = value;
  },
  //->setGroupCss:给当前元素批量的设置样式属性值
  setGroupCss:function (curEle,options){
    // console.log(options);
    //->通过检测options的数据类型,如果不是一个对象,则不能进行批量的设置
    options = options || 0 ;
    if (options.toString() !== "[object Object]"){
      return;
    }
    //->遍历对象中的每一项,调取setCss方法一个个的进行设置即可
    for (var key in options) {
      if(options.hasOwnProperty(key)) {
        this.setCss(curEle,key, options[key]);
      }
    }
  },
  //->css:此方法实现了获取、单独设置、批量设置元素的样式值
  css:function (curEle) {
    var argTwo = arguments[1];
    if (typeof argTwo === "string"){//->第个参数值是一个字符串,这样的话很有可能就是在获取样式;为什么说是很有可能呢?因为还需要判断是否存在第三个参数,如果第三个参数存在的话,不是获取了,而是在单独的设置样式属性值
      var argThree = arguments[2];
      if (typeof argThree === 'undefined') {//->第三个参数不存在
        return this.getCss(curEle,argTwo);
        // return this.getCss.apply(this, arguments) ;
      }
      //->第三个参数存在则为单独设置
      this.setCss(curEle,argTwo,argThree);
      // this.setCss.apply(this, arguments) ;
    }
    argTwo = argTwo || 0;
    if (argTwo.toString()=== "[object Object]"){
      //->批量设置样式属性值
      this.setGroupCss(curEle,argTwo);
      // this.setGroupCss.apply(this, arguments);
    }
  }
}