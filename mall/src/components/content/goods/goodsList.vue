<template>
  <div class="goods-list">
    <goods-list-item v-for="v in goods" :key="v" :goodsItem="v"></goods-list-item>
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
}
</style>
