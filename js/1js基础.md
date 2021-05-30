## js的适用场景
浏览器网页端开发
作为服务端后台语言使用的node.js
移动端手机APP开发，如Facebook的React Native,uniapp,phoneGap,ionic
跨平台的桌面应用程序，如使用electronjs
## 避免页面加载延迟优化
避免页面加载延迟，把script放到body里，不要放在头部
## let const 临时性死区
不允许定义之前调用，必须先声明在使用
## Object.freeze冻结变量
const host = {
    url: 'http://www.baidu.com',
    port: 443
}
// Object.freeze(host) 冻结host，不能让其属性值改变
host.port = 80
console.log(host.port) // 443