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
    //- >如果客户端请求的资源文件不存在,我们不加TRY CATCH服务会终止,这样不好,所以我们添加TRY CATCH捕获异常信息,这样即使不存在,服务也不会报错,同样也不会终止
    //->处理静态资源文件的请求(HTML/CSS/JS...)
    var reg =/\.(HTML|JS|CSS|JSON|TXT|ICO)/i;
    if (reg.test(pathname)) {
        //->获取请求文件的后缀名
        var suffix = reg.exec(pathname)[1].toUpperCase();
        //->根据请求文件的后缀名获取到当前文件的MIME类型
        var suffixMIME = "text/plain";
        switch (suffix) {
            case "HTML" :
                suffixMIME = "text/html";
                break;
            case "CSS" :
                suffixMIME = "text/css";
                break;
            case "JS" :
                suffixMIME = "text/javascript";
                break;
            case "JSON" :
                suffixMIME = "text/json";
                break;
            case "ICO" :
                suffixMIME = "application/octet-stream";
                break;
        }
        try{
            //-> 按照指定的目录读取文件中的内容或者代码(读取出来的内容都是字符串格式的)
            var conFile = fs.readFileSync("." + pathname, "utf-8") ;
            //-> 重写响应头信息:告诉客户端的浏览器我返回的内容是什么样的MIME类型&&指定返回的内容格式是UTF- 8编码的,返回的中文汉字就不会出现乱码了
            res.writeHead (200,{'content-type': suffixMIME+';charset=utf-8;'})
            //->服务端向客户端返回的内容应该也是字符串
            res.end(conFile);
        }catch(e){
            res.writeHead (404,{'content-type': 'text/plain;charset=utf-8;'})
            //->服务端向客户端返回的内容应该也是字符串
            res.end("request file is not find~");
        }
    }
    // try{
    //     var con = fs.readFileSync("./" + pathname, "utf-8") ;
    //     res.end(con);
    // }catch(e){
    //     res.end("request file is not find~");
    // }
    // if (pathname === "/index.html") {
    //     var con = fs.readFileSync("./index.html","utf-8");
    //     res.end(con);
    //     return
    // }
    // if (pathname === "/index.css") {
    //     con = fs.readFileSync("./index.css","utf-8");
    //     res.end(con);
    //     return
    // }
    // if (pathname === "/index.js") {
    //     con = fs.readFileSync("./index.js","utf-8");
    //     res.end(con);
    //     return
    // }
});
// 为当前的这个服务配置端口
server.listen(80,function () {
    //->当服务创建成功,并且端口号也监听成功之后执行这P个回调函数
    console.log("666 is create success, listening on 80 port!");
})