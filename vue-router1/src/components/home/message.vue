<template>
  <div class="hello">
    <h1>我是主页-消息</h1>
    <p>我是消息内容，哈哈哈</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    // console.log('Message', 'created')
  },
  destroyed () {
    // console.log('Message', 'destory')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
