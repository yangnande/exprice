var http = require("http"),
fs = require("fs"),
url = require("url"); 
// 创建一个服务
var server = http.createServer(function(req,res){
    // res.write('珠峰培训')
    // res.end()
    //->解析客户端请求地址中的文件目录名称以及传递给当前服务器的数据内容
    var urlObj = url.parse (req.url,true)
    pathname = urlObj.pathname,
    query = urlObj.query;
    console.log(pathname);
    if (pathname === "/index.html") {
        var con = fs.readFileSync("./index.html","utf-8");
        res.end(con);
        return
    }
    if (pathname === "/index.css") {
        con = fs.readFileSync("./index.css","utf-8");
        res.end(con);
        return
    }
    if (pathname === "/index.js") {
        con = fs.readFileSync("./index.js","utf-8");
        res.end(con);
        return
    }
});
server.listen(80,function () {
    //->当服务创建成功,并且端口号也监听成功之后执行这P个回调函数
    console.log("666 is create success, listening on 80 port!");
})