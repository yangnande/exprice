<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icon :list="iconList"></home-icon>
    <home-recommond :list="recommendList"></home-recommond>
    <home-weekend :list="weekenList"></home-weekend>
  </div>
</template>

<script>
import homeHeader from './component/header'
import homeSwiper from './component/swiper'
import homeIcon from './component/icon'
import homeRecommond from './component/recommond'
import homeWeekend from './component/weekend'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekenList: [],
      lastCity: ''
    }
  },
  components: {
    homeHeader,
    homeSwiper,
    homeIcon,
    homeRecommond,
    homeWeekend
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    getHomeInfo() {
      axios.get('/api/index.json?city='+this.city).then(
        this.getHomeInfoSucc
      )
    },
    getHomeInfoSucc(res) {
      var res = res.data
      if (res.ret && res.data) {
        var data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekenList = data.weekendList
      }
    }
  },
  mounted() {
    this.lastCity = this.city
    this.getHomeInfo()
  },
  activated () {
    if(this.lastCity != this.city){
      this.lastCity = this.city
      this.getHomeInfo()
    }
  }
}
</script>

<style scoped>
</style>
