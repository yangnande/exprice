<script>
	export default {
		onLaunch: function() {
			// 没有登录模拟，先写死用户id
			this.$api.get_user({
				user_id: "5f38030075b66a0001865812"
			}).then(res => {
				// console.log(res,'App onLaunch')
				const { data } = res
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
