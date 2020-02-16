<template>
  <div class="recommond">
    <p class="rec-title">热门推荐</p>
    <router-link class="rec-list border-bottom" v-for="item in list" :key="item.id" tag="div" :to="'/detail/'+item.id">
      <img class="rec-img" :src="item.imgUrl" alt="">
      <div class="rec-info">
        <p class="info-title ellipsis">{{item.title}}</p>
        <p class="info-desc ellipsis">{{item.desc}}</p>
        <button>查看详情</button>
      </div>
    </router-link>
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
  display flex
  padding .2rem
  .rec-img
    width 1.7rem
    height 1.7rem
  .rec-info
    min-width 0
    margin-left .2rem
    flex 1
    .info-title
      font-size .32rem
      margin-top .1rem
    .info-desc
      margin-top .1rem
      color #cccccc
    button
      background: #ff9300
      color: #fff
      border-radius .06rem
      font-size .2rem
      margin-top .1rem
      padding:.1rem .2rem
</style>
