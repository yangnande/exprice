<template>
  <div class="city-list" ref="city-list">
    <div>
      <div class="item">
        <p class="title border-topbottom">当前城市</p>
        <div class="content">
          <div class="citys">{{city}}</div>
        </div>
      </div>
      <div class="item">
        <p class="title border-topbottom">热门城市</p>
        <div class="content">
          <div class="citys"  v-for="item in hotCities" :key="item.id" @click="handleCityChange(item.name)">{{item.name}}</div>
        </div>
      </div>
      <div class="item" v-for="(i,k) of cities" :key="k" :ref="k">
        <p class="title border-topbottom">{{k}}</p>
        <div class="allcity">
          <p class="border-bottom"  v-for="item of i" :key="item.id" @click="handleCityChange(item.name)">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'cityList',
  props: {
    cities: Object,
    hotCities: Array,
    currentLetter: String
  },
  data () {
    return {
      scroll: null
    }
  },
  computed: {
    ...mapState(['city'])
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs["city-list"])
  },
  methods: {
    ...mapMutations(['changeCity']),
    handleCityChange(city) {
      this.changeCity(city)
      // this.$store.commit('changeCity',city)
      this.$router.push('/')
    }
  },
  watch: {
    currentLetter() {
      var elem = this.$refs[this.currentLetter][0]
      this.scroll.scrollToElement(elem)
    }
  }
}
</script>

<style lang="stylus" scoped>
.border-topbottom,.border-bottom
  &:before
    border-color #ccc
  &:after
    border-color #ccc
.city-list
  overflow hidden
  position absolute
  top 1.58rem
  left 0
  right 0
  bottom 0
  .title
    background #eee
    line-height .4rem
    padding-left .2rem
  .content
    display flex
    justify-content space-between
    flex-flow wrap
    padding 0 .4rem .1rem .2rem
    .citys
      width 30%
      padding .02rem 0
      text-align center
      margin-top .1rem
      border .02rem solid #cccccc
  .allcity
    p
      line-height .6rem
      padding-left .2rem
</style>
