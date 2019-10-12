<template>
  <div id="app">
    <!-- 1 路由中对应组件的跳转 默认有返回是pushState-->
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <!-- 2 路由中对应组件的跳转 replace没有返回键,tag改变渲染的html元素，默认是a标签,active-class将class是button-active变成active-->
    <!-- <button to="/home" replace tag="button" active-class="active">首页</button>
    <button to="/about" replace tag="button"  active-class="active">关于</button> -->
    <!-- 3 跳转的第二种方法 -->
    <!-- <button @click="homeClick">首页</button>
    <button  @click="aboutClick">关于</button> -->
    <!-- 4 动态路由 -->
    <!-- 4 $route 获取激活状态下的路由，$router是new Router -->
    <router-link :to="'./user/'+userId">用户</router-link>
    <!-- <h1>动态路由参数 {{userIds}}</h1> -->
    <h1>动态路由参数:{{$route.params.userId}}</h1>
    <!-- 占位-路由中对应组件的渲染 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      userId: 'lele'
    }
  },
  computed: {
    userIds: function () {
      return this.userId
    }
  },
  methods: {

    homeClick () {
      // pushState 默认有历史，可返回
      // this.$router.push('/home')
      // replace 不可返回
      this.$router.replace('/home')
    },
    aboutClick () {
      // pushState 默认有历史，可返回
      // this.$router.push('/about')
      // replace 不可返回
      this.$router.replace('/about')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  color: red;
}
</style>
