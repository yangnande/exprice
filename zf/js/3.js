// 在全局作用域下声明一个变量，也相当于给window全局对象设置了一个属性，变量的值就是属性值（私有作用域中声明的私有变量和windwo没啥关系）
console.log(a) // undefined
console.log(window.a) // undefined 
console.log('a' in window) // true 在变量提升阶段，在全局作用域中声明了一个变量A，此时就已经把A当做属性赋值给window了，只不过还没有给A赋值，默认值undefined in：检测某个属性是否隶属于这个对象
var a = 12 // 全局变量值修改，window的属性值也跟着修改
console.log(a) // 12
console.log(window.a) // windwow的一个属性名A 12 
// 全局变量和window中的属性存在'映射机制'：一个改，另一个跟着改

console.log(a) // 报错
console.log(window.a) // undefined
console.log('a' in window) // false
a = 12; // window.a = 12
console.log(a)// 是13行的简写
console.log(window.a) // 是12行的全写
// 加var 本质是变量，有变量提升，不加var 本质是window下的属性，没有变量提升
// var a = 12,
  // b= 13; // 这样写b是带var的
// var a = b = 12 // 这样写b是不带var的

console.log(a,b) // undefined undefined
var a = 12,
    b = 12;
function fn () {
    console.log(a,b) // undefined 12
    var a = b = 13;
    console.log(a,b)// 13 13
}
fn()
console.log(a,b) // 12 13