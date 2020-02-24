// 防抖动：对于执行频繁率高的，可以使用它来减少使用频率 fun:要执行的函数 delay多久执行函数
export function debounce (fun,delay) {
  let timer = null
  return function () {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function(...arg) {
      fun.apply(this,arg)
    },delay)
  }
}
