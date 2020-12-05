<template>
	<view>
		<view class="feedback-title">意见反馈</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">反馈图片</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(v,i) in imageList" :key="i">
				<view class="close-icon" @click="del(i)">
					<uni-icons type="close" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="v.url" mode="aspectFill"></image>
				</view>
			</view>
			<view class="feedback-image-item" @click="addImage" v-if="imageList.length<5">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: []
			}
		},
		methods: {
			addImage() {
				const count = 5 - this.imageList.length
				uni.chooseImage({
					count: count,
					success: res => {
						const tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((v,i) => {
							if(i < count) {
								this.imageList.push({
									url: v
								})
							}
							
						})
					}
				})
			},
			del(i) {
				this.imageList.splice(i,1)
			},
			async submit() {
				let imagesPath = []
				uni.showLoading()
				// 循环的目的 上传图片api每次只能上传一张图片 
				for(let i = 0;i<this.imageList.length;i++) {
					let filePath = this.imageList[i].url
					filePath = await this.uploadFiles(filePath)
					imagesPath.push(filePath)
				}
				this.updateFeedback({
					content: this.content,
					feedbackImages: imagesPath
				})
			},
			async uploadFiles(filePath) {
				const result = await uniCloud.uploadFile({
					cloudPath: filePath,
					filePath: filePath
				})
				return result.fileID
			},
			updateFeedback({content,feedbackImages}) {
				this.$api.update_feedback({
					content,
					feedbackImages
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功',
						icon: 'none'
					})
					uni.switchTab({
						url: "/pages/my/my"
					})
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交失败',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin: 15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}
	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #eee;
		.feedback-textarea {
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}
	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item {
			width: 33.3%;
			position: relative;
			height: 0;
			padding-top: 33.3%;
			box-sizing: border-box;
			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}
			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				left: 5px;
				bottom: 5px;
				right: 5px;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback-button {
		margin: 0 15px;
		background-color: $mk-base-color;
	}
</style>
