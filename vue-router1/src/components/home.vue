<template>
  <div class="hello">
    <h1>我是主页</h1>
    <p>我是主页面内容，哈哈哈</p>
    <!-- 路由嵌套 -->
    <router-link to="/home/new">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      path: '/home/new'
    }
  },
  created () {
    // 点击时，让标题变成组件的名字
    // document.title = '首页'
    console.log('home', 'created')
  },
  destroyed () {
    console.log('home', 'destory')
  },
  // 离开当行前是什么路径，返回时一样，不弄到默认的路径
  // 使用了keep-alive的组件才可使用的周期函数
  activated () {
    this.$router.push(this.path)
    // console.log('activated')
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // console.log(this.$route.path, 'beforeRouteLeave') // 获取当前激活的路径
    this.path = this.$route.path
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
