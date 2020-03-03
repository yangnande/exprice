<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div class="item">
        <span class="icon service"></span>
        <p>客服</p>
      </div>
      <div class="item">
        <span class="icon shop"></span>
        <p>店铺</p>
      </div>
      <div class="item" @click="collectClick">
        <span class="icon collect" :class="{collect_active:isCollect}"></span>
        <p>收藏</p>
      </div>
    </div>
    <div class="right">
      <div class="common cart" @click="addCart">加入购物车</div>
      <div class="common purchase">购买</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailBottomBar',
  data() {
    return {
      isCollect: false
    }
  },
  methods: {
    collectClick() {
      this.isCollect = !this.isCollect
    },
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.detail-bottom-bar {
  position: relative;
  left:0;
  right:0;
  bottom: 0;
  height: 160px;
  background: #fff;
  display: flex;
}
.left,.right {
  flex:1;
  display: flex;
  align-items: center;
  text-align: center;
}
.item {
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
.icon {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}
.service{
  background: url('~assets/img/detail/service.png') no-repeat;
  background-size: 100% 100%;
}
.shop{
  background: url('~assets/img/detail/shop.png') no-repeat;
  background-size: 100% 100%;
}
.collect{
  background: url('~assets/img/detail/collect.png') no-repeat;
  background-size: 100% 100%;
}
.collect_active {
  background: url('~assets/img/detail/collect_active.png') no-repeat;
  background-size: 100% 100%;
}
.common {
  flex:1;
  height: 160px;
  line-height: 160px;
}
.cart {
  background: yellow;
}
.purchase {
  background: #ff8198;
}
</style>
