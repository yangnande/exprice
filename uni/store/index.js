// vuex 状态管理 是uni-app内置的插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		historyLists: uni.getStorageSync('__history') || []
	},
	mutations: {
		SET_HISTORY_LIST(state,history) {
			state.historyLists = history
		},
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	actions: {
		setHistory({state,commit},history) {
			let list = state.historyLists
			list.unshift(history)
			commit('SET_HISTORY_LIST',list)
			uni.setStorageSync('__history', list)
		},
		clearHistory({commit}) {
			commit('CLEAR_HISTORY')
			uni.removeStorage('__history')
			// uni.setStorageSync('__history', [])
		}
	}
})

export default store