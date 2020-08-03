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