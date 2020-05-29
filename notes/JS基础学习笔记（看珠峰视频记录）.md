## 常用的浏览器
  ### webkit内核（V8引擎）
  - 谷歌chrome
  - Safari
  - Opera >=V14
  - 国产浏览器
  - 手机浏览器
···
  ### Gecko
  - 火狐Firefox
  ### Presto
  - Opera <V14
  ### Trident
  - +IE
  - +IE EDGE开始采用双内核（其中包含chrome迷你）
## 谷歌浏览器的控制台（F12/Fn+F12）

- ELements：查看结构样式，可以修改这些内容
- Console：查看输出结果和报错信息，是JS调试的利器
- Sources：查看项目源码
- Network:查看当前网站所有资源请求信息（包括和服务器传输的HTTP报文信息）、加载时间等（根据加载时间进行项目优化）
- Application：查看当前网站的数据存储和资源文件（可以盗图）
## JS做客戶端語言
- 按照相关的JS语法，去操作页面中的元素，有时还要操作浏览器里面的一些功能
    - ECMAScript3/5/6…:JS的语法规范（变量、数据类型、操作语句等）
    - DOM（ document object model）：文档对象模型，提供一些JS的属性方法，用来操作页面中的DOM元素
    - BOM( browser object model)：浏览器对象模型，提供一些JS的属性方法，用来操作浏览器的
## JS中的变量 variable
- 变量：可变的量，在编程语言中，变量就是一个名字，用来储存和代表不同值得东西
```javascript
    //ES3
    var a = 12;
    a = 13；
    console.log(a); //=>输出的是a代表的值12

    //ES6
    let b =100;
    b = 200;

    const c = 1000;
    c = 2000; //=>报错： CONST创建的变量，储存的值不能被修改（可以理解为叫做常量）

    //创建函数也相当于在创建变量
    function fn（）{}
    //创建类也相当于创建变量
    class A{}
    //ES6的模块导入也可以创建变量
    import B from './B.JS';
    //Symbol创建唯一值
    let n=Symbol（100）；
    let m-Symbol（100）； 
```
## JS中的命名规范
- 严格区分大小写
```javascript
let Test=100;
console.log(test);//=>无法输出，因为第一个字母小写了
```
- 使用数字、字母、下划线、$，数字不能作为开头
```javascript
let $box;//=>一般用JQ获取的以$开头
let _box;//=>一般公共变量都是_开头
let 1box;//=>不可以，但是可以写box1
```
- 使用驼峰命名法：首字母小写，其余每个有意义单词的首字母都要大写（命名尽可能语义化明显，使用英文单词）
```javascript
let studentInformation;
let studentInfo;
//常用缩写：add/insert/create/new（新增）、update(修改)、delete/del/remove/rm(删除)、sel/select/query/get(查询)、info（信息）···
```
- 不能使用关键词和保留字
- 当下有特殊含义的是关键字，未来可能会成为关键字的叫保留字（）
```javascript
var let const function···
//=>必须养成良好的写代码习惯，具有极客精神
```
## JS中常用的数据类型
### 基本数据类型
- 数字 number
    - 常规数字和NaN
- 字符串 string
    - 所有用单引号、双引号、反引号（撇）包起来的都是字符串
- 布尔 boolean
    - true/false
- 空对象指针 null
- 未定义 undefined
### 引用数据类型
- 对象数据类型 object
    - {} 普通对象
    - [] 数组对象
    - /1？（\d|([1-9]\d+)）(.\d+)?$/ 正则对象
    - Math数学函数对象
    - 日期对象
    - ···
- 函数数据类型 function
### number数字类型
包含：常规数字＼NaN

- NaN
  not a number:不是一个数字，但它属于数字类型
  NaN和任何值（包括自己）都不相等：NaN!=NaN，所以我们不能用相等的方式判断是否为有效数字

- isNaN
    检测一个值是否为非有效数字，如果不是有效数字返回TRUE，反正是有效数字返回FALSE
    在使用isNaN进行检测时，首先会验证检测的值是否是数字类型，如果不是，先基于Number()这个方法，把值转换为数字类型，然后再检测

#### 把其他类型值转换为数字类型
- Number（[val]）
- ParseInt/parseFloat([val],[进制])：也是转化为数字的方法，对于字符串来说，它是从左到右依次查找有效数字字符，直到遇到非有效数字字符，停止查找（不管后面你是否还有数字都不查找），把找到的数字返回
- ==进行比较的时候，可能要出现要把其他类型值转换为数字
## string字符串数据类型
所有用单引号、双引号、反引号（撇 ES6模板字符串）包起来的都是字符串

#### 把其他类型值转换为字符串
- [val].toString()
字符串拼接
  - 经典例题：
```javascript
   let a = 10 + null + true + [] + undefined + '珠峰' + null + [] + 10 + false ;
   console.log(a);

    //    结果是：'11undefined珠峰null10false'
    //    - 分析：    10 + null -> 10 <br>
    //            10 + true -> 11 <br>
    //            11 + [] -> 11 + '' -> '11'  空数组变为数字，要先经历变为空字符串，遇到字符串，啥都不要想，直接变成字符串拼接<br>
    //            '11' + undefined -> '11undefined' <br>
    //                   ··· <br>
    //            结果为：'11undefined珠峰null10false' 
    //    - 把引用数字类型转化为数字，先把他基于toString方法转换为字符串，然后再转化为数字
    //    把字符串转化为数字，只要字符串中包含任意一个非有效数字字符（第一个点除外）结果都是NaN，空字符串会变成数字零
       console.log(Number('12.5'));//=>12.5
       console.log(Number('12.5px'));//=>NaN
       console.log(Number('12.5.5'));//=>NaN
       console.log(Number(''));//=>0


       //布尔转换为数字
       console.log(Number(true));//=>1
       console.log(Number(false));//=>0
       console.log(isNaN(false));//=>false
       console.log(isNaN(true));//=>false

       //null->0 undefined->NaN
       console.log(Number(null));//=>0
       console.log(Number(undefined));//=>NaN  
       console.log(Number({name:'10'}));//=>NaN
       console.log(Number({}));//=>NaN

       //把引用数字类型转化为数字，先把他基于toString方法转换为字符串，然后再转化为数字
       //{}/{xxx:'xxx'}.toString() =>"[object object]"=>NaN
       console.log(Number([]));//=>0
       //[].toString() -> ''
       console.log(Number([12]));//=>12
       //[12].toString() -> '12'
       console.log(Number([12,23]));//=>NaN
       //[12,23].toString() -> '12,23'
   	
   	   console.log(Number(Symbol(13))); //=>Cannot convert a Symbol value to a number
```
## boolean布尔数据类型
只有两个值 true/false

#### 把其他类型值转换为布尔类型
只有 0、NaN、’’、null、undefined 五个值转换为FALSE，其余都转换为TRUE（而且没有任何特殊情况）

- Boolean([val])
- !/!! 取反（！：先转为布尔，然后取反）（！!：取反再取反，只相当于转换为布尔，<=> Boolean）
- 条件判断
#### null/ undefined
null和undefined都代表的是没有
null:意料之中（一般都是开始不知道值，我们手动先设置为null，后期再给予赋值操作）
```javascript

let num = null;//=>let num = 0; 一般最好用null作为初始空值，因为零不是空值，在栈内存中有自己的存储空间（占了位置）
···
num=12;
// - undefined：意料之外（不是我能决定的）
let num;//=>创建一个变量没有赋值，默认值是undefined
···
num = 12;

/* 对象的属性名不能是引用数据类型值 */
		// =====基于 对象[属性名] 的方式操作，需要保证属性名是一个值（字符串/数字/布尔等都可以），如果不是值而是一个变量，它会把变量存储的值作为对象的属性名进行操作
		// =====基于 对象.属性名 的方式操作，属性名就是点后面的

		/* let n = 100;
		let obj = {
			1: 100
		};
		// console.log(obj[1]);
		// console.log(obj.1); //=>Uncaught SyntaxError: missing ) after argument list 基于点的方式操作有自己的局限性，属性名不能是数字的，不能 对象.数字属性，此时只能用 对象[数字属性]

		// console.log(obj[1]);
		// console.log(obj['1']); //=>其它非字符串格式作为属性名和字符串格式没啥区别

		// obj.n = 200; //=> {n:200}  n是属性名（数据格式是字符串）
		// obj['n'] = 200; //=> {n:200} 和上面的情况一样
		// obj[n] = 200; //=> {100:200} => obj[100]=200   n本身是一个变量（n和'n'的区别：前者是一个变量，后者是一个字符串的值），它代表的是所存储的值100（是一个数字格式）
		// obj[m] = 200; //=>Uncaught ReferenceError: m is not defined m这个变量没有被定义
		// obj[true] = 300; //=>{true:300}
		// obj[undefined] = 400; //=>{undefined:400}

		console.log(obj); */

		/* let n = {
			x: 100
		};
		let m = [100, 200];
		let obj = {};
		obj[n] = "珠峰"; //=>obj[{x:100}] 但是对象不能作为属性名，需要把其转换为字符串 =>{"[object Object]":"珠峰" }
		obj[m] = "培训"; //=>obj[[100,200]] =>{ "100,200":"培训" }
		console.log(obj); 

		//=>如果非要让属性名是个对象，只能基于ES6中的新数据结构 Map 处理
```
## object对象数据类型-普通对象
{[key]:[value],…}任何一个对象都是由零到多组键值对（属性名：属性值）组成的（并且属性名不能重复）
数组是特殊的对象数据类型

#### 数据类型的区别（堆栈底层机制）
以图片的和例子的形式呈现
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529141811228.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjIxNjgx,size_16,color_FFFFFF,t_70#pic_center)
##### 下面贡献一道例题，采用画图的形式呈现出来：
```javascript
// 例题1
    let n = [10,20];
    let m = n;
    let x = m;
    m[0] = 100;
    x = [30,40];
    x[0] = 200;
    m = [50,60];
    m = x;
    m[1] = 300;
    n[2] = 400;
    console.log(n,m,x);
```
答案分析如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142018156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjIxNjgx,size_16,color_FFFFFF,t_70#pic_center)
##### 再来一道阿里的面试题
```javascript
    let a = {
        n : 1
    };
    let b = a;
    a.x = a = {n:2};
    console.log(a.x);
    console.log(b);
```
答案分析如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142059383.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjIxNjgx,size_16,color_FFFFFF,t_70#pic_center)

### JS中的数据类型检测
- （类型）typeof [val]:用来检测数据类型的运算符
    - 基于typeof检测出的结果
    1.首先是一个字符串
    2.字符串中包含对应的类型
- 局限性
1.typeof null => "object"但是null并不是对象
2.基于typeof无法细分出当前值是普通对象还是数组对象等，因为只要是对象数据类型，返回的结果都是"object"
```javascript
console.log(typeof 1);   // 输出 =>"Number"
//比如下面一个小例子，就可以体现出你是否理解这个知识并判断你是否具有极客精神

console.log9(typeof typeof typeof []);  // => "string"
//分析如下：
//typeof [] => "object"
//typeof "object" => "string"
// 因为typeof检测的结果都以字符串形式输出,所以只要两个和两个以上同时检测，最后结果必然"string"
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142227495.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142238526.png#pic_center)
- （运算符）instanceof :用来检测当前实例是否属于某个类
- （构造器）constructor :基于构造函数检测数据类型（也是基于类的方式）
- Object.prototype.toString.call() :检测数据类型最好的办法
### JS中的操作语句：判断、循环
####  判断
  条件成立干什么？不成立干什么？
- if/else if/else
- 三元运算符
- switch case
#### 1.if/else
```javascript
if(条件){
    条件成立执行
}else if(条件2){
    条件2成立执行
}
···
else{
    以上条件都不成立
}
```
```javascript
let a = 10;
if(a <= 0) {
    //条件可以多样性：等于、大于、小于的比较/一个值或者取反等 => 最后都是要计算出是true还是false
    console.log('哈哈');
}else if(a>0 && a<10){
    console.log('呵呵');
}else if(a == 10){
    console.log('嘿嘿');
}else {
    console.log('嘻嘻');
}
```
2.三元运算符
三元运算符：简单的IF/ELSE的特殊处理方式
语法：条件？条件成立处理的事情：条件不成立处理的事情；
1.如果处理的事情过多，可以用括号包起来，每一件事情用逗号分隔
2.如果不需要处理事情，可以用null/undefined占位

下面引用一个例子说明三元运算符
```javascript
let a = 10;
if(a > 0){
    if( a < 10){
        a++;//=>a+=1  a=a+1   =>自身累加1
    } else {
        a--;;//=>a-=1  a=a-1   =>自身累减1
    }
} else {
    if(a > -10){
        a += 2;
    }
}
a > 0 ? ( a < 10 ? a++ : a--) : ( a > -10 ? a+=2 : null);//三元运算符形式表达
```
3.switch case
```javascript
//===========================switch case :一个变量在不同值得情况下的不同操作
//1.每一个case结束后都要加上break，不加break，当前条件执行完成后，后面条件不论是否成立都要执行，直到遇到break为止（不加break可以实现变量在某些值时做相同的事情）
//2.default等价于else，以上都不成立干的事情
//3.每一个case的比较都是用===“绝对相对”
/* let a = 10;
switch(a){
    case  1:
        console.log('haha');
        break;
    case  1:
        console.log('hdada');
        break;
     case  1:
        console.log('mimi');
        break;
    default :
        console.log('wuwu');
} */
```
下面是一个案例具体讲基于JS如何实现业务需求
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>点击切换详情显示</title>
    <STYLE>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            /* CSS3新盒子模型属性：控制WIDTH/HEIGHT是盒子最终的宽高 */
            box-sizing: border-box;
            margin: 20px auto;
            width: 200px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid lightcoral;
            position: relative;
            /*设置鼠标是一个小手*/
            cursor: pointer;
        }

        .box .detail {
            /* display: none; */
            position: absolute;
            right: -1px;
            top: 38px;
            z-index: -1;
            box-sizing: border-box;
            width: 500px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            border: 1px solid lightcoral;

        }
    </STYLE>
</head>

<body>
    <div class="box" id="box">
        <span>购物车</span>
        <div class="detail" id="detail" style="display: none">
            购物车的相关信息
        </div>
    </div>
    <!--传统基于DOM的方式实现业务需求
        1.想操作谁就先获取谁
        2.给某元素绑定事件
        3.在事件触发的时候修改元素的样式等 
    -->
    <!--IMPORT JS-->
    <script>
        //document.getElementById('ID'); :在整个文档中，通过元素的ID获取到当前这个元素对象
        let box = document.getElementById('box');
			    // =>通过方法获取的元素是对象数据类型的值
			    // console.log(typeof box); => "object"
			    
			    // => 基于.dir可以看到一个对象的详细信息
			    /*
			     * id:操作元素的ID值
			     * className：操作元素的CLASS样式类的值
			     * innerHTML: 操作的元素的内容（可以识别标签）
			     * innerText：和innerHTM的区别是不能识别标签
			     * tagName：获取元素的标签名（一般大写）
			     * ···
			     * style:操作元素的行内样式 属性值是一个新的对象（CSSStyleDeclararation）
			     */
        let detail = document.getElementById('detail');

        //元素对象.onxxx=function(){}:事件绑定，xxx事件类型（click/mouseover/mousedown/keydown...）
        box.onclick = function () {
            // 元素对象.style.xxx: 修改元素的某一个样式值(操作的是元素的行内样式，所以如果我们没有把样式写在行内上，在JS中基于.style.xxx的方式是无法获取到样式的)
            //首先获取DETAIL原有的样式（显示还是隐藏）：元素.style.xxx就是获取某一个样式(前提是需要在元素行内设置这个样式才能获取到)
            let n = detail.style.display;
            if (n === 'none') {
                //当前是隐藏的，我们让其显示
                detail.style.display = 'block';
                box.style.borderBottomColor = '#fff';
            }else{
                //当前是显示的，我们让其隐藏
                detail.style.display = 'none';
                box.style.borderBottomColor = 'lightcoral';
            }

            /*  detail.style.display = 'block';
             box.style.borderBottomColor = '#fff'; */
        }
    </script>

</body>

</html>
```
### == VS ===
== ：相等（如果左右两边数据类型不同，是默认先转换为相同的类型,然后再进行比较）
‘5’==5 =>TRUE
=== : 绝对相等（如果类型不一样，肯定不相等，不会默认转换数据类型）
‘5’ === 5 =>FALSE
项目中为了保证业务严谨，推荐使用 ===
## 循环
重复做某些事情就是循环

- for循环
```javascript
/*
 *1.创建循环的初始值
 *2.设置（验证）循环执行的条件
 *3.条件成立执行循环体中的内容
 *4.当前循环结束执行步长累计操作 
 */
/* for(var i =0;i<5;i++){
    console.log(i);
} */
//循环体中的两个关键词
//continue：结束当前这轮循环（continue后面的代码不再执行），继续执行下一轮循环
//break：强制结束整个循环（break后面代码也不再执行），而且整个循环啥也不干直接结束
for(var i=0;i<10;i++){
    if(i>=2){
        i+=2;
        continue;
    }
    if(i>=6){
        i--;
        break;
    }
    i++;
    console.log(i);
}
console.log(i);
```

- for in循环
为了便于理解for in循环先了解以下内容：
变量和属性名的区别
1.获取对象属性值有两种方法：1.对象.属性名 2.对象[‘属性名’]
2.一个对象的属性名只有两种格式：数字和字符串（等基本类型），只要不是数字和字符串格式都视为变量，变量值才是属性名
自己理解：[]里面的要么是数字要么是字符串（’ '/" "/）包起来的字母
```javascript
//属性名：属性值（放的如果是变量也是把变量存储的值拿过来做属性值）
var name = '兄贵'//变量名=变量值
var obj = {
    name: name//属性名：变量名
    //name,   ES6的写法（当属性名和属性值同名时）
    age: 1 === 1 ? 100 : 200//先计算出值再传给属性名
}//=>兄贵
```
下面是老师讲的例子
```javascript
var name = 10;
var obj = {
    name: '珠峰培训'
};
//获取OBJ对象NAME属性对应的值
console.log(obj.name);//=>珠峰培训
//一个对象的属性名只有两种格式：数字或者字符串（等基本类型值）！！！！！！！！理解的关键点，非常重要
console.log(obj['name']);//=>珠峰培训
//obj[name变量代表的值] => obj[10] =>undefined
console.log(obj[name]);
```
现在开始理解循环：
for in循环是用来循环遍历对象中的键值对的（continue和break同样适用）有限循环数字属性名（从小到大）
语法：for(var 变量（key） in 对象)
对象中有多少组键值对，循环就执行多少次（除非break结束）
```javascript
let obj = {
   name: 'shaokang',
   age: 24,
   friends: 'me,xuxu,zhaomin',
   1: 20,
   2: 50
};
for (var key in obj) {
   //每次循环key变量循环的是当前对象的属性名
   console.log(key);//=>1,2,3,name,arg,friends
   //获取属性值：obj[变量名（变量存的值也就是属性名）] => obj[key]
   console.log('属性名:' + key + '属性值' + obj[key]);
```
- for of循环（ES6新增）
- while循环
- do while循环
## 函數 function
函數就是一個方法或者一個功能体，函数就是把实现某个功能的代码放到一起进行分装，以后想要操作实现这个功能，只需要把函数执行即可 => “封装”：减少页面中的冗余代码，提高代码重复利用率（低耦合 高内聚）

洗衣机就是一个函数，生产洗衣机就是封装一个函数（把实现某些功能的代码封装进来），生产时不知道用户洗衣服时不知道用户放什么水、衣服等，我们需要提供入口（提供的入口在函数中叫做形参，执行的时候具体放的东西叫做实参），洗完衣服需要拿出来，洗衣机提供一个出口（在函数中叫做返回值：把函数处理后的结果能够返回给外边用）

- 创建函数
    - 形参
    - 返回值
- 执行函数
    - 实参
- arguments
函数内置的实参集合
任意数求和（执行函数的时候，传递N个值实现求和）
```javascript
 /**
  * 任意数求和
  *      1.传递的实参个数不定
  *      2.传递的值是否为有效数字不定
  * => 把传递的有效数字进行求和
  * 
  * arguments：函数内置的实参集合
  *      1.类数组集合，集合中存储着所有函数执行时，传递的实参信息
  *      2.不论是否设置形参，arguments都存在
  *      3.不论是否传递实参，arguments也都存在
  * arguments.callee:存储的是当前函数本身（一般不用，JS严格模式下禁止使用这些属性）
  */
 function sum() {
     let total = null;
     for (i = 0; i < arguments.length; i++) {
         //获取的每一项的结果都要先转换为数字（数学运算）
         let item = arguments[i];
         //非有效数字不加
         if (isNaN(item)) {
             continue;
         }
         total += item;
     }
     return total;
 }
```
- 函数底层运行机制
- ···
### 创建函数
```javascript
//=>ES5老方式
function[函数名]([形参变量1],···){
    // 函数体：基于JS完成需要实现的功能
    return [处理后的方法];
}

[函数名]（[实参1]，···）;
```

```javascript
// 求两个数的和，算完后乘10再除以2
// =>sum是函数名，代表这个函数
// =>sum()是让函数执行，代表的是
// =>n,m是形参，也是变量，用来存储执行函数时传递的实参
/* function sum(n, m) {
    let result = n + m;
    result *= 10;
    result /= 2;
    console.log(result);
} 
//10,30就是传递给形参变量的值（实参）
sum(10, 30);*/


/* 
let n = 10 + 10;
n = n * 10;
n = n / 2;
 */


//====================形参的细节
// 创建函数的时候，我们设置了形参变量，但如果执行的时候并没有传递对应的形参值，那么形参变量默认的值是：undefined
/* function sum(n, m) {
    // 形参默认值处理：如果没传递形参值，给予一个默认值
    if (n === undefined) {
        n = 0;
    }
    if (typeof m === 'undefined') {
        m = 0;
    }

    let result = n + m;
    result *= 10;
    result /= 2;
    console.log(result);
}
sum();// =>NaN
sum(10);// =>NaN
sum(10, 20);// =>150
sum(10, 20, 30);// =>150 */



//=====================函数中的返回值
//函数执行的时候，函数体内部创建的变量我们是无法获取和操作的，如果想要获取内部的信息，我们需要基于RETURN返回机制，把信息返回才可以
/* function sum(n, m) {
    let result = n + m;
    //RETURN的一定是值：此处是吧RESULT变量存储的值返回给外面
    return result;// =>30
}
let AA = sum(10, 20);
console.log(AA);
//console.log(result);//Uncaught ReferenceError: result is not defined
 */
//没有写RETURN，函数默认返回值是undefined
/* function sum(n, m) {
    let result = n + m;
}
let AA = sum(10, 20);
console.log(AA); // =>underfined */

function sum(n, m) {
    if (n === undefined || m === underfined) {
        //函数体中遇到RETURN，后面代码就不再执行了
        return;
    }
    let result = n + m;
}
sum(10, 20);
//=======================匿名函数
//匿名函数之函数表达式：把一个匿名函数本身作为值赋值给其他东西,这种函数一般不是手动触发执行，而且靠其他程序驱动触发执行（例如：触发某个事件的时候把它执行等）
document.body.onclick = function () { }
setTimeout(function () { }, 1000); // => 设置定时器，1000s后执行匿名函数
//匿名函数之自执行函数：创建完一个匿名函数，紧接着就把当前函数加小括号执行
(function (n) {
    // =>100
})(100);
```

下面引出一个选项卡的小案例，其中包括一些列知识
```javascript
=============================首先创建一个HTML的格式==========================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>選項卡</title>
    <link rel="stylesheet" href="css/tab.css">
</head>
<body>
    <div id="tabBox">
        <ul id="navBox">
            <li class="active">编程</li>
            <li>读书</li>
            <li>运动</li>
        </ul>
        <div class="active">编程使我快乐</div>
        <div>读书使我明智</div>
        <div>运动使我健康</div>
    </div>
    <!-- IMPORT JS -->
    <script src="js/tab.js"></script>
</body>
</html>


================================下面是CSS文件==================================
* {
    margin: 0;
    padding: 0;
}
ul {
    list-style: none;
}
#tabBox {
    box-sizing: border-box;
    margin: 20px auto;
    width: 500px;
}
#navBox {
    /* 只要把容器设置为FLEX弹性盒子容器，那么容器中的子元素默认在容器主轴（X轴）水平靠左排列 */
    display: flex;
    /* 相对于自己之前的位置向下移动一个像素 */
    position: relative;
    top: 1px;
}
#navBox li {
    box-sizing: border-box;
    margin-right: 10px ;
    padding: 0 10px;
    line-height: 35px;
    border: 1px solid #999;
    cursor: pointer;
}
#navBox li.active{
    border-bottom-color: #ffffff;
}
#tabBox>div {
    display: none;
    box-sizing: border-box;
    padding: 10px;
    height: 150px;
    border: 1px solid #999;
}
#tabBox>div.active{
    display: block ;
}


================================下面是JS文件以及其中的问题=================================
var tabBox = document.getElementById('tabBox');
var tabList = tabBox.getElementsByTagName('div');
var navBox = document.getElementById('navBox');
var navList = navBox.getElementsByTagName('li');

/*=============解决办法一：自定义属性解决 =============== */
//循环三个li，给每个li都绑定点击事件
 for (var i = 0; i < navList.length; i++) {
    //navList[i]:当前循环下我们要操作的li(i变量储存的值使我们需要获取指定元素的索引)
    //在循环给每个LI绑定点击事件的时候，我们给没一个LI（元素对象）设置一个自定义属性MY-INDEX，属性值存储的是当前LI的索引
    navList[i].myIndex = i
    navList[i].onclick = function () {
        //console.log(i); => 3
        //我想点击的是LI的索引，但是I不是
        //THIS是当前点击这个元素的LI,this.myIndex获取的是之前绑定在元素自定义属性上的索引值
        changeTab(this.myIndex);
    }
} 



/* =============其他方式================ */
//闭包解决方案
/* for (var i = 0; i < navList.length; i++) {
    navList[i].onclick = (function (i) {
        return function(){
            changeTab(i);
        }
    })(i);
}
 */


 //ES6中的LET解决方案
/* for (let i = 0; i < navList.length; i++) {
    navList[i].onclick = function () {
        changeTab(i);
    }
}  */



/*==================不能执行及其原因====================*/
/* for (var i = 0; i < navList.length; i++) {
    navList[i].onclick = function () {
        changeTab(i);
    }
}  */
 /*只有JS代码加载完成才能看到页面，只有用户看到页面才能点击
 *加载到循环这个代码了 i=0 i<3 i++
 *i=0 navList[0].onclick = function () {···}绑定事件的时候方法没执行，点击第一个LI才执行 i++
 *i=1 navList[1].onclick = function () {···} i++ => 2
 *i=2 navList[2].onclick = function () {···} i++ => 3
 *3<3 不通过，循环结束，此时i已经是3了
 *
 *循环结束看到页面，用户点击了页面，接下来执行绑定方法，方法中遇到一个I，但是I已经是循环结束后的3了
 */




//封装一个函数实现选项卡切换
//clickIndex:创建函数的时候还不知道是谁，所以定义一个入口clickIndex（点击这一项的索引），执行这一方法的时候把点击这一项的索引传进来即可
function changeTab(clickIndex) {
    //1.先让所有的LI 和DIV都没有选中样式
    for (var i = 0; i < navList.length; i++) {
        navList[i].className = '';
        tabList[i].className = '';
    }
    //2.点击的是谁就给谁加选中的样式类
    navList[clickIndex].className = 'active';
    tabList[clickIndex].className = 'active';

}
```

为了便于深入理解自定义函数这种方法，下面附上三张图片用来更好的理解这个知识点：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142459998.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjIxNjgx,size_16,color_FFFFFF,t_70#pic_center)
函数运行的底层原理
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142508630.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjIxNjgx,size_16,color_FFFFFF,t_70#pic_center)
选项卡的原理：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200529142518421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjIxNjgx,size_16,color_FFFFFF,t_70#pic_center)

## 常用输出方式
- 1、console.log/dir/table…在控制台输出
    - .dir 输出一个对象的详细键值对信息
    - .table 把一个多维的JSON数组在控制台按照表格方式呈现出来
- 2.- 浏览器窗口弹窗 alert/confirm/prompt
    - 三种方式输出的结果都必须通过toString转换为字符串 alert(1); => ‘1’
    - 三种输出方式会阻断JS代码的执行，只要当窗口关掉，JS才会继续运行
    - confirm 确定和取消：选择型弹窗
    - prompt 在confirm基础上多了一个输入框
- 3.document.write在页面中写入信息 输出结果都是字符串
-  4.console.log(alert(1))
    	- 1.alert(1):执行浏览器内置的alert方法，执行方法时弹出一个"1"（方法的功能），此方法没有返回值（默认返回值underfined）
    	- console.log(underfined) underfined不是字符串
====================================================================
- 1.Number()是按照浏览器底层机制，把其他数据类型转换为数字
    - 字符串：看是否包含有效数字字符，包含结果就是NaN;’’=>0
    - 布尔：true 1 false 0
    - null 0
    - undefined NaN
    - 引用类型值都要先转换为字符串再转换成数字
        - {}/正则/函数等 NaN
        - [] 0
        - [‘12’] ‘12’ 12
        - [12,23] ‘12,23’ NaN
- 2.parseInt/parseFloat([val])遵循按照字符串从左到右查找的机制找有效数字字符（所以传递的值一定是字符串，不是也要先转换为字符串再查找）
    - parseInt(undefoned) parseInt(‘undefoned’) NaN
    - parseInt(’’) NaN 因为没找到有效数字字符
```javascript
swich case中的比较是绝对相等===
let i='10';
i=i+1 / i+=1 => '101'
i++ => i=11     i++是纯粹的数学运算
```
i++和++i都是数学运算中的累加1，区别是计算的顺序 i++是先运算，然后再给i+1；++i是先给i+1，再进行计算

下面是两个练习
1.变态基础知识练习题
```javascript
1.!(!"Number(undefined)");  =>  True 
2.isNaN(parseInt(new Date())) + Number([1]) + typeof underfined; => "2undefined"
3.Boolean(Number("")) + !isNaN(Number(null)) + Boolean("parseInt([])") + typeof!(null);  =>  "2boolean"
4.parseFloat("1.6px") + parseInt("1.2px") + typeof parseInt(null);  =>  "2.6number"
5.isNaN(Number(!!Number(parseInt("0.8"))));  =>   false
6.console.log(1 + "2" + "2");    =>   "122"
7.!typeof parseFloat("0");   =>     false
8.Number("");  =>   0
9.typeof"parseInt(null)" + 12 +!!Number(NaN);    =>     "string12false"
10.!typeof(isNaN("")) + parseInt(NaN);   =>    NaN
11.typeof !parseInt(null) + !isNaN(null);   =>   "booleantrue"
```
总结：1.!!表示转换成布尔类型
2.引号里都是字符串，布尔类型中除了（0’’\false\null\undefined）其余都是1，所以布尔类型里出现字符串只要不是空字符串就是1
3.typeof检测出的数据类型是以字符串形式表示出来
4.parseFloat\parseInt 从左往右依次检测数字，直到遇到非数字则把之前的数字按照相应类型输出，如果没有遇到数字则输出NaN
2.做一个点击body换肤，用了两种思路
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>换肤</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        html,
        body {
           /* width: 100%; */
            height: 100%;
            overflow: hidden;
        }

        button {
            padding: 20px;
            line-height: 40px;
        }
    </style>
</head>

<body style="background-color: white;"></body>
<!-- <body style="background-color: white;"></body> -->
    <button id="changeBtn">点击更换BODY的背景颜色（白->红->橙->蓝->绿->白）</button>

    <script>
        let body = document.body;
        let changeBtn = document.getElementById('changeBtn');
        //从数组中拿到每个样式值只需要：ary[数字索引]
        let i = 0;
        let ary = ['red', 'green', 'lightblue', 'pink', 'orange', '#baf'];
        changeBtn.onclick = function () {
            i++;//=>ary[i] 每一次点击之后基于累加后的I作为索引，从数组中拿到不同的颜色
            i > ary.length - 1 ? i = 0 : null;//如果索引累加后比数组最大的索引大，我们让其从零开始即可
            body.style.backgroundColor = ary[i];
        }
        //=============================低端方法=====================================

        /*  changeBtn.onclick = function () {
             //获取当前背景颜色 元素.style.xxx只能获取行内样式（颜色在样式中使用16进制方式，JS中获取的是RGB值）
             let bg = body.style.backgroundColor;
             switch (bg) {
                 case 'white':
                     body.style.backgroundColor = 'red';
                     break;
                 case 'red':
                     body.style.backgroundColor = 'orange';
                     break;
                 case 'orange':
                     body.style.backgroundColor = 'blue';
                     break;
                 case 'blue':
                     body.style.backgroundColor = 'green';
                     break;
                 default:
                     body.style.backgroundColor = 'white';
             }
         } */
    </script>
</body>

</html>
```
## Math
- 数学函数 ：但是它不是一个函数，它是一个对象，对象中存储了很多操作数字的属性方法，因此被称作数学函数
### Math中常用的属性和方法
1.Math.abs([number value])
获取绝对值（绝对值永远是正数或者零），传递的如果不是数字类型值，先基于Number（）转换为数字再处理
2.Math.ceil/floor([number value])
把一个数向上取整（比之前大）/向下取整（比之前小）
3.Math.round（）
四舍五入（正数中.5属于进，负数中.5属于舍）
4.Math.max/min([val1],[val2],…)
获取一堆数中的最大值和最小值
5.Math.sqrt/pow()
sqrt:给一个数开平方
pow:计算一个数的多少次幂 console.log(Math.pow(2,10)) => 1024
6.Math.random()
获取0-1之间的随机小数
拓展：获取[n-m]之间的随机整数
包含n也包含m
n < m
Math.round(Math.random()*(m-n)+n)
实例：
```javascript
    //获取25-30的随机数字10次
    for(i=1;i<10;i++){
        let ran = Math.round(Math.random()*(30-25)+25);
        console.log(ran);
    }
```
## 数组
- 数组是对象数据类型的，它是特殊的对象
```javascript
let ary = [12, 24, 35, 16];
console.log(typeof ary); // => "object"
console.dir(ary);
    /**
    *  ary ={
    *      0:12,
    *      1:24,
    *      2:35,
    *      3:16,
    *      length:4
    * }
    * 数字作为索引（KEY 属性名）
    * length作为长度
    * 
    * ary[0]   根据索引获取指定项内容
    * ary.length 获取数组的长度
    * ary.length-1是最后一项的索引
    * */ 
```
- 数组中常用方法
    - 方法的作用和含义
    - 方法的实参（类型和含义）
    - 方法的返回值
    - 原来的数组是否会改变
    1.实现数组增删改的方法
    这一部分方法都会修改原有数组
```javascript
push : 向数组末尾加

    /* `push` : 向数组末尾增加内容
    @params ： 多个任意类型
    @return ：新增后数组的长度 */
    let ary = [10, 20];
    let res = ary.push(30, 'AA', { name: 'feizai' });
    console.log(res, ary);
    //基于原生JS操作键值对的方法也可以向末尾增加一项新内容
    ary[ary.length] = 40;
    console.log(res, ary);                                                                                           
```

unshift ： 向数组开始位置增加内容
```javascript
1
    /* `unshift` : 向数组开始位置增加内容
    @params ： 多个任意类型
    @return ：新增后数组的长度 */
    let ary = [10, 20];
    let res = ary.unshift(30, 'AA', { name: 'feizai' });
    console.log(res, ary);
```

shift ： 删除数组中的第一项
```javascript
1
    /* `shift` : 删除数组中的第一项
    @params 
    @return ：删除的那一项
     */
    let ary = [10, 20,30];
    let res = ary.shift();
    console.log(res, ary); => 10 [20,30]
    //基于原生JS中的DELETE，把数组当做普通的对象，确实可以删除某一项内容，但是不会影响数组本身结构的特点（length长度不会跟着修改），真实项目中赌局这样使用
    delete ary[0];
    console.log(ary);
```
pop : 删除最后一项
```javascript
1
    /* `pop` : 删除数组中的最后一项
    @params 
    @return ：删除的那一项
    */
    let ary = [10, 20,30];
    let res = ary.shift();
    console.log(res, ary); => 30 [10,20]
    //基于原生JS让数组长度干掉一位，默认干掉的就是最后一项
    ary.length--; // => ary.length=ary.length-1;
    console.log(ary);
```
splice
```javascript
1
    /* `splice` : 实现数组的删除
    @params ：n，m都是数字 从索引n开始删除m个元素（m不写，是删除到末尾）
    @return ：把删除的部分用新数组存储起来返回
    */
    let ary = [10, 20,30,40,50,60,70,80,90];
    let res = ary.splice(2,4);
    console.log(res, ary); => [30,40,50,60] [10,20,70,80,90]
    //删除最后一项：ary.splice(ary.length-1);
    //删除第一项：ary.splice(0,1);
    /* `splice` : 实现数组的增加、修改
    @params ：n，m，x  从索引n开始删除m个元素，用x占用删除的部分
              n，0，x  从索引n开始，一个都不删，把x放到索引n前面 
    @return ：把删除的部分用新数组存储起来返回
    */
    //实现增加
    ary.splice(n,0,x);
    //向数组末尾追加
    ary.splice(ary.length,0,x);
    //向数组开始追加
    ary.splice(0,0,x);
```
2.数组的查询和拼接
原来的数组不会改变
slice：
```javascript
 /* `slice` : 实现数组的查询
@params ：n，m都是数字 从索引n开始找到索引为m的地方（不包含m这一项）
@return ：把找到的的部分用新数组形式返回
*/
let ary = [10, 20,30,40,50,60,70,80,90];
let res = ary.slice(1,3);
console.log(res); => [20,30]
//数组的克隆，参数0不写也可以
    let ary = [10, 20,30,40,50,60,70,80,90];
res = ary.slice(0);
console.log(res); => [10, 20,30,40,50,60,70,80,90]
concat:

/* `concat` : 实现数组的拼接
@params ：多个任意类型值
@return ：拼接后新数组，原来数组不变
*/
let ary1 = [10,20,30];
let ary2 = [40,50,60];
let res = ary1.concat('我是猪猪侠',ary2);
console.log(res);
```
3.把数组转换为字符串
原有数组不变
toString
```javascript
/* `toString` : 把数组转换成字符串
@params ：
@return ：转换后的字符串（原来数组不变）
*/
let ary1 = [10,20,30];
let res = ary.toSteing();
console.log(res);// => "10,20,30"
console.log([].toString());// => ""
console.log([12].toString()); // => "12"
 //=================================================
join

 /* `join` : 把数组转换成字符串
@params ：指定的分隔符（字符串格式）
@return ：转换后的字符串（原来数组不变）
*/
let ary1 = [10,20,30];
let res = ary.join('|');
console.log(res);// => "10|20|30"

let ary1 = [10,20,30];
let res = ary.join('+');
console.log(res);// => "10+20+30"
console.log(eval(res));// => 60 eval把字符串变为JS表达式执行
```
4.检测数组中是否包含某一项
indexof / lastIndexOf /includes
```javascript
 /* `indexof / lastIndexOf` : 检测当前项在数组中第一次或者最后一次出现的位置索引值（在IE6-8不兼容）
@params ：要检索的这一项内容
@return ：这一项出现的位置索引值（数字），如果数组中没有这一项，返回的结果是-1
原来数组不变
*/
let ary1 = [10,20,30,10,20,30];
console.log(ary.indexOf(20)); // => 1
console.log(ary.lastIndexOf(20)); // => 4
console.log(ary.includes(20)); // => true
```
5.数组的排序或者排列
reverse
```javascript
 /* `reverse` : 把数组倒过来排列
@params ：
@return ：排列后的新数组
原来数组改变
*/
let ary = [12,15,9,28,10,22];
ary.reverse();
console.log(ary); // => [22,10,28,9,15,12]

sort

 /* `sort` : 实现数组的排序
@params ：可以没有也可以是个函数
@return ：排序后的新数组
原来数组改变

let ary = [3,5,9,4,8,7];
ary.sort();
console.log(ary); // => [3,4,5,7,8,9]
//sort方法中如果不传递参数，是无法处理10以上数字排序的（它默认按照第一项每一个字符来排）
let ary = [12,15,9,28,10,22];
ary.sort();
console.log(ary); // => [10,12,15,22,28,9]
//想要实现多位数正常排序，需要给sort传递一个函数，函数中返回 a-b 实现升序，返回 b-a 实现降序
let ary = [12,15,9,28,10,22];
//a和b是相邻两项
ary.sort((a,b)=>a - b);
//ary.sort(function(a,b){return a - b;});
console.log(ary); // => [9,10,12,15,22,28]
```
6.遍历数组中每一项的方法
forEach
```javascript
/* `forEach` : 遍历数组中每一项
@params ：回调函数
@return ：
原来数组不变
*/
let ary = [12,15,9,28,10,22];
//基于原生JS循环实现
for(let i=0; i<ary.length; i++){
    //i:当前循环这一项索引
    //ary[i]:根据索引获取循环这一项
    console.log('索引：' + i +'内容：' +ary[i]);
}

ary.forEach((item,index) => {
    //数组中有多少项，函数就会被默认执行多少次
        //每一次执行函数：item是数组中当前要操作的这一项，index是当前项的索引
})；
console.log('索引：' + index +'内容：' + item);
```
map
```javascript
/* `map` : 遍历数组中每一项
@params ：回调函数
@return ：返回一个新数组
原来数组不变
*/
let ary = [12,15,9,28,10,22];

ary.map((item,index) => {
    return item * item;
})；
console.log('索引：' + index +'内容：' + item);
```
filter
find
reduce
some
every
·······

数组去重
```javascript
/**
 * 方案一：
 *      创建一个空数组，循环原有数组中的每一项，每拿到一项都往新数组里增加
 *      添加之前验证新数组之前是否存在这一项,不存在再增加
*/
let ary = [1, 2, 3, 3, 1, 2, 3, 1, 1, 2, 3, 2, 3]
let newAry = [];
for (let i = 0; i < ary.length; i++) {
    //循环获取原有数组中的每一项
    let item = ary[i];
    //验证新数组中是否存在这一项
    if (newAry.includes(item)) {
        //存在这一项，不增加到新数组中，继续下一轮循环
        continue;
    }
    //新数组中不存在，加入新数组即可
    newAry.push(item);
}
console.log(newAry);
//简化代码
let newAry = [];
ary.forEach(item => {
    if (newAry.includes(item)) return;
    newAry.push(item);
});
console.log(newAry);


/**
 * 方案二：
 *      先分别拿出数组中的每一项
 *      用这一项分别和“它后面的每项”依次进行比较，如果遇到和当前项A相同的，则在原来数组中一处这一项
 *      不用includes/indexOf（保证兼容性）
 */
var ary = [1, 2, 3, 3, 1, 2, 3, 1, 1, 2, 3, 2, 3];
for (i = 0; i < ary.length; i++) {
    //item:每一次循环拿出来的当前项
    //i:当前项的索引  i+1：代表后一项
    var item = ary[i];
    //让当前项和后面的每一项进行比较（循环）
    for (var j = i + 1; j < ary.length; j++) {
        //compare后面拿出来要比较的每一项
        var compare = ary[j];
        //如果item和compare相等，说明这一项是重复的，删掉
        if (item === compare) {
            //j这一项要从数组中删除
            ary.splice(j, 1);
            //数组塌陷了：j后面每一项索引都提前了一位，下一次要比较的还是j这个索引的内容
            j--;
        }
    }

}
console.log(ary);

/**
 * 方案三
 */

let ary = [1, 2, 3, 3, 1, 2, 3, 1, 1, 2, 3, 2, 3];

//1.创建一个空对象
let obj = {};
//2.循环数组中的每一项，把每一项向对象中储存 => item=item
for (let i = 0; i < ary, length; i++) {
    let item = ary[i];
    //3.每一次存储之前进行判断：验证obj中是否存在这一项
    if (obj[item] !== undefined) {
        //已经存在这一项
        ary.splice(i, 1);
        i--;
        continue;
    }
    obj[item] = item;
}
console.log(ary);

//基于splice实现删除性能不好：当前项被删除后，后面每一项的索引都要向前提一位，如果后面内容过多，一定影响性能
/**
 * unique:去重函数
 * @params
 *      ary[Array] 要去重的数组
 * @return
 *      [Array] 去重后的数组
 * by xxx on 20191127
 */
function unique(ary) {
    let obj = {};
    for (let i = 0; i < ary.length; i++) {
        let item = ary[i];
        if (obj[item] !== undefined) {
            ary[i] = ary[ary.length - 1];
            ary.length--;
            i--;
            continue;
        }
        obj[item] = item
    }
    return ary;
}

/* let ary = [1, 2, 3, 3, 1, 2, 3, 1, 1, 2, 3, 2, 3];
let obj = {};
for (let i = 0; i < ary, length; i++) {
    let item = ary[i];
    if (obj[item] !== undefined) {
        ary[i] = ary[ary.length - 1];
        ary.length--;
        i--;
        continue;
    }
    obj[item] = item;
}
console.log(ary); */



//基于ES6的Set（对应的Map）实现去重
let ary = [1, 2, 3, 3, 1, 2, 3, 1, 1, 2, 3, 2, 3];
ary = [...new Set(ary)];
console.log(ary);
```
## 字符串
charAt / charCodeAt
```javascript
		/**
		 * charAt / charCodeAt
		 * charAt:根据索引获得指定位置的字符
		 * charCodeAt：获取指定字符的ASCII码值（Unicode编码值）
		 *  @params
		 *      n [number] 获取字符指定的索引
		 *  @return 
		 *      返回查找到的字符
		 *      找不到返回的是空字符串不是undefined，或者对应的编码值
		 */
```
substr / substring / slice
```javascript
/**
 * substr / substring / slice
 * 都是为了实现字符串截取（在原来字符中获取自己想要的）
 * substr(n,m):从索引n开始截取m个字符，m不写截取到末尾（后面方法也是）
 * substring(n,m):从索引n开始找到索引为m处（不含m）
 * slice(n,m):和substring一样，都是找到索引为m处，但是slice可以支持负数作为索引，其余两个方法是不可以的，是按照 str.length+负索引 的方式找
 */
```
indexOf / lastIndexOf / includes
```javascript
/**
 * indexOf / lastIndexOf / includes
 * 验证字符是否存在
 * indexOf(x,y):获取x第一次出现位置的索引,y是控制查找的起始位置的索引
 * lastIndexOf(x,y):获取最后一次出现位置的索引
       => 没有这个字符返回结果是-1
 
 */
let str = 'zhufengpeixunyangfanqihang';
console.log(str.indexOf('n')); // => 5
console.log(str.lastIndexOf('n')); // => 24
console.log(str.indexOf('@')); // => -1 不存在返回-1
if (str.indexOf('@') === -1) {
    //字符串中不包含@这个字符
}

console.log(str.indexOf('feng')); // => 3  验证整体第一次出现的位置，返回的索引是第一个字符所在位置的索引
console.log(str.indexOf('n', 7));  //=> 12  查找字符串索引7及之后的字符串中，n第一次出现的位置索引

if (!str.includes('@')) {
    console.log('当前字符串不包含@');
}
```
toUpperCase / toLowerCase
```javascript
/**
 * toUpperCase / toLowerCase
 * 字符串中大小写转换
 * toUpperCase():转大写
 * toLowerCase();转小写                                                                 
 */
```
split
```javascript
/**
  * split([分隔符]):把字符串按照指定的分隔符拆分成数组 （和数组中的join相对应）
  * split支持传递正则表达式
  */
 //把|变成，分隔符
 let str = 'music|movie|eat|sport';
 let ary = str.split('|');//=>["music","movie","eat","sport"]
 str = ary.toString();
 console.log(str);//=>"music,movie,eat,sport"
```
replace
```javascript
 /**
  * replace(老字符，新字符)
  * 实现字符串的替换（经常伴随着正则使用）
  */
 let str = "珠峰@培训@扬帆@起航";
 str =str.replace('@','-'); // str =str.replace(/@/g,'-');
 console.log(str); //  在不适用正则表达式情况下，执行一次replace只能替换一次
```
常用需求的实现：

时间字符串的处理
```javascript
let time = '2019-11-28 12:6:23';
//变为自己需要的格式
//例如：2019年11月28日 12时6分23秒
//      2019年11月28日
//      "11/28  12:06"
//...
//let time = '2019-11-28 12:6:23';
//变为自己需要的格式
//例如：2019年11月28日 12时6分23秒
//      2019年11月28日
//      "11/28  12:06"

/**
 * 方案一:一路REPLACE到底
 */
/* let time = '2019-11-28 12:6:23';
time = time.replace('-', '年').replace('-', '月').replace(' ', '日 ').replace(':', '时').replace(':', '分') + '秒'; */

/**
 * 方案二：获取年月日小时分钟秒这几个值后，最后想拼成什么效果就拼成什么效果
 */
//不足十位补零
let addZero = val => val.length < 2 ? '0' + val : val;


let time = '2019-11-28 12:6:23';
let ary = time.split(/(?: |-|:)/g); //["2019", "11", "28", "12", "6", "23"]
time = ary[0] + '年' + addZero(ary[1])+ '月' + addZero(ary[2]) + '日' + addZero(ary[3]) + '时' + addZero(ary[4]) + '分' + addZero(ary[5]) + '秒'; //2019年11月28日12时6分23秒
console.log(time);


/* let time = '2019-11-28 12:6:23';
let n = time.split(' ');  //["2019-11-28", "12:6:23"]
let m = n[0].split('-');  //["2019", "11", "28"]
let x = n[1].split('：');  //["12:6:23"] */
```
queryURLParamter
```javascript
let url = 'http://www,zhufengpeixun.cn/index.html?lx=1&name=zhufeng&teacher=aaa#box';
1
结果{

 lx:1,
1
 name:'zhufeng',
1
 teacher:'aaa',
1
 HASH:'box'
1
}
```
具体方法如下
```javascript
//1.获取问号后面的值
let askIndex = url.indexOf('?');
let wellIndex = url.indexOf('#');
let askText = url.substring(askIndex + 1, wellIndex);
let wellText = url.substring(wellIndex + 1);
console.log(askText, wellText);
//askText => "lx=1&name=zhufeng&teacher=aaa"
//wellText => "box"
//2.?后面值得详细处理
let askAry = askText.split('&');
// =>  ["lx=1", "name=zhufeng", "teacher=aaa"]
askAry.forEach(item => {
   //item:当前从数组中循环这一项
   let n = item.split('=');
   let key = n[0];
   let value = n[1];
   result[key] = value;
});
result['HASH'] = wellText;
console.log(result); 
```