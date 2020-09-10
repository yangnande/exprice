<template>
	<swiper class="home-swiper" @change="indexChange" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item" >
			<list-item :listData="listCatchData[index]" :load="load[index]" @loadMore="loadMore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: {
			tab: {
				type: Array,
				default() {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default() {
					return 0
				}
			}
		},
		data() {
			return {
				listData: [],
				// js限制
				listCatchData: {},
				load: {},
				pageSize: 4
			};
		},
		watch:{
			tab(newval) {
				if(newval.length === 0) return
				this.getList(this.activeIndex)
			}
		},
		created() {
			// tab 还没有拿到
			// this.getList(0)
		},
		components: {
			listItem
		},
		methods: {
			loadMore() {
				if(this.load[this.activeIndex].loading === 'noMore') return
				console.log(this.load,'触发上拉')
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			indexChange(e) {
				let { current } = e.detail
				this.$emit('change',current)
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0 ) {
					this.getList(current)
				}
				
				// console.log(this.tab,current,this.tab[current])
			},
			getList(current) {
				// 初始化
				if(!this.load[current]){
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.getList({
					name:this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
					}).then(res => {
					// console.log('请求数据', res.data)
					const {data} = res
					// 没有数据loading的处理
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						// 底部出现没有更多数据时，给page赋值
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					// this.listCatchData[current] = res.data
					// 懒加载 只有需要哪部分的数据才加载哪部分的数据
					this.$set(this.listCatchData,current,oldList)
					// this.listData = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper,.swiper-item {
		height: 100%;
	}
</style>
