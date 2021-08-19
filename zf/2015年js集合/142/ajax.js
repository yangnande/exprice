~function(){
    //->createXHR:创建AJAX对象，兼容所有的浏览器
    function createXHR(){
        var xhr = null,
        flag = false,
        ary = [
            function(){
                return new XMLHttpRequest;
            },
            function(){
                return new Activexobject ("Msxml2.XMLHTTP");
            },
            function(){
                return new Activexobject ("Msxml2.XMLHTTP");
            },
            function(){
                return new Activexobject ("Msxml3.XMLHTTP");
            },
        ]
        for(var i=0,len=ary.length;i<len;i++){
            var curFn = ary[i];
            try {
                xhr = curFn()
                //->本次循环获取的方法执行没有出现错误:说明此方法是我想要的,我们下一次直接执行这个小方法即可,这就需要我们把createXHR重写为小方法(完成后不需要在判断下面的了,直接退出循环即可)
                createXHR = curFn
                flag = true
                break
            }catch(e){
                //->本次循环获取的方法执行出现错误:继续执行下一次的循环
            }
        }
        if(!flag) {
            throw new Error ( "your browser is not support ajax,please change your browser,try again!");1
        }
        return xhr
    }
    //->ajax :实现AJAX请求的公共方法;当一个方法传递的参数值过多，而且还不固定,我们使用对象统一传值法(把需要传递的参数值都先放在一个对象中，一起传递进去即可)
    function ajax (options) {
        //->把斋要使用的参数值设定一个规则和初始值
        var _default = {
            url:"", //->请求的地址
            type: "get", //->请求的方式
            dataType: "json", //->设置请求回来的内容格式"json":就是JSON格式的对象"txt":就是字行串或者是JSON格式的字符串
            async: true, // 请求是同步还是异步
            data: null, //->放在请求主体中的内容(POST)
            getHead: null,//->当READY STATE===2的时候执行的回调方法
            success: null//->当READY STATE===4的时候执行的回调方法
        }
        //-> 使用用户自己传递进来的值覆盖我们的默认值
        for (var key in options) {
            if (options.hasOwnProperty(key)){
                _default[key] = options[key];
            }
        }
        console.log(_default.url);
        //->如果当前的请求方式是GET,我们需要在URL的末尾加随机数清除缓存
        if (_default.type === "get") {
            _default.url.indexOf("?")>= 0 ? _default.url += "&" : _default.url +="?";
            _default.url += "_-"+ Math.random();
        }
        // send ajax
        var xhr = createXHR();
        xhr.open(_default.type,_default.url,true) ;
        xhr.onreadystatechange = function () {
            if (/^2\d{2}$/.test(xhr.status)){
                //->想要在READYSTATE等于2的做一些操作,需要保证AJAX是异步请弱
                if(xhr.readyState === 2){
                    if(typeof _default.getHead === 'function'){
                        _default.getHead.call(xhr)
                    }
                }
                if(xhr.readyState === 4){
                    var val = xhr.responseText;
                    //->如果传递参数值是json，说明获取的应该是JsoN格式的对象
                    if (_default.dataType === "json" ) {
                        val = "JSON" in window ? JSON.parse (val) : eval ("("+val+")");
                    }
                    _default.success &&_default.success.call (xhr,val) ;
                }
            }
        }
        xhr.send(_default.data)
    }
    window.ajax = ajax
    console.log();
}()
