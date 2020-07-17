import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    redInfo: { // 企业微信红包剩余次数和活动周期
      phoneNumber: '',
      remainingTimes: '2',
      actityCycle: '周'
    }
  },
  mutations: {
    setRedInfo (state, data) {
      state.redInfo.remainingTimes = data.remainingTimes
      state.redInfo.actityCycle = data.actityCycle
    }
  }
})

export default store
