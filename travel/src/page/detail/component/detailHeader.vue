<template>
  <div>
    <div class="detail-header" v-show="isShow">
      <router-link tag="div" to="/" class="iconfont detail-header-icon">&#xe600;</router-link>
    </div>
    <div class="detail-fixed" v-show="!isShow" :style="opacityStyle">
      <router-link tag="div" to="/" class="iconfont detail-header-icon">&#xe600;</router-link>
      <div class="detail-title">景点详情</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailHeader',
  data () {
    return {
      isShow : true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    getScrollHeight() {
      console.log('888')
      let top = document.documentElement.scrollTop
      if(top>30) {
        this.isShow = false
        var opacity = top/140
        this.opacityStyle.opacity=  opacity>1 ? 1 : opacity
      } else {
        this.isShow = true
      }
    }
  },
  activated () {
    window.addEventListener('scroll',this.getScrollHeight)
  },
  deactivated () {
    window.removeEventListener('scroll',this.getScrollHeight)
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/variables.styl'
.detail-header
  position absolute
  top .2rem
  left .2rem
  width .8rem
  height .8rem
  line-height .8rem
  text-align center
  background rgba(0,0,0,.6)
  border-radius 50%
  z-index 1
  .detail-header-icon
    font-size .32rem
    color #fff
.detail-fixed
  position fixed
  top 0
  left 0
  right 0
  display flex
  background $bgColor
  color #fff
  line-height $headerHeight
  z-index 1
  display flex
  .detail-header-icon
    padding-left .2rem
  .detail-title
    flex 1
    text-align center
</style>
