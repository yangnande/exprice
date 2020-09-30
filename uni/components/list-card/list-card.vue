<template>
	<view @click="open">
		<!-- 简单卡片 -->
		<view class="listCard" v-if="item.mode === 'base'">
			<view class="listCard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listCard-content">
				<view class="listCard-content-title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content__des-label">
						<view class="listCard-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="listCard-content__des-browse">
						{{item.browser_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="listCard mode-column" v-if="item.mode === 'image'">
			<view class="listCard-content">
				<view class="listCard-content-title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="listCard-image">
					<view v-if="i<=3" v-for="(v,i) in item.cover" :key="i" class="listCard-image__item">
						<image :src="v" mode="aspectFill"></image>
					</view>
					
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content__des-label">
						<view class="listCard-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="listCard-content__des-browse">
						{{item.browser_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 大图卡片 -->
		<view class="listCard mode-image" v-if="item.mode === 'column'">
			<view class="listCard-content">
				<view class="listCard-image">
						<image :src="item.cover[0]" mode="aspectFill"></image>
				</view>
				<view class="listCard-content-title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content__des-label">
						<view class="listCard-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="listCard-content__des-browse">
						{{item.browser_count}}浏览
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		mounted() {
			// console.log(this.item,'item')
		},
		methods: {
			open() {
				// console.log('详情')
				const item = this.item
				this.$emit('cardClick',item)
				const params = {
					_id: item._id,
					title: item.title,
					author: item.author,
					create_time: item.create_time,
					thumbs_up_count: item.thumbs_up_count,
					browse_count: item.browse_count
				}
				// console.log(item,'item')
				// 传参注意长度
				uni.navigateTo({
					url: "/pages/home-detail/home-detail?params=" + JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
	.listCard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;
		.listCard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
		.listCard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;

			.listCard-content-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				margin-top: 6px;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				
			}

			.listCard-content-des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				.listCard-content__des-label {
					display: flex;

					.listCard-content__des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 15px;
						color: $mk-base-color;
						border: 1px $mk-base-color solid;
					}
				}

				.listCard-content__des-browse {
					color: #999;
					line-height: 1.5;
				}
			}
		}
		
		&.mode-column {
			.listCard-content {
				width: 100%;
				padding-left: 0;
			}

			.listCard-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;

				.listCard-image__item {
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;

					&:first-child {
						margin-left: 0;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.listCard-content-des {
				margin-top: 10px;
			}
		}
		&.mode-image {
			flex-direction: column;

			.listCard-image {
				width: 100%;
				height: 100px;
			}

			.listCard-content {
				padding-left: 0;
				margin-top: 10px;

				.listCard-content-des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
