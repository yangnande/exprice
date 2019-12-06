<template>
  <div class="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar/navBar'
export default {
  name: 'home',
  components: {
    navBar
  }
}
</script>

<style>
.home-bar {
  background-color: #fff;
  color: red;
  font-size: 38px;
}
</style>
