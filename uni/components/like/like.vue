<template>
	<view class="icon" @click.stop="likeTab">
		<uni-icons color="#f07373" size="20" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch:{
			item(newval) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods: {
			likeTab () {
				this.like = !this.like
				this.getUpdateLike()
			},
			getUpdateLike() {
				uni.showLoading()
				this.$api.updateLike({
					article_id: this.item._id
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:this.like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
					console.log(res)
				}).catch(err=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
