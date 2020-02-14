<template>
  <div class="recommond">
    <p class="rec-title">周末去哪儿</p>
    <div class="rec-list" v-for="item in list" :key="item.id">
      <img class="rec-img" :src="item.imgUrl" alt="">
      <p class="info-title ellipsis">{{item.title}}</p>
      <p class="info-desc ellipsis">{{item.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeRecommond',
  props: {
    'list': Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.rec-title
  background #cccccc
  line-height .8rem
  padding-left .12rem
.rec-list
  padding-top .2rem
  .rec-img
    width 100%
    height 2.72rem
  .info-title
    font-size .32rem
    margin-left .2rem
    margin-top .1rem
  .info-desc
    margin-top .1rem
    margin-left .2rem
    color #cccccc
</style>
