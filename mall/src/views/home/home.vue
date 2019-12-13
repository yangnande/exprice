<template>
  <div class="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" v-if="banners.length>0"></home-swiper>
    <recommond-view :recommonds="recommonds" v-if="recommonds.length>0"></recommond-view>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="this.goods[currentType].list"></goods-list>
    <scroll ref="scroll" :probeType='3' @scroll="contentScroll" :pullUpLoad="true" @pullUpLoad="pullUpLoad"></scroll>
    <back-up @click.native="backClick" v-show="isShowBackTop"></back-up>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar/navBar'
import scroll from '@/components/common/scroll/scroll'
import tabControl from '@/components/content/tabControl/tabControl'
import goodsList from '@/components/content/goods/goodsList'
import backUp from '@/components/content/backUp/backUp'

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
    goodsList,
    scroll,
    backUp
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
      }, // 商品列表数据
      isShowBackTop: false // 回到顶部图标是否显示
    }
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    this.$bus.$on('itemImageLoad', function() {
      console.log('图片加载完成')
      this.$ref.scroll.refresh()
    })
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
      getHomeGoods(type,page).then(
        res => {
          console.log(res, 'res')
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 加载更多只调用一次 如果想调用多次 就得使用这个方法
          this.$refs.scroll.finishPullUp()
        }
      )
    },
    // 切换商品列表tab
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
    },
    // 点击回到顶部
    backClick () {
      this.refs.scroll.scrollTo(0,0,500)
    },
    // 监听滚动距离
    contentScroll (position) {
      this.isShowBackTop = -(position.y) > 1000
    },
    // 滚动到底部调商品列表接口
    pullUpLoad () {
      this.getHomeGoods(this.currentType)
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
