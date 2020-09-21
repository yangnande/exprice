<template>
	<view class="detail">
		<view class="detail-title">
			{{fromData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="fromData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{fromData.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{fromData.create_time}}</text>
					<text>{{fromData.browse_count}} 浏览</text>
					<text>{{fromData.thumbs_up_count}} 赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="fromData.content" :noData="noData"></u-parse>
			</view>
		</view>
		<!-- 工具栏 -->
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 指定当前组件的节点，ref只能绑定到自定义组件上，vue的原生组件不能使用 -->
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="close">取消</text>
					<text class="popup-header__item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" placeholder="请输入评论内容" fixed  maxlength="200"/>
					<view class="popup-count">
						{{commentsValue.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				fromData: {},
				noData: '<p style="text-align:center;color:#666;font-size: 14px;">详情加载中...</p>',
				commentsValue: '' // 输入评论的值
			}
		},
		onLoad (query) {
			this.fromData = JSON.parse(query.params)
			this.getDetail()
			// console.log(this.fromData,'this.fromData')
		},
		// 所有的页面渲染完毕时触发
		onReady() {
			
		},
		methods: {
			getDetail() {
				this.$api.get_detail({
				  article_id: this.fromData._id
				}).then(res => {
					const { data } = res
					this.fromData = data
					console.log(res,'res')
				})
			},
			// 打开评论窗口
			openComment() {
				this.$refs.popup.open()
			},
			// 关闭评论窗口
			close() {
				this.$refs.popup.close()
			},
			// 发布评论窗口
			submit() {
				console.log('发布')
				this.$refs.popup.close()
			}
				
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}
	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.detail-header__content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			padding-left: 10px;
			text {
				margin-right: 10px;
			}
			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}
			.detail-header__content-info {
				color: #999;
			}
		}
	}
	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding: 0 15px;
			font-size: 14px;
		}
	}
	.detail-bottom {
		width: 100%;
		height: 44px;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		border-top: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;
		.detail-bottom__input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px solid #ddd;
			border-radius: 5px;
			text {
				color: #999;
				font-size: 14px;
			}
		}
		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;
			.detail-bottom__icons-box {
				width: 44px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
			}
		}
	}
	.popup-wrap {
		background-color: #fff;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;
			.popup-header__item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content {
			width: 100%;
			padding: 0 15px 6px;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 200px;
			}
			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
