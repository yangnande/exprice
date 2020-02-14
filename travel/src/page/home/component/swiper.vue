<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" alt="" class="swiper-img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'homeSwiper',
  props: {
    'list': Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    showSwiper() {
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active
  background: #fff

.wrapper
  // 高根据宽自适应
  // width: 100%
  // height: 0
  // padding-bottom: 31.25%
  // overflow: hidden
  .swiper-img
    width: 100%
    height: 3rem
</style>
