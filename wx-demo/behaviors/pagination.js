let paginationBehaviors = Behavior({
  data: {
    start: 0, // 页数
    count: 20, // 每页获取的数据量
    dataArray: [],
    total: 0,
    empty: false, // 空数据
    ending: false, // 到底部了
    noneResult: false,
    loading: false, // 解决操作过快，频繁加载数据问题
  },
  methods: {
    setMoreData(dataArray) {
      // // 参数dataArray为空，说明下拉加载没数据，已经到结尾了
      // if(dataArray == false) {
      //   this.data.ending = true
      //   // 参数dataArray为空，数据dataArray为空，说明没有数据
      //   if(this.data.dataArray == false) {
      //     this.setData({
      //       empty: true
      //     })
      //   }
      // }
      
      let temp = this.data.dataArray.concat(dataArray)
      // this.data.start += this.data.count
      this.setData({
        dataArray: temp
      })
      // return true
    },
    setTotal(total) {
      this.data.total = total
      if(total == 0) {
        this.setData({
          noneData: true
        })
      }
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    // 有没有更多
    hasMore() {
      if(this.data.dataArray.length>=this.data.total) {
        return false
      } else {
        return true
      }
    },
    initPagination() {
      // this.data.start = 0
      // this.data.ending = false
      this.total = null
      this.setData({
        dataArray:[],
        loading: false,
        noneData: false
      })
    },
    isLocked() {
      return this.data.loading ? true : false
    },
    locked () {
      this.setData({
        loading: true
      })
    },
    unLocked () {
      this.setData({
        loading: false
      })
    }
  }
})
export { paginationBehaviors }
