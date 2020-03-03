<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <cart-list v-if="cartLength>0"></cart-list>
    <cart-bottom v-if="cartLength>0"></cart-bottom>
  </div>
</template>

<script>
import navBar from 'components/common/navBar/navBar';
import cartList from './childComps/cartList';
import cartBottom from './childComps/cartBottom';
import {mapGetters} from 'vuex'
export default {
  name: 'Cart',
  components: {
    navBar,
    cartList,
    cartBottom
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.cart-nav-bar {
  color: #fff;
  background-color: #ff8198;
  font-size: 46px;
}
</style>
