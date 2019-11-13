<template>
  <div>
    <h1>我是关于</h1>
    <p>我是关于内容，哈哈哈</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    // 点击时，让标题变成组件的名字
    // document.title = '关于'
    // 获取query传的参数
    // console.log(this.$route.query)
    console.log('about', 'created')
  },
  destroyed () {
    console.log('about', 'destory')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
