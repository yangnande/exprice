<template>
  <div class="child">
    <!-- 认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。 -->
    <!-- <div>我是儿子，父亲对我说： {{give}}</div> -->
    <div>我是儿子，父亲对我说： {{value}}</div>
    <a href="javascript:;" rel="external nofollow" @click="returnBackFn">回应</a>
  </div>
</template>
<script>
export default {
  // props: {
  //   give: String
  // },
  props: {
    value: String
  },
  // model: {
  //   prop: 'give',
  //   event: 'returnBack'
  // },
  methods: {
    returnBackFn () {
      this.$emit('input', '还你200块')
    }
  }
}
</script>
