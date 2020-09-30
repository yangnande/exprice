<template>
	<view>
		<view class="comments-content" v-for="item in commentList">
			<comment-box :comments="item"></comment-box>
		</view>
		<uni-load-more v-if="commentList.length===0 || commentList.length>5" iconType ="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList: [],
				article_id: '',
				page: 1,
				pageSize: 5,
				loading: 'loading'
			}
		},
		onLoad (query) {
			console.log(query)
			this.article_id = query.id
			this.getComments(this.article_id)
		},
		// 页面上拉触底事件的处理函数 
		onReachBottom() {
			if(this.loading === 'noMore') return
			console.log('页面上拉触底事件的处理函数')
			this.page++
			this.getComments(this.article_id)
		},
		methods: {
			// 请求评论内容
			getComments(article_id) {
				this.$api.get_commenta({
					article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					// console.log(res,'请求评论内容')
					const { data } = res
					if(data.length === 0) {
						this.loading = 'noMore'
						return 
					}
					// 对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentList))
					oldFormData.push(...data)
					this.commentList = oldFormData
				})
			}
		}
	}
</script>

<style lang="scss">
.comments-content {
	padding: 0 15px;
}
</style>
