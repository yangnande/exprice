
import {debounce} from './util'
export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = ()=> {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

import backUp from 'components/content/backUp/backUp'
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false // 回到顶部图标是否显示
    }
  },
  components: {
    backUp
  },
  methods: {
    // 点击回到顶部
    backClick () {
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}
