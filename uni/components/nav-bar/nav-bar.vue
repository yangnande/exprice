<template>
	<view class="nav-bar">
		<view class="nav-fixed">
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="content" :style="{height: navBarHeight + 'px',width: windowWidth + 'px'}">
				<view class="search">
					<view class="icon">
						<text  class="iconfont icon-sousuo"></text>
					</view>
					<view class="text">uni-app</view>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20, // 状态栏高度
				navBarHeight: 45, // 导航条高度
				windowWidth: 375 // 导航条左侧宽度
			}
		},
		created() {
			// 获取手机基础信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			console.log(info,'状态栏高度')
			// h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊位置
			const menuButton = uni.getMenuButtonBoundingClientRect()
			console.log(menuButton,'获取胶囊位置')
			// 导航栏的高度=(胶囊底部-状态栏的高度)+(胶囊顶部高度-状态栏的高度)
			this.navBarHeight = (menuButton.bottom - this.statusBarHeight) + (menuButton.top - this.statusBarHeight)
			console.log(this.navBarHeight,'this.navBarHeight')
			this.windowWidth = menuButton.left
			// #endif
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.nav-bar {
		.nav-fixed {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			background-color: $mk-base-color;
			.content {
				width: 100%;
				height: 45px;
				display: flex;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;
				.search {
					width: 100%;
					height: 30px;
					padding: 0 10px;
					box-sizing: border-box;
					border-radius: 30px;
					display: flex;
					align-items: center;
					background-color: $uni-text-color-inverse;
					.icon {
						margin-right: 6px;
					}
					.text {
						font-size: 12px;
						color: #999;
					}
				}
			}
			
		}
		
	}
</style>
