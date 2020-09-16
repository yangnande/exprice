<template>
  <div>
    <p>我是父亲, 对儿子说： {{sthGiveChild}}</p>
    <!-- <Child @returnBack="turnBack" :give="sthGiveChild"></Child> -->
    <Child v-model="sthGiveChild"></Child>
  </div>
</template>
<script>
import Child from './components/Child'
export default {
  data () {
    return {
      sthGiveChild: '给你100块'
    }
  },
  components: {
    Child
  },
  methods: {
    // turnBack (val) {
    //   this.sthGiveChild = val
    // }
  }
}
</script>
