<template>
  <div>
    <home-header :city="city"></home-header>
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
export default {
  name: 'Home',
  data () {
    return {
      city: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekenList: []
    }
  },
  components: {
    homeHeader,
    homeSwiper,
    homeIcon,
    homeRecommond,
    homeWeekend
  },
  methods: {
    getHomeInfo() {
      axios.get('/api/index.json').then(
        this.getHomeInfoSucc
      )
    },
    getHomeInfoSucc(res) {
      var res = res.data
      if (res.ret && res.data) {
        var data = res.data
        this.city = data.city
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekenList = data.weekendList
      }
    }
  },
  mounted() {
    this.getHomeInfo()
  }
}
</script>

<style scoped>
</style>
