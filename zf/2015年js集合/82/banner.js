(function(){
    var banner = document.getElementById("banner"),bannerInner=utils.firstChild(banner),bannerTip = utils.children(banner,'ul')[0];
    var imgList = bannerInner.getElementsByTagName('img'),
    oLis = bannerTip.getElementsByTagName('li')
    var bannerLeft=utils.children(banner, "a")[0],bannerRight=utils.children(banner, "a")[1]
    //1、Ajax请求数据
    var jsonData = null,count=null;
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "./82/banner.json?_ =" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                jsonData = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null) ;
    }();
    // console.log(jsonData);
    // 按照字符串拼接的方式绑定数据 
    ~function () {
        var str = '';
        if (jsonData) {
            for (var i = 0,len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" + trueImg="' + curData["img"] + '"/></div>' ;
            }
            //->为了实现无缝滚动我们需要把第一张图片克隆一份一模一样的放在末尾
            str += '<div><img src="" + trueImg="' + jsonData[0]["img"] + '"/></div>' ;
        }
        bannerInner.innerHTML = str;
        count = jsonData.length+1
        utils.css(bannerInner,"width", count*1000);
        //2)绑定的是焦点区域的数据
        str='';
        if (jsonData) {
            for (i = 0,len = jsonData.length; i < len; i++) {
                i===0?str += '<li class="bg"></li>':str += '<li></li>' ;  
            }
        }
        bannerTip.innerHTML = str
    }();
    //3、实现图片的延迟加载
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function(i){
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg") ;
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    oImg = null
                    zhufengAnimate(curImg,{opacity: 1}, 500);
                }
            }(i)
        }
    }
    window.setTimeout(lazyImg,1000)
    //4、实现自动轮播 图一
    var step = 0;//->记录的是步长(当前是哪一张图片,零是第一张图片)
    var interval = 1000
    var autoTimer = window.setInterval(autoMove, interval) ;
    function autoMove() {
        if(step >= (count-1)){
            step = 0
            utils.css(bannerInner,"left",0)
            // window.clearInterval(auto Timer)
        }
        step++;
        zhufengAnimate(bannerInner,{left: -step*1000}, 500);
        changeTip()
    }
    //第一张 step=0 2000 step=1 运动到-1000
    //第二张 step-1 2000 step=2 运动到-2000

    //5、实现焦点对齐
    function changeTip(){
        var tempStep = step >= oLis.length ? 0 : step;
        for (var i = 0,len = oLis.length; i < len; i++) {
            var curLi = oLis[i] ;
            i === tempStep ? utils.addClass(curLi, "bg") : utils.removeClass (curLi, "bg") ;
        }
    }
    //->6. 停止和开启自动轮播
    banner.onmouseover = function (){
        window.clearInterval(autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    }
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
        bannerLeft.style.display = bannerRight.style.display = "none";
    }
    //->7、单击焦点实现轮播图的切换
    ~function(){
        for (var i = 0,len = oLis.length; i < len; i++) {
            var curLi = oLis[i] ;
            curLi.index=i;
            curLi.onclick = function () {
                console.log(this.index);
                step = this.index;
                changeTip();
                zhufengAnimate(bannerInner,{left: -step*1000}, 500);
            }
        }
    }()
    //8、实现左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0) {
            step=count-1;
            utils.css(bannerInner, "left", -step * 1000);
        }
        step--;
        zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
        changeTip();
    }
})()