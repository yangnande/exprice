<template>
  <div class="recommond">
    <div class="recommond-item" v-for="(v,i) in recommonds" :key="i">
      <a href="v.link">
        <img :src="v.image" alt="">
        <p class="title">{{v.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'recommond',
  props: {
    recommonds: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
.recommond {
  margin-top: 10px;
  display: flex;
  font-size: 36px;
  text-align: center;
  border-bottom: 10px solid #eee;
}
.recommond-item {
  flex: 1;
}
.recommond-item img {
  width: 140px;
  height: 140px;
  margin-bottom: 10px;
}
.recommond-item .title {
  padding: 0;
  margin: 0;
}
a:-webkit-any-link {
  color: black;
  cursor: pointer;
  text-decoration: unset;
}
</style>
