<template>
	<view class="home">
		<nav-bar :isSearch="true" @input="change" v-model="value"></nav-bar>
		<view class="home-list">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyLists.length > 0" class="label-content">
					<view class="label-content__item" v-for="(item,index) in  historyLists"  :key="index" @click="openHistroy(item)">{{item.name}}</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<list-scroll v-else class="list-scroll" @loadMore="loadMore">
				<uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
				<view class="" v-if="searchList.length>0">
					<list-card v-for="item in searchList" :item="item" @cardClick="setHistory"></list-card>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				is_history: true,
				searchList: [],
				timer: null,
				value: '',
				loading: false
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		onLoad() {
			console.log(this.value,'this.value')
		},
		methods: {
			setHistory(val) {
				this.$store.dispatch('setHistory',{
					name: this.value
				})
			},
			openHistroy(item) {
				this.value = item.name
				this.getSearch(this.value)
			},
			change(val) {
				console.log(val)
				this.value = val
				let flag = false
				if(!val) {
					clearTimeout(this.timer)
					this.getSearch(val)
					return
				}
				
				if(!flag) {
					flag = true
					this.timer = setTimeout(()=>{
						this.getSearch(val)
					},1000)
				}
			},
			clear() {
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title: '清空完成'
				})
			},
			getSearch(val) {
				if(!val) {
					this.is_history = true
					this.searchList = []
					return
				}
				this.is_history = false
				this.loading = true
				this.$api.getSearch({
					value:val
				}).then(res => {
					this.loading = false
					console.log('请求数据', res)
					const {data} = res
					this.searchList = data
				}).catch(err=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
