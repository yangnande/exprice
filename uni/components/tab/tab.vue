<template>
	<view class="tabs">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tabs-scroll-box">
				<view v-for="(item,index) in list" :key="index" class="tab-scroll-item" :class="{active: currentIndex === index}" @click="clickTab(item,index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tabs-icon" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default() {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default() {
					return 0
				}
			}
		},
		watch: {
			tabIndex(newVal) {
				this.currentIndex = newVal
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		created() {
			
		},
		methods: {
			clickTab(item,index) {
				this.currentIndex = index
				this.$emit('tab',{
					data: item,
					index: index
				})
			},
			open() {
				uni.navigateTo({
					url: '/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.tab-scroll {
			flex: 1;
			.tabs-scroll-box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				box-sizing: border-box;
			}
			.tab-scroll-item {
				flex-shrink: 0;
				font-size: 14px;
				color: #333;
				padding: 0 10px;
				&.active {
					color: $mk-base-color;
				}
			}
		}
		.tabs-icon {
			width: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			&::after {
				position: absolute;
				top: 6px;
				bottom: 4px;
				left: 0;
				content: '';
				width: 1px;
				background-color: #ddd;
			}
		}
	}
	
	
</style>
