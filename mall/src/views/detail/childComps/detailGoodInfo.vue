<template>
<div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
  <div class="info-desc clear-fix">
    <div class="start">
    </div>
    <div class="desc">{{detailInfo.desc}}</div>
    <div class="end"></div>
  </div>
  <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
  <div class="info-list">
    <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
  </div>
</div>
</template>

<script>

export default {
  name: 'DetailGoodInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 0,
      imgContent: 0
    }
  },
  methods: {
    imgLoad() {
      // console.log(++this.count ,this.imgContent)
      // 第一种方法
      // if(++this.count == this.imgContent) {
      //   this.$emit('goodImg')
      // }
      // 第二种方法
      this.$emit('goodImg')
    }
  },
  watch: {
    detailInfo() {
      this.imgContent =this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 40px 0;
  border-bottom: 10px solid #f2f5f8;
  background-color: #fff;
  z-index: 22;
}

.info-desc {
  padding: 0 40px;
}

.info-desc .start, .info-desc .end {
  width: 180px;
  height: 6px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before, .info-desc .end::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 40px 0;
  font-size: 40px;
}

.info-key {
  margin: 40px 0 20px 30px;
  color: #333;
  font-size: 50px;
}

.info-list img {
  width: 100%;
}
</style>
