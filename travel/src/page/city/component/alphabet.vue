<template>
  <ul class="city-alphabet">
    <li v-for="(v,i) of letters" :key="i"
    :ref="v"
    @click="selectLetter"
    @touchstart.prevent="letterTouchStart"
    @touchmove="letterTouchMove"
    @touchend="letterTouchEnd"
    >{{v}}</li>
  </ul>
</template>

<script>
export default {
  name: 'cityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      showStaus: false,
      Atop: 0,
      timer: null
    }
  },
  updated() {
    // 性能优化-只获取一次Atop
    this.Atop = this.$refs['A'][0].offsetTop
  },
  computed: {
    letters() {
      var data = []
      for(var i in this.cities) {
        data.push(i)
      }
      return data
    }
  },
  methods: {
    selectLetter(e) {
      this.$emit('change',e.target.innerText)
    },
    letterTouchStart() {
      this.showStaus = true
    },
    letterTouchMove(e) {
      if(this.showStaus){
        // 性能优化-时间节流，减少移动时获取的数据
        if(this.timer) {
          clearTimeout(this.timer)
        }
        console.log(this.Atop)
        this.timer = setTimeout(()=>{
          var moveTop = e.touches[0].clientY-79
          var index = Math.floor((moveTop-this.Atop)/19)
          if(index>=0&&index<this.letters.length) {
            this.$emit('getCurrentLetter',this.letters[index])
          }
        },16)
      }
    },
    letterTouchEnd() {
      this.showStaus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/variables.styl'
.city-alphabet
  position absolute
  top 1.58rem
  bottom 0
  right 0
  width .4rem
  display flex
  flex-direction column
  justify-content center
  align-items center
  color $bgColor
</style>
