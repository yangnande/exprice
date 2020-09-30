import store from  '../../store/index.js'
export default function $http (options) {
	const { url,data } = options
	const dataObj = {
		user_id: store.state.userinfo._id,
		...data
	}
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then(res=> {
			if(res.result.code == 200) {
				resolve(res.result)
			}else{
				reject(res.result)
			}
		})
	})
}