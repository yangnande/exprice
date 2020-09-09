<template>
	<list-scroll class="list-scroll">
		<list-card v-for="item in listData" :item="item"></list-card>
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
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
