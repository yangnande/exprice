<template>
  <div class="detail-list">
    <div class="item border-bottom" v-for="(v,i) in list" :key="i">
      <div class="title">
        <span class="title-icon"></span>
        {{v.title}}
      </div>
      <div v-if="v.children">
        <detail-list :list="v.children"></detail-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailList',
  props: {
    list: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  line-height: .8rem
  font-size: .32rem
  padding: 0 .2rem
  .title-icon
    position: relative
    left: .06rem
    top: .06rem
    display: inline-block
    width: .36rem
    height: .36rem
    background: url(http://s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -.45rem no-repeat
    margin-right: .1rem
    background-size: .4rem 3rem
</style>
