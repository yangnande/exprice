//->导入我们三个常用的NODE内置模块
var http = require("http"),
fs = require("fs"),
url = require("url"); //->URL模块中提供了一个方法url.parse()用来解析URL地址的
//1、 HTTP
//->http.createserver:创建一个服务,变量server就是我们创建出来的那个服务
//->server.listen:为这个服务器监听一个端口80
var server = http.createServer(function(request,response){
    //->当客户端向服务器端的当前服务(端口号是80这个服务)发送一个请求, 并且当前服务已经成功接收到这个请求后执行这个回调函数
    //->request (请求) :存放的是所有客户端的请求信息,包含客户端通过问号传参的方式传递给服务器的数据内容
    //->request.url:存放的是客户端请求的文件资源的目录和名称以及传递给服务器的数据,例如:客户端请求的地址:http://192.168.0.32/index.html?name= zhufeng&age=7我们服务端通过request.url获取到的是:/index.html?name=zhufeng&age=7
    // http://192.168.10.7:100/ request.url=/
    console.log(request.url);
    var urlObj = url.parse (request.url,true)
    pathname = urlObj.pathname,
    query = urlObj.query;
    console.log(pathname);
    if (pathname === "/1.html") {
        //->根据请求的URL地址(具体的是根据地址中的pathname)获取到对应资源文件中的源代码
        //->fs.readFileSync([path+name], [encode]) :同步读取指定文件中的内容(同步读取:文件中的内容读取不完不执行下面的操作,只有都读取出来才会执行后续的操作)
        var con = fs.readFileSync("./1.html","utf-8") ;
        //->response(响应):提供了向客户端返回内容和数据的方法
        //->response.write:向客户端返回内容
        //->response.end:告诉服务器响应结束了(一定要加)
        response.write(con);
        response.end();
    }
    //->response(响应):提供了向客户端返回内容和数据的方法
    //->response. write:向客户端返回内容
    //->response . end:告诉服务器响应结束了(一定要加)
    response. write (con) ;
    // console.log("哈哈哈被耍了");
});
server.listen(100,function () {
    //->当服务创建成功,并且端口号也监听成功之后执行这P个回调函数
    console.log("666 is create success, listening on 100 port!");
})