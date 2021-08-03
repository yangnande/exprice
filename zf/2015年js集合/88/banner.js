var banner = document.getElementById("banner"),
bannerInner=utils.firstChild(banner),
bannerTip = utils.children(banner,'ul')[0],
bannerLink=utils.children(banner, "a")
bannerLeft=bannerLink[0],
bannerRight=bannerLink[1];
var divList = bannerInner.getElementsByTagName("div"),
    imgList = bannerInner.getElementsByTagName('img'),
    oLis = bannerTip.getElementsByTagName('li');

//1、Ajax请求数据
var jsonData = null;
~function () {
    var xhr = new XMLHttpRequest;
    xhr.open("get", "./82/banner.json?_ =" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
            jsonData = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
}();
// 2数据绑定
~function () {
    var str = '',str2='';
    if (jsonData) {
        for (var i = 0,len = jsonData.length; i < len; i++) {
            var curData = jsonData[i];
            str += '<div><img src="" + trueImg="' + curData["img"] + '"/></div>' ;
            //2)绑定的是焦点区域的数据
            i===0?str2 += '<li class="bg"></li>':str2 += '<li></li>' ;  
        }
    }
    bannerInner.innerHTML = str;
    bannerTip.innerHTML = str2
}();
 //3、实现图片的延迟加载
 window.setTimeout(lazyImg,1000)
 function lazyImg() {
    for (var i = 0, len = imgList.length; i < len; i++) {
        ~function(i){
            var curImg = imgList[i];
            var oImg = new Image;
            oImg.src = curImg.getAttribute("trueImg") ;
            oImg.onload = function () {
                curImg.src = this.src;
                curImg.style.display = "block";
                // 只对第一张做处理:z-index=1 opacity=1
                if(i===0){
                    var curDiv = curImg.parentNode
                    curDiv.style.zIndex = 1
                    zhufengAnimate(curDiv,{opacity: 1}, 500);
                }
                oImg = null
            }
        }(i)
    }
}
//4、实现自动轮播
var interval = 3000,autoTimer = null,step=0;//记录当前展示图片的索引
    autoTimer = window.setInterval(autoMove, interval) ;
function autoMove() {
    //->当我们已经把最后一张展示完成后(step等于最后一张的索引)，我们应该从新的展示第一张了,我们让step=-1,这样在经过一次累加, step=0,就可以展示第一张了
    if( step ===(jsonData.length - 1)){
        step = -1;
    }
    step++;
    setBanner()
}
//->实现轮播图切换效果的代码
// 让step索引对应的那个DIV的zIndex=1 ,让其余的DIV的zIndex=0
// 让当前的透明度从零变为一,当动画结束,我们需要让其他的DIV的透明度的值直接的变为零
// 实现焦点对齐
function setBanner() {
    for (var i = 0,len = divList.length; i < len; i++){
        var curDiv = divList[i];
        if (i === step) {
            utils.css(curDiv,"zIndex",1);
            zhufengAnimate(curDiv,{ opacity: 1},200,function () {
                var curDivsib = utils.siblings(this) ;
                for (var k= 0,len=curDivsib.length; k<len; k++){
                    utils.css(curDivsib[k],"opacity",0) ;
                }
            })
            continue;
        }
        utils.css(curDiv,"zIndex",0);
    }
    //->实现焦点对齐
    for (i = 0,len = oLis.length; i < len; i++) {
        var curLi = oLis[i];
        i === step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi,"bg");
    }
}
// 实现鼠标悬停停止
banner.onmouseover = function (){
    window.clearInterval(autoTimer);
    bannerLeft.style.display = bannerRight.style.display = "block";
}
banner.onmouseout = function () {
    autoTimer = window.setInterval(autoMove, interval);
    bannerLeft.style.display = bannerRight.style.display = "none";
}
// 控制焦点切换

// 实现左右切换
bannerRight.onclick = autoMove;
bannerLeft.onclick = function () {
    if (step <= 0) {
        step=jsonData.length;
    }
    step--;
    autoMove()
}