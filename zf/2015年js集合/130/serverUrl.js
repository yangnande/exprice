var url = require("url");
var str = "http://192.168.0.32:80/index.htm1?name=zhufeng&age= =7";
// console.log(url.parse(str));
// Url {
//     protocol: 'http:', // 传输协议
//     slashes: true,
//     auth: null,
//     host: '192.168.0.32:80',// 域名+端口
//     port: '80',//端口号
//     hostname: '192.168.0.32', // 域名(IP)
//     hash: null,//哈希值
//     search: '?name=zhufeng&age=%20=7',//问号+传递进来的数据
//     query: 'name=zhufeng&age=%20=7',//传递进来的数据,没有问号
//     pathname: '/index.htm1',// 请求文件的路径及名称
//     path: '/index.htm1?name=zhufeng&age=%20=7',// 路径名称+传递的数据
//     href: 'http://192.168.0.32:80/index.htm1?name=zhufeng&age=%20=7'
// }
console.log(url.parse(str, true)); //->增加true后, query中存储的是经过处理解析后的结果:把传递进来的多组数据以键值对方式进行存储
// Url {
//     protocol: 'http:',
//     slashes: true,
//     auth: null,
//     host: '192.168.0.32:80',
//     port: '80',
//     hostname: '192.168.0.32',
//     hash: null,
//     search: '?name=zhufeng&age=%20=7',
//     query: {
//         name: 'zhufeng',
//         age: ' =7'
//     },
//     pathname: '/index.htm1',
//     path: '/index.htm1?name=zhufeng&age=%20=7',
//     href: 'http://192.168.0.32:80/index.htm1?name=zhufeng&age=%20=7'
// }