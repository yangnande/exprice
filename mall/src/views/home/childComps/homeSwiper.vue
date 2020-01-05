<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="(v,i) in banners" :key="i">
        <a href="v.link">
          <img :src="v.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'

export default {
  name: 'home-swiper',
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style>
</style>
