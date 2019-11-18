<template>
  <div>
    <p>{{$store.state.counter}}</p>
    <button @click="add">+</button>
    <button @click="decrese">-</button>
    <h2>子页面----getter</h2>
    <!-- <p>{{$store.getters.more20Students}}</p> -->
    <p>{{$store.getters.more20Students(15)}}</p>
    <p>{{$store.getters.more20StudentLength}}</p>
  </div>
</template>

<script>
export default {
  methods: {
    add () {
      this.$store.commit('increment')
    },
    decrese () {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style>

</style>
