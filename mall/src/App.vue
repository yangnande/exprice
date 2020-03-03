<template>
  <div id="app">
    <!-- 对组件进行缓存，从而节省性能 页面只加载一次  -->
    <!-- <keep-alive exclude="Detail,CartBottom,CartListItem"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <main-tab-bar/>
  </div>
</template>

<script>
import mainTabBar from 'components/content/mainTabBar/mainTabBar'
export default {
  name: 'App',
  components: {
    mainTabBar
  }
}
</script>

<style>

</style>
