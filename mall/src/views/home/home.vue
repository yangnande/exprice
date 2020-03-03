<template>
  <div class="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1" :titles="['流行', '新款', '精选']" @tabClick="tabClick" class="isFixed" v-show="isFixed"></tab-control>
    <scroll ref="scroll" class="content" :probeType='3' @scroll="contentScroll" :pullUpLoad="true" @pullUpLoad="pullUpLoad">
      <home-swiper :banners="banners" v-if="banners.length>0" @swiperLoad="swiperLoad"></home-swiper>
      <recommond-view :recommonds="recommonds" v-if="recommonds.length>0"></recommond-view>
      <feature-view/>
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- <scroll ref="scroll" :probeType='3' @scroll="contentScroll" :pullUpLoad="true" @pullUpLoad="pullUpLoad"></scroll> -->
    <back-up @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import navBar from 'components/common/navBar/navBar'
import scroll from 'components/common/scroll/scroll'
import tabControl from 'components/content/tabControl/tabControl'
import goodsList from 'components/content/goods/goodsList'

import homeSwiper from './childComps/homeSwiper'
import recommondView from './childComps/recommondView'
import featureView from './childComps/featureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/util'
import {itemImgListenerMixin,backTopMixin} from 'common/mixin'
export default {
  name: 'home',
  components: {
    navBar,
    homeSwiper,
    recommondView,
    featureView,
    tabControl,
    goodsList,
    scroll
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
      tabControlOffsetTop: 0,
      isFixed:false, // 是否是固定定位
      saveY: 0 // 记录离开页面滚动的距离
    }
  },
  mixins: [itemImgListenerMixin,backTopMixin],
  created () {
    this.getHomeMultidata()
  },
  mounted () {
    // this.getHomeGoods(this.currentType)
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        if(res.data&&res.data.banner&&res.data.recommend) {
          this.banners = res.data.banner.list;
          this.recommonds = res.data.recommend.list;
        }
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(
        res => {
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
      this.$refs.tabControl1.currentIndex = i
      this.$refs.tabControl2.currentIndex = i
    },
    // 监听滚动距离
    contentScroll (position) {
      // 返回顶部
      this.isShowBackTop = -(position.y) > 1000
      // tabcontrol 固定定位
      if(-(position.y) > this.tabControlOffsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    // 滚动到底部调商品列表接口
    pullUpLoad () {
      this.getHomeGoods(this.currentType)
    },
    swiperLoad() {
      // 获取tabControl的offsetTop 组件没有offsetTop  $el获取组件内的元素
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  // 组件激活时
  activated () {
    this.$refs.scroll.scrollTo(0,this.saveY,200)
    // 最好刷新一下
    this.$refs.scroll.refresh()
  },
  // 组件停止使用时
  deactivated () {
    // 1保存滚动的距离
    this.saveY = this.$refs.scroll.getY()
    // 2销毁事件
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
.home {
  /* position: relative; */
  /* margin-bottom: 200px; */
}
.home-bar {
  position: relative;
  z-index: 88;
  color: #fff;
  background-color: #ff8198;
  font-size: 46px;
}
.content {
  position: absolute;
  top: 120px;
  bottom: 140px;
  left: 0;
  right:0;
}
.isFixed {
  position: fixed;
  top: 120px;
  right: 0;
  left: 0;
  z-index: 99;
  background: #fff;
}
</style>
