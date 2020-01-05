<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(v,i) in titles" :key="v" @click="tabClick(i)">
      <span :class="{active: i==currentIndex}">{{v}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tab-control',
  props: {
    titles: {
      type: Array,
      defalut: []
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabClick (i) {
      this.currentIndex = i
      this.$emit('tabClick', i)
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 30px;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  border-bottom: 3px solid #ff8198;
  color: #ff8198;
}
</style>
