<template>
<div class="detail-base-info" v-if="Object.keys(goodInfo).length>0">
  <div class="title">{{goodInfo.title}}</div>
  <div class="price">
    <span class="newPrice">{{goodInfo.newPrice}}</span>
    <span class="oldPrice">{{goodInfo.oldPrice}}</span>
    <span class="discount">{{goodInfo.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{goodInfo.columns[0]}}</span>
    <span>{{goodInfo.columns[1]}}</span>
    <span>{{goodInfo.service[goodInfo.service.length-1].name}}</span>
  </div>
  <div class="info-service">
    <div v-for="index in goodInfo.service.length-1" :key="index" class="service-content">
     <img :src="goodInfo.service[index-1].icon" alt="">
     <span>{{goodInfo.service[index-1].name}}</span>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'DetailBaseInfo',
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-base-info {
  padding: 20px;
  border-bottom: 12px solid #e3e3e3;
}
.title {
  margin-top: 16px;
  font-weight: bold;
}
.price {
  margin: 26px 0;
}
.newPrice {
  color: #ff8198;
  font-size: 70px;
}
.oldPrice {
  font-size: 40px;
}
.discount {
  position: relative;
  top: -32px;
  padding: 12px;
  font-size: 36px;
  background: #ff8198;
  border-radius: 34px;
  line-height: 1;
  color: #fff;
}
.info-other {
  font-size: 42px;
  color: #ccc;
  margin-top: 16px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid rgba(100,100,100,.1);
}
.info-service {
  font-size: 44px;
  margin: 70px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.service-content {
  display: flex;
}
.service-content img{
  width: 40px;
  height: 40px;
}
</style>
