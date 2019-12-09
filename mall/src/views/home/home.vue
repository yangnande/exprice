<template>
  <div class="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" v-if="banners.length>0"></home-swiper>
    <recommond-view :recommonds="recommonds" v-if="recommonds.length>0"></recommond-view>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="this.goods[type].list"></goods-list>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar/navBar'
import tabControl from '@/components/content/tabControl/tabControl'
import goodsList from '@/components/content/goods/goodsList'

import homeSwiper from './childComps/homeSwiper'
import recommondView from './childComps/recommondView'
import featureView from './childComps/featureView'

import {getHomeMultidata,getHomeGoods} from '@/network/home'
export default {
  name: 'home',
  components: {
    navBar,
    homeSwiper,
    recommondView,
    featureView,
    tabControl,
    goodsList
  },
  data () {
    return {
      banners: [], // 轮播图数据
      recommonds: [], // 推荐商品数据
      currentType: 'pop', // 商品列表当前的类型
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      } // 商品列表数据
    }
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommonds = res.data.data.recommend.list;
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      // getHomeGoods(type,page).then(
      //   res => {
      //     this.goods[type].list.push(...res.data.list)
      //     this.goods[type].page += 1
      //   }
      // )
    },
    tabClick (i) {
      switch (i) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
      }
    }
  }
}
</script>

<style>
.home {
  margin-bottom: 200px;
}
.home-bar {
  background-color: #fff;
  color: #ff8198;
  font-size: 38px;
}
</style>
