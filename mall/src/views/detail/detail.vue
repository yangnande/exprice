<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :topImage="topImage" v-if="topImage.length>0"></detail-swiper>
      <detail-base-info :goodInfo="goodInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-good-info :detailInfo="detailInfo" @goodImg="goodImg"></detail-good-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommendInfo" v-if="recommendInfo.length>0"></goods-list>
    </scroll>
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

import scroll from 'components/common/scroll/scroll'
import goodsList from 'components/content/goods/goodsList'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemImgListenerMixin} from 'common/mixin'

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
    scroll,
    goodsList
  },
  mixins: [itemImgListenerMixin],
  data() {
    return {
      iid: '',
      topImage: [], // 轮播图片的数据
      goodInfo: {}, // 商品信息
      shop: {}, // 店铺信息
      detailInfo: {}, // 获取商品详情
      paramInfo: {}, // 获取参数的信息
      commentInfo: {}, // 获取评论信息
      recommendInfo: [] // 获取推荐的数据
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
  destroyed () {
    // 销毁事件
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    goodImg () {
      // 第一种方法
      // this.$refs.scroll.refresh()
      // 第二种方法
      this.refresh()
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
  height: calc(100% - 120px)
}
</style>
