<template>
  <div class="icons-list">
    <swiper :options="swiperOption">
        <swiper-slide v-for="(v,index) in pages" :key="index">
          <div class="icon-item"  v-for="item in v" :key="item.id">
            <img :src="item.imgUrl" alt="">
            <p class="descOver ellipsis">{{item.desc}}</p>
          </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'homeIcon',
  props: {
    'list': Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoPlay: false
      }
    }
  },
  computed: {
    pages() {
      const pages = []
      this.list.forEach((item,index)=>{
        var page = Math.floor(index/8)
        if(!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper-container
  height: 100%
.swiper-slide
  display: flex
  flex-flow: wrap
.icons-list
  width: 100%
  height: 3.8rem
  padding: .2rem
  .icon-item
    width: 25%
    height: 50%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    img
      width: 1.1rem
      height: 1.1rem
    .descOver
      width: 100%
      text-align: center
</style>
