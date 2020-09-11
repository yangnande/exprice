// vuex 状态管理 是uni-app内置的插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		historyLists: []
	},
	mutations: {
		SET_HISTORY_LIST(state,history) {
			state.historyLists = history
		}
	},
	actions: {
		setHistory({state,commit},history) {
			let list = state.historyLists
			list.unshift(history)
			commit('SET_HISTORY_LIST',list)
		}
	}
})

export default store