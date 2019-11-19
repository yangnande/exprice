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
    ],
    info: {
      name: 'lele', age: 18
    }
  },
  mutations: {
    // increment 称为type, (state) {state.counter++} 称为回调函数
    increment (state) {
      state.counter++
    },
    decrement (state) {
      state.counter--
    },
    // mutations-传递参数(一个值) 接收方式一
    // incrementFive (state, count) {
    //   state.counter += count
    // },
    // mutations-传递参数(一个值) 接收方式二
    incrementFive (state, payload) {
      // console.log(payload) // {type: "incrementFive", count: 5}
      state.counter += payload.count
    },
    // mutations-传递参数(一个对象)
    addStu (state, stu) {
      state.students.push(stu)
    },
    updateInfo (state) {
      // state中响应式的属性：必须是state中定义的属性，未定义的属性不是响应式的属性
      // state.info.name = 'haha' // 是响应式的数据，所以页面可以更新
      // state.info.addredd = '洛杉矶' // 不是是响应式的数据，所以页面不能更新
      // 响应式增加数据Vue.set(数据对象，下标或key, 修改的值)
      // Vue.set(state.info, 'address', '洛杉矶')
      // 响应式删除数据Vue.delete(数据对象，下标或key)
      // Vue.delete(state.info, 'age')
      // 数组支持响应式方法 push();pop();shift();unshift();splice();sort();reverse();
      // state.students.shift()
      // 数组不支持响应式方法filter();concat();slice();
      state.students.filter(v => v.age > 15)
    }
  },
  action: {},
  getters: {
    // 获取年龄大于15的人
    more20Students (state) {
      return state.students.filter(v => v.age > 0)
    },
    // 如果要传入参数怎么办
    // more20Students (state) {
    //   return function (age) {
    //     return state.students.filter(v => v.age > age)
    //   }
    // },
    // 获取年龄大于15的人的长度
    more20StudentLength (state, getters) {
      return getters.more20Students.length
    }
  },
  module: {}
})
