<template>
  <div>
    <detail-header></detail-header>
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <div class="content">
      <detail-list :list="detailList"></detail-list>
    </div>
  </div>
</template>

<script>
import detailHeader from './component/detailHeader'
import detailBanner from './component/detailBanner'
import detailList from './component/detailList'
import axios from 'axios'
export default {
  name: 'detail',
  data () {
    return {
      detailList: [],
      sightName: '',
      bannerImg: '',
      gallaryImgs: []
    }
  },
  components: {
    detailBanner,
    detailHeader,
    detailList
  },
  methods: {
    getDetailList() {
      axios.get('/api/detail.json',{
        params: {
          id: this.$route.params.id
        }
      }).then(this.getDetailListSucc)
    },
    getDetailListSucc(res) {
      var res = res.data
      if(res.ret&&res.data) {
        var data = res.data
        this.detailList = data.categoryList
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
      }
    }
  },
  mounted () {
    this.getDetailList()
  }
}
</script>

<style lang="stylus" scoped>
.content {
  height 50rem
}
</style>
