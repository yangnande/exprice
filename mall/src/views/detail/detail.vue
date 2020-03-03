<template>
  <div class="detail">
    <detail-nav-bar style="background:#fff" ref="detailNav" @navClick="navClick"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probeType=3 @scroll="detailScroll">
      <detail-swiper :topImage="topImage" v-if="topImage.length>0"></detail-swiper>
      <detail-base-info :goodInfo="goodInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-good-info :detailInfo="detailInfo" @goodImg="goodImg"></detail-good-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="goodList" :goods="recommendInfo" v-if="recommendInfo.length>0"></goods-list>
    </scroll>
    <back-up @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>

import detailNavBar from './childComps/detailNavBar'
import detailSwiper from './childComps/detailSwiper'
import detailBaseInfo from './childComps/detailBaseInfo'
import detailShopInfo from './childComps/detailShopInfo'
import detailGoodInfo from './childComps/detailGoodInfo'
import detailParamInfo from './childComps/detailParamInfo'
import detailCommentInfo from './childComps/detailCommentInfo'
import detailBottomBar from './childComps/detailBottomBar'

import scroll from 'components/common/scroll/scroll'
import goodsList from 'components/content/goods/goodsList'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemImgListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/util'

import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,
    scroll,
    goodsList
  },
  mixins: [itemImgListenerMixin,backTopMixin],
  data() {
    return {
      iid: '',
      topImage: [], // 轮播图片的数据
      goodInfo: {}, // 商品信息
      shop: {}, // 店铺信息
      detailInfo: {}, // 获取商品详情
      paramInfo: {}, // 获取参数的信息
      commentInfo: {}, // 获取评论信息
      recommendInfo: [], // 获取推荐的数据
      saveY: [], // 保存导航栏点击元素的offsetTop
      scrollOffset: null, // 处理滚动逻辑的函数
      currentIndex: 0,
      msg: '',
      isShow: false
    }
  },
  created () {
    // 获取当前商品的iid
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res=>{
      // console.log(res)
      var data = res.result
      // 获取轮播图片的数据
      this.topImage = data.itemInfo.topImages
      // 获取商品信息
      this.goodInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 获取商品详情
      this.detailInfo = data.detailInfo
      // 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取评论信息
      if(data.rate) {
        this.commentInfo = data.rate
      }
    })
    // 获取推荐的数据
    getRecommend().then(res=>{
      this.recommendInfo = res.data.list
      // console.log(this.recommendInfo,'this.recommendInfo ')
    })
  },
  mounted () {
    this.scrollOffset = debounce(()=>{
      this.saveY = []
      this.saveY.push(0)
      let detailNavH = this.$refs.detailNav.$el.offsetHeight
      this.saveY.push(this.$refs.param.$el.offsetTop - detailNavH)
      this.saveY.push(this.$refs.comment.$el.offsetTop - detailNavH)
      this.saveY.push(this.$refs.goodList.$el.offsetTop - detailNavH)
      // 方法二
      this.saveY.push(Number.MAX_VALUE)
    },100)
  },
  destroyed () {
    // 销毁事件
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    ...mapActions(['addToCart']),
    goodImg () {
      // 第一种方法
      // this.$refs.scroll.refresh()
      // 第二种方法
      this.refresh()
      // 保存导航栏点击元素的offsetTop
      this.scrollOffset()
      // let a = debounce(()=>{
      //   this.saveY = []
      //   this.saveY.push(0)
      //   let detailNavH = this.$refs.detailNav.$el.offsetHeight
      //   this.saveY.push(this.$refs.param.$el.offsetTop - detailNavH)
      //   this.saveY.push(this.$refs.comment.$el.offsetTop - detailNavH)
      //   this.saveY.push(this.$refs.goodList.$el.offsetTop - detailNavH)
      //   console.log(this.saveY,' this.saveY ')
      // },100)
      // a()
    },
    navClick(i) {
      this.$refs.scroll.scrollTo(0,-this.saveY[i],100)
    },
    detailScroll(position) {
      // [0, 2458, 3217, 3377]
      // 导航和滚动联动
      let scrollHeight = -(position.y)
      let leng = this.saveY.length
      for(let i = 0;i<leng-1;i++) {
        // 方法一
        // if(this.currentIndex !== i && (i<leng-1&&(scrollHeight>=this.saveY[i]&&scrollHeight<this.saveY[i+1]) || i==leng-1 && scrollHeight>=this.saveY[i])) {
        //   this.currentIndex = i
        //   this.$refs.detailNav.currentIndex = this.currentIndex
        // }
        // 方法二  [0, 2458, 3217, 3377, 1.7976931348623157e+308]
        if(this.currentIndex !== i && (scrollHeight>=this.saveY[i]&&scrollHeight<this.saveY[i+1]) ) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
      // 返回顶部
      this.isShowBackTop = -(position.y) > 1000
    },
    addCart() {
      // 1获取商品信息
      let product = {}
      product.img = this.topImage[0]
      product.title = this.goodInfo.title
      product.desc = this.goodInfo.desc
      product.realPrice = this.goodInfo.realPrice
      product.iid = this.iid
      // 2将商品加到购物车
      // this.$store.dispatch('addToCart', product).then(res=>{
      //   console.log(res,'res')
      // })
      this.addToCart(product).then(res=>{
        console.log(this.$toast,res,'res')
        this.$toast.show(res)
      })
    }
  }
}
</script>

<style>
.detail {
  position: relative;
  z-index: 22;
  background: #fff;
  height: 100vh;
}
.detail-scroll {
  /* position: absolute;
  top: 120px;
  bottom: 0;
  left: 0;
  right:0; */
  height: calc(100% - 120px - 160px)
}
</style>
