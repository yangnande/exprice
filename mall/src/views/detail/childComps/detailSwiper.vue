<template>
  <swiper class="detail">
    <swiper-item v-for="(v,i) in topImage" :key="i">
      <img :src="v" alt="">
    </swiper-item>
  </swiper>

</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImage: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail {
  height: 600px;
}
</style>
