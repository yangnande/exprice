<template>
  <div class="detail-shop-info">
    <div class="info-title">
      <img :src="shop.shopLogo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="info-content">
      <div class="info-left">
        <div class="info sales">
          <p>{{shop.cSellS|getSellCount}}</p>
          <p>总销量</p>
        </div>
        <div class="info all-goods">
          <p>{{shop.goodCount}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="info-right">
        <p v-for="(item, index) in shop.score" :key="index">
          <span>{{item.name}}</span>
          <span class="score-low" :class="{'score-high':item.isBetter}">{{item.score}}</span>
          <span class="low" :class="{'high':item.isBetter}">{{item.isBetter ? '高':'低'}}</span>
        </p>
      </div>
    </div>
    <div class="enter-shop">进入店铺</div>
  </div>
</template>

<script>

export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    getSellCount(val) {
      let result = val
      if(val>10000) {
        result = (val/10000).toFixed(1) + '万'
      }
      return result
    }
  }
}
</script>

<style scoped>
.detail-shop-info {
  padding-bottom: 20px;
}
.info-title {
  margin: 80px 0 50px 30px;
  display: flex;
  align-items: center;
}
.info-title img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #ccc;
}
.info-title span {
  margin-left: 30px;
  font-size: 50px;
}
.info-content {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.info-left {
  display: flex;
  text-align: center;
}
.sales {
  margin: 0 40px 0 60px;
}
.sales p:nth-of-type(2), .all-goods p:nth-of-type(2){
  margin-top: 20px;
}
.all-goods {
  padding-right: 60px;
  border-right: 1px solid #ccc;
}
.info-right {
  flex: 1;
  margin: 0 30px 0 80px;
}
.info-right p {
  display: flex;
  justify-content: space-between;
}
.info-right p span {
  margin-bottom: 30px;
}
.score-low {
  color: #5ea732;
}
.score-high {
  color: #f13e3a;
}
.low {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}
.high {
  background-color: #f13e3a;
}
.enter-shop {
  width: 500px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #f2f5f8;
  border-radius: 20px;
  margin: 20px auto;
}
</style>
