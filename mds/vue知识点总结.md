1 vue created 和 watch 输入属性哪个先执行？
  如果watch加了immediate: true, 就是watch先执行，否则就是created 先执行
2 vue中mixins和extends有什么区别？
  vue.extend()只是创建一个构造器，为了创建可复用的组件
　mixins,extends是为了扩展组件
  mixins接受的是个数组类型，extends是一个对象
  mixins可以混入多个mixin，extends只能继承一个
  优先级Vue.extend>extends>mixins
3 vue中mixins有什么使用场景？
  一般一些有重复方法的组件，有些公共组件使用频率很高,可以考虑抽一个mixin。
4 在vue中created与activated有什么区别？
  created():在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。
  activated()：是在路由设置<keep-alive></keep-alive>时，才会有这个生命周期。在被 keep-alive 缓存的组件激活时调用。
  当引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
  如果有数据更新的场景，可以放在activated方法中。
5 在vue项目如何引入异步组件？
  什么是异步组件？
  异步组件就是定义的时候什么都不做，只在组件需要渲染（组件第一次显示）的时候进行加载渲染并缓存，缓存是以备下次访问。
  为什么用异步组件?
  在大型应用中，功能不停地累加后，核心页面已经不堪重负，访问速度愈来愈慢。为了解决这个问题我们需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块，从而提高页面加载速度。
  ```javascript
  const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
  export default new Router({
      routes: [
          {
              path: '/importfuncdemo1',
              name: 'ImportFuncDemo1',
              component: ImportFuncDemo1
          }
      ]
  })
  ```
  6 在vue项目中scss scoped穿透符>>>无效的解决方案有哪些？
    vue中的template模板中，style中分为全局样式和局部样式，区别是是否存在scoped 属性，当你的组件中的样式中添加了scoped属性，表明你组件中的样式值作用于当前的组件，与其他页面的样式互不相关。
    样式互不影响看似很不错，但是有些时候会存在一些问题，尤其是引用了第三方的ui组件后，需要修改其样式，而又不想去除scoped属性造成组件之间的样式污染，就需要使用到样式穿透，一般情况下使用 >>> 即可。但是在前端工具越来越强大方便的具体，使用一些例如scss或者less就可能造成问题,可以使用/deep/或::v-deep
    ```css
      <style lang="scss" scoped>
        .a >>> .b {
          font-size: 24px;
        }
      </style>
      <style lang="scss" scoped>
        .a /deep/ .b {
          font-size: 24px;
        }
      </style>
      <style lang="scss" scoped>
        .a ::v-deep .b {
          font-size: 24px;
        }
      </style>
    ```
  7 为什么在v-for中的key不推荐使用随机数或者index呢？那要怎么使用才比较好呢？
    因为在插入数据或者删除数据的时候，会导致后面的数据的key绑定的index变化，进而导致从新渲染，效率会降低
  8 vue-loader在webpack编译流程中的哪个阶段？(不理解)
    编译模板阶段：从入口文件出发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
  9 预渲染和SSR(服务端渲染)有什么区别？(不理解)
    服务端渲染和预渲染的使用场景还是有较明显的区别的。预渲染的使用场景更多是我们所说的静态页面的形式。服务端渲染适用于大型的、页面数据处理较多且较为复杂的、与服务端有数据交互的功能型网站，一个明显的使用场景就是电商网站。
  10 你有用过预渲染技术吗？怎么做的？(不理解)
  11 使用vue如何判断页面是否编辑及编辑页面未保存离开时，给出弹窗提示
    https://www.jianshu.com/p/e732ddf783d4
    watch() 监听数据变动,在组件路由beforeRouterLeave中进行判断,给出弹窗提示
  12 vue的.sync修饰符可以用表达式吗？为什么？
    带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。
    ```javascript
    function render() {
      with(this) {
        return _c('div', [_c('input', {
          attrs: {
            "name": name + 1
          },
          on: {
            "update:name": function ($event) {
              name + 1 = $event
            }
          }
        })])
      }
    }
    看到这里就明白了，使用表达式会产生一条错误的语句：

    name + 1 = $event
    // Uncaught SyntaxError: Invalid left-hand side in assignment
     ```
13 v-if和v-show哪个优先级更高？
  if>show
  v-if="true"   v-show="false"
  v-if="false"   v-show="true"
  不管那种，都为false，只要有false就不显示
  上面两种if是用来判断得，如果为if为true，那么v-show就会出现并执行隐藏，元素还在只是不显示，是由if进行的初始化渲染，当if为false得时候，v-show不执行，在所在元素都不显示当前得标签，不进行初始化渲染。
  当：
  v-show="false" v-if="true"
  v-show="true" v-if="false"  
  当show在前，if在后时，也是判断if，v-show="false" v-if="true"， 当前所使用的标签还在，有进行初始化渲染。在dom中可以找到。
  当v-show="true" v-if="false" 也是判断if，此时if为false，所以当前标签没有被初始化渲染。
  所以if>show
14 如何批量引入组件？
