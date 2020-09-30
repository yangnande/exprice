<template>
	<view class="follow">
		<!-- 导航切换 -->
		<view class="follow-tab">
			<view class="follow-tab_box">
				<view class="follow-tab_item" :class="{active: activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab_item" :class="{active: activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="list.length===0 && !articleShow"  status="loading" iconType="snow"></uni-load-more>
						<list-card v-for="item in list" :key="item._id" :item="item" types="follow"></list-card>
						<view class="no-data" v-if="articleShow">
							没有数据
						</view>
					</list-scroll>
				</swiper-item>
				<swiper-item class="swiper_item">
					<view class="swiper-item">
						<list-scroll>
							<list-author v-for="item in authorList" :key="item.id" :item="item"></list-author>
						</list-scroll>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				authorList: [],
				articleShow: false
			}
		},
		onLoad() {
			this.getFollow()
			this.getAuthor()
			// 自定义事件只能在打开的页面触发
			uni.$on('update_article', () => {
				this.getFollow()
			})
			uni.$on('update_author', () => {
				this.getAuthor()
			})
		},
		methods: {
			tab(val) {
				this.activeIndex = val
			},
			change(e) {
				this.activeIndex = e.detail.current
			},
			getFollow() {
				this.$api.get_follow().then(res => {
					// console.log(res)
					const { data } = res
					this.list = data
					this.articleShow = this.list.length === 0? true :false
				}) 
			},
			getAuthor() {
				this.$api.get_author().then(res => {
					// console.log(res)
					const { data } = res
					this.authorList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border: 1px solid #f5f5f5;
			.follow-tab_box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid $mk-base-color;
				.follow-tab_item {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					color: #666;
					font-size: 14px;
					&:first-child {
						border-right: 1px solid $mk-base-color;
					}
					&.active {
						color: $mk-base-color;
					}
				}
			}
			
		}
		.follow-list {
			flex: 1;
			.follow-list__swiper {
				height: 100%;
				.swiper_item {
					height: 100%;
				}
			}
		}
	}
	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
