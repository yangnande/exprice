// import {getLabel} from './list.js'
// export default {
// 	getLabel
// }
// 批量导出
const requireApi = require.context(
	'.', // 目录的相对路径
	false,// 是否查询子目录
	/.js$/ // 查询文件的后缀
)
let module = {}
requireApi.keys().forEach(key=> {
	if(key==='./index.js'||key==='./http.js') return
	console.log(requireApi(key))
	Object.assign(module,requireApi(key))
})

export default module