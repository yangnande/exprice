<template>
  <div>
    <h1>我是用户</h1>
    <p>我是用户内容，哈哈哈</p>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    // 点击时，让标题变成组件的名字
    // document.title = '用户'
    console.log('user', 'created')
  },
  destroyed () {
    console.log('user', 'destory')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
