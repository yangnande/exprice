<template>
  <div id="app">
    <button v-bind:disabled="isButtonDisabled">Button</button>
    <a v-bind:[someAttr]="someAttr"> aaaaaaaaa </a>
    <div v-if="a==0">0</div>
    <div v-else-if="a==1">1</div>
    <div  v-else>2</div>
    {{redInfo.remainingTimes}}
    {{redInfo.actityCycle}}
    <input type="text" />
    <button @click="changeShow">变化</button>
    <!-- 1 路由中对应组件的跳转 默认有返回是pushState-->
    <router-link to="/home">首页</router-link>
    <button  @click="aboutClick">关于</button>
    <!-- <router-link to="/about">关于</router-link> -->
    <!-- 2 路由中对应组件的跳转 replace没有返回键,tag改变渲染的html元素，默认是a标签,active-class将class是button-active变成active-->
    <!-- <button to="/home" replace tag="button" active-class="active">首页</button>
    <button to="/about" replace tag="button"  active-class="active">关于</button> -->
    <!-- 3 跳转的第二种方法 -->
    <!-- <button @click="homeClick">首页</button>
    <button  @click="aboutClick">关于</button> -->
    <!-- 4 动态路由 -->
    <!-- 4 $route 获取激活状态下的路由，$router是new Router -->
    <router-link :to="'/user/'+userId">用户</router-link>
    <!-- <h1>动态路由参数 {{userIds}}</h1> -->
    <h1>动态路由参数:{{$route.params.userId}}</h1>
    <!-- 占位-路由中对应组件的渲染 -->
    <!-- keep-alive 创建一次dom,防止重复渲染DOM -->
    <!-- include 包含哪些组件缓存， exclude排除哪些组件缓存,值可以是name,可以是正则 -->
    <keep-alive exclude="User,About">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      userId: 'lele',
      a: '1',
      isButtonDisabled: true,
      someAttr: 'bar'
    }
  },
  computed: {
    ...mapState(['redInfo']),
    userIds: function () {
      return this.userId
    }
  },
  methods: {
    changeShow () {
      this.$store.commit('setRedInfo', { // 企业微信红包剩余次数和活动周期
        remainingTimes: '1',
        actityCycle: '月'
      })
      console.log(this.redInfo)
    },
    homeClick () {
      // pushState 默认有历史，可返回
      // this.$router.push('/home')
      // replace 不可返回
      this.$router.replace('/home')
    },
    aboutClick () {
      // pushState 默认有历史，可返回
      // 通过query传参 http://localhost:8080/about?name=about&age=13
      this.$router.push({
        path: '/about',
        query: {
          name: 'about',
          age: 13
        }
      })
      // replace 不可返回
      // this.$router.replace('/about')
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
