var banner = document.getElementById("banner"),bannerInner=utils.firstChild(banner),
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
    xhr.send(null) ;
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
// function autoMove() {
//     if(step >= (count-1)){
//         step = 0
//         utils.css(bannerInner,"left",0)
//         // window.clearInterval(auto Timer)
//     }
//     step++;
//     zhufengAnimate(bannerInner,{left: -step*1000}, 500);
//     changeTip()
// }
// //第一张 step=0 2000 step=1 运动到-1000
// //第二张 step-1 2000 step=2 运动到-2000