var utils = {
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
    console.log("getComputedStyle" in window);
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
    console.log(window.getComputedStyle(curEle,null)[attr]);
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/;
    return reg.test(val) ? parseFloat (val) :val;
    // return val;
    // return parseFloat(val);//->这样写肯定不行,对于某些样式属相的值是不能去单位的,例如:float、position.margin、padding、border这些复合值、background ..
  }
}