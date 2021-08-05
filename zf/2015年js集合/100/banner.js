//->通过jQuery选择器或者筛选的方法获取到的jQuery集合是不存在EDOM的映射机制珠塔训到的集合，之后在页面中HTML结构改变了,集合中的内容不会跟着自动发生变化(JS获取的元素集合有DOM映射的机制)
$(function(){
    var $banner = $("#bannerFir");
    var $bannerInner = $banner.children(".bannerInner")
    var $bannerTip = $banner.children(".bannerTip")
    var $bannerLeft = $banner.children(".bannerLeft"),$bannerRight =$banner.children(".bannerRight");
    var $divList = null,$imgList=null,$oLis=null;
    //1、Ajax读取数据
    var jsonData = null;
    $.ajax({
        url: "./82/banner.json?_ =" + Math.random(),
        type:"get",
        dataType: "json",
        async: false, // 当前请求是同步的
        success:function(data){
            jsonData = data
        }
    })
    console.log(jsonData);
    //->实现数据绑定
    bindData()
    function bindData() {
        var str = '',str2='';
        if (jsonData) {
            for (var i = 0,len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" + trueImg="' + curData["img"] + '"/></div>' ;
                //2)绑定的是焦点区域的数据
                i===0?str2 += '<li class="bg"></li>':str2 += '<li></li>' ;  
            }
        }
        $bannerInner.html(str)
        $bannerTip.html(str2)
        //->绑定完成数据后获取我们需要的集合
        $divList = $bannerInner.children("div")
        $imgList= $bannerInner.find("img")
        $oLis=$bannerInner.children("li");
    }
    // ->3延迟加载
    window.setTimeout(lazyImg,500)
    function lazyImg (){
        let _this = this
        $imgList.each(function(index,item){
            var _this = this
            var oImg = new Image;
            oImg.src = $(item).attr("trueImg");//$(this)===$(item)
            oImg.onload = function () {
                // this ->oImg
                $(_this).prop("src",this.src).css('display','block')
            }
            // $diIyList.eq(0).css("zIndex",1).fadeIn(300);
            $divList.eq(0).css("zIndex",1).animate({
                opacity: 1
            },300)
        })
      }
})