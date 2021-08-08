~function(jQuery){
    // 扩展jQuery插件
    jQuery.fn.extend({
        banner:zhufengBanner
    })
    //->通过jQuery选择器或者筛选的方法获取到的jQuery集合是不存在EDOM的映射机制珠塔训到的集合，之后在页面中HTML结构改变了,集合中的内容不会跟着自动发生变化(JS获取的元素集合有DOM映射的机制)
    function zhufengBanner(ajaxUrl,interval){
        // var $banner = $("#"+selector);
        console.log( $(this));
        var $banner = $(this);
        var $bannerInner = $banner.children(".bannerInner")
        var $bannerTip = $banner.children(".bannerTip")
        var $bannerLeft = $banner.children(".bannerLeft"),$bannerRight =$banner.children(".bannerRight");
        var $divList = null,$imgList=null,$oLis=null;
        //1、Ajax读取数据
        var jsonData = null;
        $.ajax({
            // url: "./82/banner.json?_ =" + Math.random(),
            url: ajaxUrl+"?=" + Math.random(),
            type:"get",
            dataType: "json",
            async: false, // 当前请求是同步的
            success:function(data){
                jsonData = data
            }
        })
        // console.log(jsonData);
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
            $oLis=$bannerTip.children("li");
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
        //->封装一个轮播图切换的效果
        function changeBanner ( ) {
            var $curDiv = $divList.eq(step) ;
            $curDiv.css ("zIndex",1).siblings().css("zIndex", 0);
            $curDiv.animate({opacity: 1}, 300, function () {
                $(this).siblings().css("opacity", 0);
            })
            var $curLi = $oLis.eq(step);
            $curLi.addClass("bg").siblings().removeClass("bg");
        }
        //4、实现自动轮播
        interval = interval || 3000
        var step = 0,autoTimer = null;
        autoTimer = window.setInterval(autoMove, interval);
        function autoMove () {
            if(step === (jsonData.length - 1)){
                step = -1
            }
            step++;
            changeBanner()
        }
        //5.控制左右按钮的显示隐藏和自动轮播的开始和暂停
        $banner.on("mouseover", function () {
            window.clearInterval(autoTimer) ;
            $bannerLeft.css("display", "block") ;
            $bannerRight.css("display", "block") ;
        }).on("mouseout", function () {
            autoTimer = window.setInterval(autoMove, interval);
            $bannerLeft.css("display", "none") ;
            $bannerRight.css("display", "none") ;
        })
        //6、实现焦点切换
        $oLis.on("click", function () {
            step = $(this).index() ;
            changeBanner()
        })
        //7、实现左右切换
        $bannerRight.on ("click", autoMove) ;
        $bannerLeft.on("click",function () {
            if (step === 0) {
                step = jsonData.length; 
            }
            step--;
            changeBanner ();
        })
    }
}(jQuery)   