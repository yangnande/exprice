<template>
	<view class="content">
		<nav-bar class="nav-bar"></nav-bar>
		<tab :list="list" v-if="list.length>0"></tab>
	</view>
</template>

<script>
	// 支持easycom组件模式  这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
	// import navBar from '@/components/nav-bar/nav-bar.vue'
	// import tab from '@/components/tab/tab.vue'
	export default {
		data() {
			return {
				list: []
			}
		},
		// components: {
		// 	tab
		// },
		onShow() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				let _this = this
				// uniCloud.callFunction({
				// 	name: 'getLabel',
				// 	success(res) {
				// 		console.log(res)
				// 		_this.list = res.result.data
				// 	}
				// })
				uniCloud.callFunction({
					name: 'getLabel'
				}).then(res=> {
					_this.list = res.result.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		margin-top: 45px;
	}
</style>
