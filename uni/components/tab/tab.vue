<template>
	<view class="tabs">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tabs-scroll-box">
				<view v-for="item in 10" class="tab-scroll-item">
					{{item}}内容
				</view>
			</view>
		</scroll-view>
		<view class="tabs-icon">
			<uni-icons type="icon-settings_light" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
			}
		}
		
	}
	.tabs-icon {
		width: 45px;
	}
	
</style>
