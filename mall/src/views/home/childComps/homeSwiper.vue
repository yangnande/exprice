<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="(v,i) in banners" :key="i">
        <a href="v.link">
          <img :src="v.image" alt="" @load="swiperLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'home-swiper',
  props: {
    banners: {
      type: Array,
      default: [],
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperLoad() {
      if(!this.isLoad) {
        this.$emit('swiperLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>
</style>
