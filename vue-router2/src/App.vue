<template>
  <div id="app">
    <h2>action---------</h2>
    <button @click="addstu">添加学生</button>
    <h2>父页面----state</h2>
    {{$store.state.counter}}
    <h2>父页面----getter</h2>
    <p>{{$store.getters.more20Students}}</p>
    <!-- <p>{{$store.getters.more20Students(15)}}</p> -->
    <p>{{$store.getters.more20StudentLength}}</p>
    <!-- state，对象修改响应式 -->
    <p>state，对象修改响应式对象修改响应式</p>
    <p>{{$store.state.info}}</p>
    <button @click="addInfo">增加信息</button>
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
  },
  methods: {
    addInfo () {
      this.$store.commit('updateInfo')
    },
    addstu () {
      this.$store.dispatch('addStudents')
    }
  }
}
</script>

<style>

</style>
