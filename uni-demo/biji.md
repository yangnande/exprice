1 安装并运行HbuiderX(有提示)
2 vue-cli方式运行项目
3 生命周期
应用生命周期 只能在app.vue执行
应用初始化完成，全局只触发一次
onLaunch() {} 登录，全局变量
应用启动，或者从后台进入前台会触发
onShow() {} 
应用从前台进入后台
onHide() {}

页面生命周期 index.vue
监听页面加载
onLoad() {}
监听页面的初次渲染完成
onReady() {
  // 如果渲染速度快，会在页面进入动画完成前触发
}
监听页面显示
onShow() {}
监听页面隐藏 
onHide() {}
监听页面卸载
onUnload() {}
uni.redirectTo({url:''}) 关闭当前页面,打开新页面
组件生命周期
实例初始化之后，数据观测(data observer)和(event/watcher)事件配置之前调用
beforeCreate() {}
实例创建完成之后立即开始，挂载还没开始
create() {}
挂载到实例上去之后调用
mounted() {}
Vue实例销毁之后调用
destoryed() {}