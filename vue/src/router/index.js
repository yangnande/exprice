import Vue from 'vue'
import Router from 'vue-router' // 1 引入路由
import Home from '@/components/Home'
import About from '@/components/about'
import User from '@/components/user'

Vue.use(Router) // 2 安装路由

export default new Router({
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
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: About,
      component: About
    },
    {
      path: '/user/:userId',
      name: User,
      component: User
    }
  ]
})
