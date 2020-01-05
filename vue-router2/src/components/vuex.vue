<template>
  <div>
    <p>{{$store.state.counter}}</p>
    <button @click="add">+</button>
    <button @click="decrese">-</button>
    <p> mutations-传递参数(一个值)</p>
    <button @click="addFive(5)">+5</button>
    <button @click="addFive(10)">+10</button>
    <h2>子页面----getter</h2>
    <p>{{$store.getters.more20Students}}</p>
    <!-- <p>{{$store.getters.more20Students(15)}}</p> -->
    <p>{{$store.getters.more20StudentLength}}</p>
    <p>mutations-传递参数(一个对象)</p>
    <button @click="addStudents">添加学生信息</button>
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
    },
    addFive (count) {
      // commit的参数（type,传递的值）提交方式一
      // this.$store.commit('incrementFive', count)
      // commit的参数（type,传递的值）提交方式二
      this.$store.commit({
        type: 'incrementFive',
        count
      })
    },
    addStudents () {
      let students = {age: 18, name: 'lilei'}
      this.$store.commit('addStu', students)
    }
  }
}
</script>

<style>

</style>
