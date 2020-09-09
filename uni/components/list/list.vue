<template>
	<swiper class="home-swiper" @change="indexChange" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item" >
			<list-item :listData="listCatchData[index]"></list-item>
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
				listCatchData: {}
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
			indexChange(e) {
				let { current } = e.detail
				this.$emit('change',current)
				this.getList(current)
				// console.log(this.tab,current,this.tab[current])
			},
			getList(current) {
				this.$api.getList({name:this.tab[current].name}).then(res => {
					// console.log('请求数据', res.data)
					// this.listCatchData[current] = res.data
					// 懒加载 只有需要哪部分的数据才加载哪部分的数据
					this.$set(this.listCatchData,current,res.data)
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
