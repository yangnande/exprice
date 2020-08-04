1 组件的引用和使用
在引用组件的地方 json引用 
引用:"usingComponents": {
  "v-like": "/components/like/index"
}
使用:在wxml中，直接使用 v-like
2 绝对路径和相对路径
绝对路径：从根目录开始 /
相对路径：相对于某个路径 ../
display:flex 可以是自己的子元素失去块级元素属性，但是父元素本身不会
3 对于小程序最好用的就是flex和rpx
rpx:自适应的单位
px: 在任何尺寸，大小都一样
绝大多数都使用rpx,但是像字体之类的希望在任何尺寸都一样就要使用px
4 解决字体的空隙
font-size: 24rpx;
line-height: 24rpx;
5 苹果的细字体
font-family: "PingFangSC-Thin"
6组件样式
继承样式，如 font 、 color ，会从组件外继承到组件内。
7固定宽度还是自适应，看项目而定
自适应，宽度发生变化，会产生闪动
固定宽度，作为组件，应用受限
8请求接口报错
小程序是不允许访问任何url
发布和上线阶段：在小程序后台账号中添加要访问的域名
开发阶段，可以进行项目设置
9wx.request
函数本身是异步的，小程序的request只有异步没有同步，在success回调函数中获取data
10wx.request success回调函数里的this指向null
两种方式改：
外层定义that=this
或者把回调函数function改成箭头函数
11promise的好处（两个）
解决异步回调地狱的问题
12json中引入组件可以使用绝对路径，import不能使用绝对路径
解决：使用相对路径
13组件的两个特点 复用性和分离性（这个很重要，分离性可以让组件更灵活）
13小程序中以4开头的状态码，不会走fail，而走success
