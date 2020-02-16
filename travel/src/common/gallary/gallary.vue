<template>
  <div class="gallary" @click="gallaryClose">
    <div class="gallary-img">
      <swiper :options="swiperOption">
      <swiper-slide v-for="item in imgs" :key="item.id">
        <img :src="item" alt="" class="swiper-img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gallary',
  props: {
    imgs: Array,
    default() {
      return []
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType : 'fraction',
        observer:true,
        observeParents:true
      }
    }
  },
  methods: {
    gallaryClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.gallary-img >>> .swiper-container
  height 100%
  overflow inherit
.gallary-img >>> .swiper-pagination
  bottom -1rem
  color #fff
.gallary
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #000
  display flex
  flex-direction column
  justify-content center
  z-index 1
  .gallary-img
    background #fff
    height 60%

    .swiper-img
      width 100%
      height 100%
</style>
