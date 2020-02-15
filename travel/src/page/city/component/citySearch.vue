<template>
  <div class="search">
    <div class="city-search">
      <input type="text" placeholder="输入城市名或拼音" v-model="keyword">
    </div>
    <div class="search-content" v-show="keyword" ref="search">
      <div>
        <p v-if="!noData">没有查到符合的数据</p>
        <p class="border-bottom" v-for="v in list" :key="v.id" v-else @click="handleCityChange(v.name)">
          <span v-if="noData">{{v.name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'citySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      timer: null,
      list: []
    }
  },
  mounted () {
    console.log(this.$refs.search)
    this.scroll = new Bscroll(this.$refs.search)
  },
  computed: {
    noData() {
      return this.list.length
    }
  },
  methods: {
     ...mapMutations(['changeCity']),
    handleCityChange(city) {
      this.changeCity(city)
      // this.$store.commit('changeCity',city)
      this.$router.push('/')
    }
  },
  watch: {
    keyword() {
      if(this.timer) {
        clearTimeout(this.timer)
      }
      setTimeout(()=>{
        var result = []
        for(var i in this.cities) {
          this.cities[i].forEach(v=>{
            if(v.spell.indexOf(this.keyword)>-1||v.name.indexOf(this.keyword)>-1) {
              result.push(v)
            }
          })
        }
        this.list = result
      },16)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/variables.styl'
.city-search
  line-height .72rem
  background $bgColor
  padding 0 .1rem
  input
    width 100%
    height .62rem
    border-radius .06rem
    text-align center
    color #666
    padding 0 .2rem
.search-content
  overflow hidden
  position absolute
  top 1.58rem
  bottom 0
  right 0
  left 0
  background #fff
  z-index 1
  p
    line-height: .62rem
    padding-left: .2rem
    background: #fff
    color: #666
</style>
