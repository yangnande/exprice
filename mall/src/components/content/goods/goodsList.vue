<template>
  <div class="goods-list">
    <goods-list-item v-for="(v,i) in goods" :key="i" :goodsItem="v"></goods-list-item>
  </div>
</template>

<script>
import goodsListItem from './goodsListItem'
export default {
  name: 'goods-list',
  props: {
    goods: {
      type: Array,
      default: []
    }
  },
  components: {
    goodsListItem
  }
}
</script>

<style>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 40px;
}
</style>
