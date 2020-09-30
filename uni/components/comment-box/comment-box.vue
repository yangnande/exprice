<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header__logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header__info">
				<view v-if="!comments.is_reply" class="title">
					{{comments.author.author_name}}
				</view>
				<view v-else class="title">
					{{comments.author.author_name}}
					<text class="reply-text">回复</text>
					{{comments.to}}
				</view>
				<view class="">
					{{comments.create_time | formatTime}}
				</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{comments.comment_content}}</view>
			<view class="comments-info">
				<view class="comment-button" @click="commentsReply({comments:comments,is_reply:reply})">回复</view>
			</view>
			<view class="comments-reply" v-for="item in comments.replys" :key="item.comment_id">
				<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	// 当前页面引用当前组件=递归组件
	import commentsBox from '@/components/comment-box/comment-box.vue'
	import { parseTime } from '@/util/index.js'
	export default {
		name: "comments-box",
		components: {
			commentsBox
		},
		filters:{
			formatTime(time) {
				return parseTime(time)
			}
		},
		props: {
			comments: {
				type: Object,
				default() {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			commentsReply(comment) {
				// console.log(comment, '回复内容')
				// 为了区分是子回复(this.comments.is_reply=true)还是主回复
				if(comment.is_reply) {
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				console.log(comment)
				this.$emit('reply', comment)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;
		.comments-header {
			display: flex;
			.comments-header__logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.comments-header__info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text {
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
				
			}
		}
		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
			.comments-info {
				margin-top: 15px;
				display: flex;				.comment-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}
			.comments-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px solid #eee;
			}
		}
		
	}
</style>
