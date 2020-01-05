import Vue from 'vue'
import Router from 'vue-router' // 1 引入路由
// import Home from '@/components/Home'
// import About from '@/components/about'
// import User from '@/components/user'
// 延迟加载，即在需要的时候进行加载，随用随载
// 像vue这种单页面应用，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，会出啊先长时间的白屏，即使做了loading也是不利于用户体验
// 而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时
const Home = () => import('@/components/home')
const About = () => import('@/components/about')
const User = () => import('@/components/user')
const New = () => import('@/components/home/new')
const Message = () => import('@/components/home/message')
Vue.use(Router) // 2 安装路由

const router = new Router({
  mode: 'history', // 路由默认的模式是哈希http://localhost:8080/#/home，样式不好看，可以换成history http://localhost:8080/home
  linkActiveClass: 'active', // 多个router-link 直接在配置中改为active
  // 3 建立路由和组件的映射表，并导出路由
  routes: [
    {
      path: '/',
      redirect: '/home' // 默认让显示首页的内容
    },
    {
      path: '/home',
      meta: {
        title: '首页'
      },
      component: Home,
      // 路由嵌套
      children: [{
        path: '',
        redirect: 'new'
      }, {
        path: 'new',
        name: 'New',
        component: New
      }, {
        path: 'message',
        name: 'Message',
        component: Message
      }
      ]
    },
    {
      path: '/about',
      name: About,
      meta: {
        title: '关于'
      },
      component: About
    },
    {
      path: '/user/:userId',
      name: User,
      meta: {
        title: '用户'
      },
      component: User
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to, 'to')
  document.title = to.matched[0].meta.title
  next()
})

export default router
