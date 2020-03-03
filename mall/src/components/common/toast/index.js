import Toast from './toast'

var obj = {}

obj.install = function(Vue) {
  // 创建组件构造器
  var constructor1 = Vue.extend(Toast)
  // 用new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new constructor1()
  // 将组件对象挂载在一个div元素上
  toast.$mount(document.createElement('div'))
  //toast.$el 对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj
