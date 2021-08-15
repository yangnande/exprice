(function(){
    // 图一
    /** 
     * //->bind:给当前元素的某一个行为绑定方法(this问题和重复问题)
     * bind: 处理DoM2级事件绑定的兼容性问题(绑定方法)
     * * @parameter:
     * curEle->要绑定事件的元素
     * evenType->要绑定的事件类型("click"、"mouseover". . .)
     * evenFn->.要绑定的方法
    */
    function bind(curEle, evenType, evenFn) {
        if ('addEventListener' in document ) {
            curEle.addEventListener(evenType, evenFn, false) ;
            return
        }
        // 给evenFn化妆并且把化妆前的照片贴在自己对应的脑门上
        var tempFn= function() {
            // this===window
            evenFn.call (curEle) ;
        }
        tempFn.photo = evenFn
        // CurEle["myBind"] = tempFn; //->第一次给自定属性存储的是fn1包装后的结果,第二次让它的值变为fn2包装后的结果,这样的话就把上:一次的给覆盖掉了
        //-> 首先判断该自定义属性之前是否存在,不存在话创建一个, 由于要存储多个方法化妆后的结果,所以我们让其值是一个数组
        if (!curEle["myBind"+evenType]) {
            curEle["myBind"+evenType] = [] ;
        }
        //->解决重复问题: 每一次自己在往自定义属性对应的容器中添加前,看一下之前是否已经有了,有的话就不用在重新的添加了,同理也不需要往事件池中存储了
        var ary = curEle["myBind"+evenType]
        for(var i=0;i<ary.length;i++){
            var cur = ary[i]
            if (cur.photo === evenEn) {
                return 
            }
        }
        ary.push(tempFn) ;
        curEle.attachEvent ("on" + evenType, tempFn) ;
    }
    //oDiv.attachEvent("onclick", fn1.call (oDiv)) ;//->绑定的时候就立即的把fn1执行了,把其返回值赋值undefined给我们的onclick行为
    // oDiv.attachEvent ("onclick", fn1.bind(oDiv)); // bind方法不兼容,我们不考虑
    function unbind (curEle,evenType, evenFn) {
        if ('removeEventListener' in document ) {
            curEle.removeEventListener(evenType, evenFn, false) ;
            return
        }
        //->. 拿evenFn到curEle["myBind"]这里找化妆后的结果,找到之后在事件池中把换装后的结果给移出事件池
        var ary = curEle["myBind"+evenType] ;
        if(ary && ary instanceof Array){
            for(var i=0;i<ary.length;i++){
                var cur = ary[i]
                if (cur.photo === evenEn) {
                    ary.splice(i,1) // 移除自定义属性中存储的,找到后,把自己存储的容器中对应的移除掉
                    curEle.detachEvent ("on" + evenType, cur) ; // 再把事件池中对应的也移除掉
                    break ;
                }
            }
        }
    }
    // 图二
    // bind(oDiv,'click',fn1)
    // bind(oDiv,'mouseover',fn1)
    // bind(oDiv,'click',fn2)
    // bind(oDiv,'click',fn3)
    // unbind(oDiv,'click',fn3)
    /*------------以下操作是解决顺序问题-------------*/
    // 图四
    //->on:把给当前元素某一个行为类型绑定的所有的方法都存放到自己定义的容器中
    function on (curEle, evenType, evenFn) {
        if (!curEle["myEvent"+evenType]) {
            curEle["myEvent"+evenType] = [] ;
        }
        var ary = curEle["myEvent"+evenType]
        for(var i=0;i<ary.length;i++){
            var cur = ary[i]
            if (cur === evenFn) {
                return
            }
        }
        ary.push(evenFn)
        console.dir(curEle,'OM');
        // curEle.addEventListener(evenType,run,false)//->执行on的时候,我们给当前元素绑定了一个点击的行为,当点击的时候执行run方法: run方法中的this是当前元素curEle,并且浏览器给run传递了一个MouseEvent事件对象
        //->. 如果想在点击的时候执行run方法,我们需要把run方法添加到浏览器内置的事件池中
        //-> 每当执行一次on方法,都会重新的给当前元素绑定run方法,但是这里我们是使用了上面写的bind方法实现绑定(bind解决了this和重复的问题) ,所以不需要担心run重复绑定
        bind(curEle, evenType,run)
    }
    // on(oDiv,'click',fn1)
    // on(oDiv,'mouseover',fn1)
    // on(oDiv,'click',fn2)
    //->off:在自己的事件池中把某一个方法移除
    function off (curEle, evenType, evenFn) {
        console.dir(curEle);
        var ary = curEle["myEvent"+evenType]
        console.log(ary);
        for(var i=0;i<ary.length;i++){
            var cur = ary[i]
            if (cur === evenFn) {
                //ary.splice(i, 1); ->为了防止塌陷问题,我们在移除的时候不要把原有数组中每一个方法对应的索引进行改变(数组长度就不能变),所以不能使用sp1ice进行删除
                ary[i] = null;
                break;
            }
        }
    }
    //->run:我们只给当前元素的点击行为绑定一个方法run,当触发点击的时候执行的是run方法,我在run方法中根据自已存储的方法顿序分别的在把这些方法执行 是我们唯一给当前元素的某 个行为在内置事件池中绑定的方法,当行为触发,执行run方法,我们在run中在分别的把存储在自已容器中的所有的方法依次的执行I
    function run(e) {
        // this 当前点击的这个元素
        e= e || window.event; 
        var flag = e.target ? true : false; //->IE6~8下不兼容e. target,得到的flag为false
        if (!flag) {
            e.target = e.srcElement;
            e.pageX = e.clientX + (document.documentElement.scrollLeft||document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop||document.body.scrolllTop);
            e.preventDefault= function() {
                e.returnValue=false;
            }
            e.stopPropagation= function() {
                e.cancelBubble=true;
            }
        }
        //this->.当前点击的这个元素curEle e.target存储的是当前触发的元素curEle
        //->获取自己事件池中绑定的那些方法,并且让这些方法依次的执行
        var ary = this["myEvent" + e.type];
        for(var i = 0;i<ary.length;i++){
            var tempFn = ary[i]
            if(typeof tempFn === 'function'){
                tempFn.call(this,e) //- >因为在内置的事件池中绑定的方法执行的时候, this都是当前要操作的元素,并且浏览器还会给其传递一个事件对象:而我们自已创建的容器中存储的所有的方法其实都相当于是要给当前元素绑定的事件,为了和内置的统一,我们也让其执行的时候this变为当前的元素,并且也给它传递一个事件对象
            }else{
                //->当前这一项是null,我们在把它移除
                ary.splice(i,1)
                i--;
            }
            
            // if(cur === evenFn){
            //     return
            // }
        }
        // ary.push(tempFn)
    }
    window.zhufengEvent ={
        on:on,
        off:off
    }
})()