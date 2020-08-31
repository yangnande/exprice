<template>
	<view class="content">
		<nav-bar class="nav-bar"></nav-bar>
		<tab></tab>
	</view>
</template>

<script>
	// 支持easycom组件模式  这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
	// import navBar from '@/components/nav-bar/nav-bar.vue'
	// import tab from '@/components/tab/tab.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		// components: {
		// 	tab
		// },
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.list {
		margin-top: 45px;
	}
</style>
