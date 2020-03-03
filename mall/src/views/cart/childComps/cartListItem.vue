<template>
  <div class="cart-list-item">
    <input type="checkbox" class="check-box" v-model="itemInfo.checked">
    <img :src="itemInfo.img" alt="">
    <div class="right-content">
      <p class="title ellipse">{{itemInfo.title}}</p>
      <p class="desc ellipse">{{itemInfo.desc}}</p>
      <div class="price-info">
        <span>{{itemInfo.realPrice}}</span>
        <span>x{{itemInfo.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CartListItem',
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    // itemInfo: {
    //   handler: function (newVal, oldVal) {
    //     // this.$store.commit('getNewCardList', newVal)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style scoped>
.cart-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
}
.cart-list-item img {
  width: 280px;
  height: 280px;
  margin-left: 10px;
}
.right-content {
  height: 300px;
  margin-left: 10px;
  padding-top: 20px;
  flex: 1;
  min-width: 0;
}

.right-content .desc {
  font-size: 40px;
  margin: 60px 0 76px;
}
.price-info {
  display: flex;
  justify-content: space-between;
}
input[type="checkbox"] {
  width: 60px;
  height: 60px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 2px solid #aaa;
  border-radius: 50%;
  outline: none;
}
input[type="checkbox"]:checked {
  background: url("~assets/img/cart/selected.png")
    no-repeat center;
  background-size: 100% 100%;
  border: 2px solid #ff8198;
}
</style>
