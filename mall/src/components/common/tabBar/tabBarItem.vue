<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'tab-bar-item',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff8198'
    }
  },
  computed: {
    isActive() {
      // this.$route:new Router this.$router 激活状态下的路由
      return this.$route.path.indexOf(this.path)!=-1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // replace 没有返回 push 有返回
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
.tab-bar-item {
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  flex: 1;
  font-size: 40px;
}
.tab-bar-item img {
  width: 50px;
  height: 50px;
  margin: 10px 0 10px;
}
</style>
