<template>
	<view class="home" >
		<nav-bar class="nav-bar"></nav-bar>
		<tab :list="list" :tabIndex="tabIndex" v-if="list.length>0" @tab="tab"></tab>
		<view class="list">
			<list :tab="list" :activeIndex="activeIndex"  @change="indexChange"></list>
		</view>
	</view>
</template>

<script>
	// 支持easycom组件模式  这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
	// import navBar from '@/components/nav-bar/nav-bar.vue'
	// import tab from '@/components/tab/tab.vue'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				list: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		computed: {
			...mapState(['userinfo'])
		},
		watch: {
			userinfo(newval) {
				this.getLabel()
			}
		},
		// components: {
		// 	tab
		// },
		onLoad() {
			uni.$on('labelChange',()=>{
				// console.log('-----')
				// 解决key重复的问题
				this.list = []
				this.tabIndex = 0,
				this.activeIndex = 0
				this.getLabel()
			})
			
		},
		methods: {
			getLabel() {
				// let _this = this
				// uniCloud.callFunction({
				// 	name: 'getLabel',
				// 	success(res) {
				// 		console.log(res)
				// 		_this.list = res.result.data
				// 	}
				// })
				// uniCloud.callFunction({
				// 	name: 'getLabel'
				// }).then(res=> {
				// 	_this.list = res.result.data
				// })
				this.$api.getLabel().then(res => {
					res.data.unshift({
						name:'全部'
					})
					console.log(res,'首页')
					this.list = res.data
				})
				
			},
			tab({data,index}) {
				// console.log(data,index,'----')
				this.activeIndex = index
			},
			indexChange(val) {
				// console.log(val)
				this.tabIndex = val
				this.activeIndex = val
			}
		}
	}
</script>

<style lang="scss">
	// .list {
	// 	margin-top: 45px;
	// }
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}
	.list {
		height: 100%;
	}
</style>
