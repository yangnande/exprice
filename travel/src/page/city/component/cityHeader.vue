<template>
  <div class="header">
    <router-link to="/">
      <div class="iconfont back-icon">&#xe600;</div>
    </router-link>
    <p class="city-select">城市选择</p>
  </div>
</template>

<script>
export default {
  name: 'cityHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/variables.styl'
.header
  display flex
  background $bgColor
  color #fff
  line-height $headerHeight
  .back-icon
    padding-left .2rem
    font-size .4rem
    color #fff
  .city-select
    flex 1
    text-align center
    font-size .32rem
</style>
