<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backJump">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-center">
        <div v-for="(v,i) in titles" :key="i" class="nav-center-item" :class="{active: i==currentIndex}" @click="titleClick(i)">{{v}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import navBar from 'components/common/navBar/navBar'
export default {
  name: 'DetailNavBar',
  components: {
    navBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','详情'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('navClick',index)
    },
    backJump() {
      this.$router.back()
      // this.$router.go(-1)
      // this.$router.forward()
    }
  }
}
</script>

<style scoped>
.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 22;
}
.back img{
  margin-top: 26px;
}
.nav-center {
  display: flex;
  font-size: 44px;
}
.nav-center-item {
  flex: 1
}
.active {
  color:#ff8198;
}
</style>
