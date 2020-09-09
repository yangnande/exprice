<template>
	<swiper class="home-swiper" @change="indexChange" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item" >
			<list-item :listData="listData"></list-item>
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
				listData: []
			};
		},
		created() {
			this.getList()
		},
		components: {
			listItem
		},
		methods: {
			indexChange(e) {
				let { current } = e.detail
				this.$emit('change',current)
			},
			getList() {
				this.$api.getList().then(res => {
					// console.log(res)
					this.listData = res.data
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
