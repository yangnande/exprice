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
// 日期格式化
// 正则表达式是字符串匹配的利器（难是因为规则太多）
// y+ 1个或多个y
// y* 0个或多个y
// y? 0个或1个y
export function formatDate (date,fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'')).substr(4 - RegExp.$1.length)
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00'+str).substr(str.length)
}
