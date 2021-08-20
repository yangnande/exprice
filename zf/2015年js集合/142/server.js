var http = require ("http") ,
    url = require("url"), 
    fs = require("fs") ;
var server1 = http.createServer(function (req,res) {
  var urlObj = url.parse (req.url,true) ,
  pathname = urlObj.pathname,
  query = urlObj.query;//(I>存储的是客户端请求的URT.地址中问号传参后面的信息(并且是以对象的键值对方式存储的)
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
   //->API数据接口的处理
   var con = null,
   result = null,
   customId = null,
   customPath = "./custom.json";
  //  首先我们把"./custom.json"文件中的内容都获取到
   con = fs.readFileSync(customPath, "utf-8");
  con.length === 0 ? con = '[]' : null; //->为了防止我们custom.json中什么都没有,con是一个空字符串,我们会使用JSON .parse转换的时候会报错,我们让其等于'[]'
  con = JSON.parse(con);
   //1)获取所有的客户信息
   if (pathname === "/getList"){
    //->开始按照API文档中的规范准备给客户端返回的数据
    result = {
      code: 1,
      msg:"没有任何的客户信息",
      data: null
    }
    if (con.length > 0){
      result = {
        code: 0,
        msg:"成功",
        data: con
      }
    }
    res.writeHead(200,{'content-type' : 'application/json;charset=utf-8;'});
    res.end(JSON.stringify(result))
    return
    // result.code = con.length === 0 ? 1 : 0;
    // result.msg = con.length === 0 ? "没有任何的客户信息":"成功";
    // result.data = con;
   }
   //2)根据传递进来的客户ID获取某一个具体的客户信息
    if (pathname === "/getInfo" ) {
      //->把客户端传递进来的ID获取到
      customId = query["id"];
      result = {
        code: 1,
        msg:"客户不存在",
        data: null
      }
      for (var i =0; i <con.length; i++){
        if(con[i]["id"] == customId){
          result = {
            code: 0,
            msg:"成功",
            data: con[i]
          }
        }
      }
      res.writeHead(200,{'content-type' : 'application/json;charset=utf-8;'});
      res.end(JSON.stringify(result))
      return
    }
    //3)根据传递进来的客户id删除这个客户
    if(pathname === "/removeInfo"){
      customId = query["id"];
      var flag = false
      for (var i =0; i <con.length; i++){
        if(con[i]["id"] == customId){
          con.splice(i,1)
          flag = true
          break
        }
      }
      result = {
        code: 1,
        msg:"删除失败"
      }
      if(flag){
        fs.writeFileSync(customPath,JSON.stringify(con),'utf-8')
        result = {
          code: 0,
          msg:"删除成功"
        }
      }
      res.writeHead(200,{'content-type' : 'application/json;charset=utf-8;'});
      res.end(JSON.stringify(result))
      return
    }
    //4)增加客户信息
    if(pathname === "/addInfo"){
      //->获取客户端通过请求主体传递进来的内容
      var str = '';
      req.on("data", function (chunk) {
        str += chunk;
      })
      req.on("end" ,function (){
        // str='{"name": "", "age" : "", "phone" : "", "address" : ""}';
        if(str.length === 0){
          res.writeHead (200,{'content-type': 'application/json;charset=utf-8;'});
          rea.end(JSON.stringify({
            code: 1,
            msg: "增加失败,没有传递任何需要增加的信息"})); 
          return;
        }
        var data=JSON.parse(str);
        //->在现有的DATA中追加一个TD:获取coN中最后一项的ID,新的ID是在原有基础上加一即可,如果之前一项都没有,我们这一项的ID就是1
        data["id"] = con.length == 0 ? 1 : parseFloat(con[con.length - 1]["id"]) +1;
        con.push(data)
        fs.writeFileSync(customPath,JSON.stringify(con),'utf-8')
        res.end(JSON.stringify({
          code: 0,
          msg: '增加成功!'
        }))
      })
      return
  }
  //4)修改客户信息
  if(pathname === "/updateInfo"){
    //->获取客户端通过请求主体传递进来的内容
    var str = '';
    req.on("data", function (chunk) {
      str += chunk;
    })
    req.on("end" ,function (){
      // str='{"name": "", "age" : "", "phone" : "", "address" : ""}';
      if(str.length === 0){
        res.writeHead (200,{'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify({
          code: 1,
          msg: "修改失败,没有传递任何需要修改的信息"})); 
        return;
      }
      var flag = false
      var data=JSON.parse(str);
      for(var i = 0;i<con.length;i++){
        if(con[i]['id'] == data['id']){
          con[i] = data
          flag = true
          break
        }
      }
      // result.msg ="修改失败,需要修改的客户不存在";
      if(flag){
        fs.writeFileSync(customPath,JSON.stringify(con),'utf-8')
        result = {
          code: 0,
          msg: "修改成功"
        }
      }
      res.writeHead(200,{'content-type' : 'application/json;charset=utf-8;'});
      res.end(JSON.stringify(result))
      // var data=JSON.parse(str);
      // //->在现有的DATA中追加一个TD:获取coN中最后一项的ID,新的ID是在原有基础上加一即可,如果之前一项都没有,我们这一项的ID就是1
      // data["id"] = con.length == 0 ? 1 : parseFloat(con[con.length - 1]["id"]) +1;
      // con.push(data)
      // fs.writeFileSync(customPath,JSON.stringify(con),'utf-8')
      // res.end(JSON.stringify({
      //   code: 0,
      //   msg: '增加成功!'
      // }))
    })
    return 
  }
  // 如果请求的地址不是上述任何一个，则提示不存在即可
  res.writeHead (404, {'content-type' : 'text/plain;charset=utf-8;'});
  res.end("请求的数据接口不存在!");
})
server1.listen(81,function (){
  console.log("server is success,listening on 81 port!");
});