function fn() {
    console.log('我是b模块的方法');
}
var a = require('./a')
a.fn()