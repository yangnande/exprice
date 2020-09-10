<template>
	<list-scroll class="list-scroll" @loadMore="loadMore">
		<list-card v-for="item in listData" :item="item"></list-card>
		<!--  v-if="listData.length>10" 主要解决数据不够一个页面，加载状态一直在的问题 -->
		<uni-load-more v-if="listData.length===0||listData.length>7" :status="load.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array,
				default() {
					return []
				}
			},
			load: {
				type: Object,
				default() {
					return {
						load: 'loading'
					}
				}
			}
		},
		methods: {
			loadMore() {
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
