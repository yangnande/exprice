<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImage="topImage" v-if="topImage.length>0"></detail-swiper>
    <detail-base-info :goodInfo="goodInfo"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>

import detailNavBar from './childComps/detailNavBar'
import detailSwiper from './childComps/detailSwiper'
import detailBaseInfo from './childComps/detailBaseInfo'
import detailShopInfo from './childComps/detailShopInfo'

import {getDetail,Goods,Shop} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo
  },
  data() {
    return {
      iid: '',
      topImage: [], // 轮播图片的数据
      goodInfo: {}, // 商品信息
      shop: {} // 店铺信息
    }
  },
  created () {
    // 获取当前商品的iid
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res=>{
      console.log(res)
      var data = res.result
      // 获取轮播图片的数据
      this.topImage = data.itemInfo.topImages
      this.goodInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取商品信息
      this.shop = new Shop(data.shopInfo)
      console.log(this.topImage,this.shop)
    })
  }
}
</script>

<style>
</style>
