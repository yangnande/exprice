<template>
  <div class="cart-list">
    <scroll class="cart-content" ref="scroll">
      <cart-list-item v-for="(v,i) in cartList" :key="i" :itemInfo="v"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import cartListItem from './cartListItem';
import scroll from 'components/common/scroll/scroll';

import {mapGetters} from 'vuex'
export default {
  name: 'CartList',
  components: {
    cartListItem,
    scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    console.log(this.cartList,'cartList')
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 120px);
}
.cart-content {
  height: 100%;
  overflow: hidden;
}
</style>
