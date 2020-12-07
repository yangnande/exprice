1、export default 向外暴露的成员，可以使用任意变量来接收
2、在一个模块中，export default 只允许向外暴露一次
3、在一个模块中，可以同时使用export default 和export 向外暴露成员
4、使用export向外暴露的成员，只能使用{ }的形式来接收，这种形式，叫做【按需导出】
5、export可以向外暴露多个成员，同时，如果某些成员，在import导入时，不需要，可以不在{ }中定义
6、使用export导出的成员，必须严格按照导出时候的名称，来使用{ }按需接收
7、使用export导出的成员，如果想换个变量名称接收，可以使用as来起别名
```js
// test.js
export default {
    name: 'zs',
    age: 20
}
// 或是复制代码
// test.js
var info = {
    name: 'zs',
    age: 20
}
export default info

// 复制代码在main.js中接收，test.js使用export default 向外暴露的成员
import person from './test.js'
console.log(person);

// test.js
var info = {
    name: 'zs',
    age: 20
}
export default info
export var title = '小星星'
export var content = '哈哈哈'

// 在main.js中接收，test.js使用export default 和 export 向外暴露的成员
import person, {title, content as content1} from './test.js'
console.log(person);
console.log(title + '=======' + content1);

```