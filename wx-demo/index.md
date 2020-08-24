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
14小程序中以4开头的状态码，不会走fail，而走success
15组件内属性赋值，页面渲染
父组件获取到数据-通过属性赋值  
子组件property里的数据，可以接收父组件属性传过来的值，然后渲染页面
16setData，小程序修改数据或新增数据的方法（页面内的data和组件内的data和property,可直接在页面中渲染）
17父元素设置display:flex，设置水平居中，如果文字长短不定，可以通过设置max-width:来解决水平不居中的问题。 
18自定义事件使用场景，多个场景使用一个组件，组件内的事件要使用自定义事件。
19data和property的奇怪现象
data：不能定义val的类型 打印出来是对于类型的函数 property：能定义val的类型 小程序有相应的处理 打印出来的是默认val
data和property不能定义相同类型的val property会覆盖data的val （小程序内部的处理）
20observer监听 不能方法内部修改自身属性val 否则会造成内存泄露
21 多个behavior和component里都有property的变量 component优先级高；
多个behavior都有property的变量 最后一个behavior优先级高；
多个behavior和component里都有生命周期方法 每个都会调用生命周期方法
23 移动端触屏按键的区域尽可能大比实际图大一些，提高用户体验感
24 flex必要时，设置宽度为100%
25 组件内公共的部分，可以通过behavior来实现
26 hidden="{{true}}"和wx:if的区别
wx:if是dom的挂载和卸载
hidden="{{true}}是dom的显示和隐藏（只能应用在标签的属性上，不能用在自定义组件上）
27 增加用户体验，频繁调用接口时，可以使用缓存
28 一个小程序跳到另一个小程序  
两个小程序必须同时关联同一个公众号（服务号订阅号），账号后台设置进行关联设置。