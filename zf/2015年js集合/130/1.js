var less = require('less')
var fs = require("fs") ;
less.render(fs.readFileSync("./1.less","utf-8") ,{compress: true} ,
function (error, output) {
    fs.writeFileSync("./1.css", output.css, "utf-8") ;
})
// console.log('珠峰培训');
// function sum() {
//     var total = null;
//     for (var i=0; i < arguments.length; i++) {
//         var cur = Number (arguments[i]) ;
//         if (!isNaN(cur)) {
//             total += cur;
//         }
//     }
//     return total ;
// }
// var total = sum(1, 2,3,4);
// console.log(total);