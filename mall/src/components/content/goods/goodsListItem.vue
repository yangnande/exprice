<template>
  <div class="goods-list-item" @click="goodJump">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p class="ellipse">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
     goodsItem: {
      type: Object,
      default: []
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    goodJump() {
      this.$router.push('/detail/'+this.goodsItem.iid)
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     iid: this.goodsItem.iid
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  height: 740px;
  border-radius: 5px;
}
.goods-info {
  text-align: center;
  margin: 20px;
}
.goods-info p {
  margin-bottom: 10px;
}
.goods-info .price {
  color: #ff8198;
}
.collect {
  position: relative;
  padding-left: 46px;
}
.collect::before {
  position: absolute;
  top:-2px;
  left:0;
  content: "";
  width: 46px;
  height: 46px;
  background: url("~assets/img/common/collect.svg") no-repeat;
  background-size: 46px 46px;
}
</style>
