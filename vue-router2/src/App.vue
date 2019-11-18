<template>
  <div id="app">
    <h2>父页面----state</h2>
    {{$store.state.counter}}
    <h2>父页面----getter</h2>
    <!-- <p>{{$store.getters.more20Students}}</p> -->
    <p>{{$store.getters.more20Students(15)}}</p>
    <p>{{$store.getters.more20StudentLength}}</p>
    <h2>子页面----</h2>
    <vuex/>
  </div>
</template>

<script>
import vuex from './components/vuex'
export default {
  name: 'App',
  components: {
    vuex
  }
}
</script>

<style>

</style>
