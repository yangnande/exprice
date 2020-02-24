<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bscroll: null
    }
  },
  mounted () {
    let el = this.$refs.wrapper
    // 1.创建BScroll对象
    this.bscroll = new BScroll(el,{
      click: true, // button不用设置，本身可以点击，其他的元素需要设置
      probeType: this.probeType, // 0,1不监听滚动，2监听滚动，不监听惯性滚动 3监听惯性滚动
      pullUpLoad: this.pullUpLoad // 是否支持下拉加载更多
    })
    // 2.监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.bscroll.on('scroll',position => {
        this.$emit('scroll', position)
      })
    }
    // 3.监听滚动到底部
    if(this.pullUpLoad) {
      this.bscroll.on('pullingUp',()=>{
        this.$emit('pullUpLoad')
      })
    }
  },
  methods: {
    // 滚动至顶部
    scrollTo (x,y,time) {
      this.bscroll && this.bscroll.scrollTo(x,y,time)
    },
    // 滚动的页面重新计算高度
    refresh () {
      this.bscroll && this.bscroll.refresh()
    },
    // 多次下拉加载更多
    finishPullUp () {
      this.bscroll && this.bscroll.finishPullUp()
    },
    // 保存滚动的距离
    getY() {
      return this.bscroll ? this.bscroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
