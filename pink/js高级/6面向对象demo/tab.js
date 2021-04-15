var _this = this
class Tab {
  constructor(id) {
    _this = this
    // 获取元素
    this.main = document.querySelector(id)
    this.add = this.main.querySelector('.tabadd')
    // li的父元素
    this.ul = this.main.querySelector('.firstnav ul:first-child')
    // section的父元素
    this.fsection = this.main.querySelector('.tabscon')
    this.init()
  }
  init() {
    this.updateNode()
    this.add.onclick = this.addTab
    // 初始化操作让相关的元素绑定事件
    for(var i = 0; i<this.lis.length;i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.remove[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.section[i].ondblclick = this.editTab
    } 
  }
  // 获取所有的小li和section 动态的添加元素 需要重新获取对应的元素
  updateNode() {
    this.lis = this.main.querySelectorAll('li')
    this.section = this.main.querySelectorAll('section')
    this.remove = this.main.querySelectorAll('.iconfont')
    this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
  }
  // 清理所有li和section的类
  clearClass() {
    for(var i = 0; i<this.lis.length;i++) {
      this.lis[i].className = ''
      this.section[i].className = ''
    }
  }
  // 1切换tab
  toggleTab() {
    _this.clearClass()
    // 当前tab和内容选中
    this.className = 'liactive'
    _this.section[this.index].className = 'conactive' // this指向的是当前li
  }
  // 2新增tab
  addTab() {
    _this.clearClass()
    var random = Math.random()
    // 1）创建li元素和section元素
    var li = '<li class="liactive"><span>测试1</span><span class="iconfont">x</span></li>'
    var section = '<section class="conactive">测试1'+random+'</section>'
    // 2）把这两个元素添加到对应的父元素里面
    _this.ul.insertAdjacentHTML('beforeend', li)
    _this.fsection.insertAdjacentHTML('beforeend', section)
    _this.init()
  }
  // 3删除tab
  removeTab(e) {
    e.stopPropagation() // 阻止冒泡，防止触发li的切换点击事件
    var index = this.parentNode.index;
    // 根据索引删除对应的li和section remove()方法可以直接删除指定的元素
    _this.lis[index].remove()
    _this.section[index].remove()
    _this.init()
    // 当我们删除的不是选中状态的li的时候，原来的选中状态li保持不变
    if(document.querySelector('.liactive')) return
    // 当我们删除第一个，删除完后让第一个保持选中状态 
    if(index == 0) {
      _this.lis[index]&&_this.lis[index].click()
      return
    }
    // 当我们删除了选种状态的这个li的时候，让他的前一个li处于选中状态
    index--;
    _this.lis[index]&&_this.lis[index].click() // 手动调用我们的点击事件，不需要鼠标触发
  }
  // 4编辑tab
  editTab() {
    // 双击禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    var str = this.innerHTML
    this.innerHTML = '<input type="text" >'
    var input = this.children[0]
    input.value = str
    input.select(); // 文本框里的文字处于选中状态
    // 当我们离开文本框就把文本框的值赋值给span
    input.onblur = function() {
      this.parentNode.innerHTML = this.value
    }
    // 按下回车也可以把值给span
    input.onkeyup = function(e) {
      if(e.keyCode === 13) {
        // 手动调用表单失去焦点事件，不需要鼠标离开操作
        this.blur()
      }
    }
  }
}
var tab = new Tab('#tab')