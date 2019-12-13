<template>
  <div class="goods-list-item">
    <img src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span>{{goodsItem.price}}</span>
      <span>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
     itemList: {
      type: Array,
      default: []
    }
  },
  mounted () {
    this.$bus.$emit('itemImageLoad')
  }
}
</script>

<style>
.goods-list-item {
  width: 48%;

}
.goods-list-item img {
 /* width: 100%; */
    border-radius: 5px;
}
</style>
