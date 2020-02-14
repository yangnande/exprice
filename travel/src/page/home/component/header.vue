<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe600;</div>
    </div>
    <div class="header-input iconfont">
      <span class="iconfont search-icon">&#xe643;</span>
      <div>输入城市/景点/游玩主题</div>
    </div>
    <div class="header-right">城市<span class="iconfont arrow-icon">&#xe601;</span></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    'city': String
  },
  data () {
    return {
    }
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
    width: 1.04rem
    text-align: center
    .arrow-icon
      font-size: .24rem
</style>
