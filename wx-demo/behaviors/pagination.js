let paginationBehaviors = Behavior({
  data: {
    start: 0, // 页数
    count: 20, // 每页获取的数据量
    dataArray: [],
    empty: false, // 空数据
    ending: false // 到底部了
  },
  methods: {
    setMoreData(dataArray) {
      // 参数dataArray为空，说明下拉加载没数据，已经到结尾了
      if(dataArray == false) {
        this.data.ending = true
        // 参数dataArray为空，数据dataArray为空，说明没有数据
        if(this.data.dataArray == false) {
          this.setData({
            empty: true
          })
        }
      }
      
      let temp = this.data.dataArray.concat(res.books)
      this.data.start += this.data.count
      this.setData({
        dataArray: temp
      })
      return true
    },
    // 有没有更多
    hasMore() {
      return !this.data.ending
    },
    getCurrentStart() {
      return this.data.start
    },
    initPagination() {
      this.data.start = 0
      this.data.ending = false
      this.data.dataArray = []
      this.setData({
        dataArray:[]
      })
    }
  }
})
export { paginationBehaviors }
