<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img :src="bannerImg" alt="">
      <div class="banner-info">
        <div class="bannerTitle">{{sightName}}</div>
        <div class="bannerNumber">
          <span class="iconfont picture">&#xe60c;</span>
          39
        </div>
      </div>
    </div>
    <fade>
      <gallary :imgs="gallaryImgs" @close="BannerClose" v-show="isShow"></gallary>
    </fade>
  </div>
</template>

<script>
import gallary from 'common/gallary/gallary'
import fade from 'common/fade/fade'
export default {
  name: 'detailBanner',
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array,
  },
  data () {
    return {
      isShow: false,
      imgs: ['https://imgs.qunarzz.com/p/tts5/1711/6d/1b031a19abe1c002.jpg_r_390x260x95_85500a1b.jpg','https://imgs.qunarzz.com/p/tts5/1711/6d/1b031a19abe1c002.jpg_r_390x260x95_85500a1b.jpg']
    }
  },
  components: {
    gallary,
    fade
  },
  methods: {
    handleBannerClick() {
      this.isShow = true
    },
    BannerClose() {
      this.isShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
  height 4.1rem
  position relative
  img
    width 100%
  .banner-info
    display flex
    align-items center
    position absolute
    bottom 0
    left 0
    right 0
    line-height .6rem
    color #fff
    font-size .24rem
    background-image linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.8))
    .bannerTitle
      padding 0 .2rem
      flex 1
    .bannerNumber
      display: flex;
      padding 0 .2rem
      background rgba(0,0,0,.8)
      border-radius .2rem
      line-height: .4rem;
      height .4rem
</style>
