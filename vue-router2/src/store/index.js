import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    students: [
      {age: 12, name: 'why'},
      {age: 15, name: 'lele'},
      {age: 16, name: 'haha'},
      {age: 18, name: 'lala'}
    ]
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    decrement (state) {
      state.counter--
    }
  },
  action: {},
  getters: {
    // 获取年龄大于15的人
    // more20Students (state) {
    //   return state.students.filter(v => v.age > 15)
    // },
    // 如果要传入参数怎么办
    more20Students (state) {
      return function (age) {
        return state.students.filter(v => v.age > age)
      }
    },
    // 获取年龄大于15的人的长度
    more20StudentLength (state, getters) {
      return getters.more20Students.length
    }
  },
  module: {}
})
