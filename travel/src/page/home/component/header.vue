<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe600;</div>
    </div>
    <div class="header-input iconfont">
      <span class="iconfont search-icon">&#xe643;</span>
      <div>输入城市/景点/游玩主题</div>
    </div>
    <router-link to="/city">
      <div class="header-right">{{city}}<span class="iconfont arrow-icon">&#xe601;</span></div>
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['city'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/variables.styl'
.header
  display:flex
  align-items: center
  justify-content:space-between
  background: $bgColor
  color: #fff
  line-height: .86rem
  .header-left
    width: .64rem
    text-align: center;
    .back-icon
      font-size: .4rem;
  .header-input
    flex: 1
    background:#fff
    height: .64rem
    color:#ccc
    border-radius: .01rem
    display:flex
    align-items: center
    padding-left: .2rem
    font-size: .12rem
    .search-icon
      margin-right: .04rem
  .header-right
    display flex
    min-width: 1.04rem
    text-align: center
    color: #fff
    padding-left .1rem
    .arrow-icon
      font-size: .24rem
</style>
