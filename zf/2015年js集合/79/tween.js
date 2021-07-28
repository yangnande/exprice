~function() {
    var zhufengEffect = {
        Linear:function (t, b, c, d){
            // (time / duration) * change + begin
            return c * t / d + b;
        }
    }
    //->move: 实现多方向的运动动画curEle- >当前要操作运动的元素target-> 当前动画的目标位置,存储的是每一个方向的目标位置(left:xxx, top:xxx,...1 duration-> 当前动画的总时间
    //->effect支持以下的情况
    // 1) 如果传递进来的是一个数字:0->Linear 1->Circ.easeInout 2->Elastic. easeOut 3->Back.easeOut 4->Bounce.easeOut 5->Expo.easeIn
    //2)如果传递进来的是一个数组: move(curFle,target, duration, ["Elastic","easeout" ])->zhufengEffect.Elastic.easeOut
    //3)如果不传递的话,默认就使用zhufengEffect.Linear匀速效果
    //["Linear", "Circ-easeInOut"，"Elastic-easeOut "，"Back-easeOut","BOunce-easeOut",“Expo-easeIn"]
    function move (curEle,target, duration,effect,callback) {
        //->处理我们需要的动画效果
        var tempEffect = zhufengEffect.Linear;
        if(typeof effect === 'number') {
            switch(effect) {
                case 0:
                    tempEffect = zhufengEffect.Linear;
                    break ; 
                case 1:
                    tempEffect = zhufengEffect.Circ.easeInOut;
                    break ;
                case 2:
                    tempEffect = zhufengEffect.Elastic.easeOut;
                    break ; 
                case 3:
                    tempEffect = zhufengEffect.Back.easeOut;
                    break ;
                case 4:
                    tempEffect = zhufengEffect.Bounce.easeOut;
                    break ;
                case 5:
                    tempEffect = zhufengEffect.Expo.easeIn; 
            }
        }else if(effect instanceof Array) {
            tempEffect=effect.length>=2?zhufengEffect[effcct[0]][effcct[1]]:zhufengEffect[effcct[0]];
        }else if(typeof effect === 'function') {
            //->我们的实际意义应该是:effect是不传递值的,传递进来的函数应该是回调函数的值,tempEffect还是默认的匀速公式即可
            callBack = effect;
        }
        //->在每 -次执行方法之前,首先把当前元素之前正在运行的动画结束掉
        window.clearInterval (curEle. zhufengTimer) ;
        //->根据target获取每一一个方向的起 始值begin和总距离change
        var begin = {}, change = {};
        for (var key in target) {
            //->key:方向,例如: top/left...
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle,key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.zhufengTimer=window.setInterval(function() {
            time += 10;
            //->到达目标:结束动画,让当前元素的样式等于目标样式值
            if (time >= duration) {
                utils.css(curEle,target) ;
                window.clearInterval(curEle.zhufengTimer);
                //-> 在动画结束的时候,如果用户把回调函数传递给我了,我就把用户传递进来的那个函数执行,不仅执行还让回调函数中的this变为当前要操作的元素
                callback&&callback.call(curEle)
                return ;
            }
            //->没到达目标:分别的获取每- - 个方向的当前位置,给当前元素设置样式即可
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = tempEffect(time,begin[key],change[key],duration);
                    utils.css(curEle,key,curPos);
                }
            }
        },10) ;
    }
    window.zhufengAnimate = move;
}()