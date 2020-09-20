'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// let label = await db.collection('label').get()
	const {
		user_id,
		type
	} = event
	let matchObj = {}
	if(type !== 'all') {
		matchObj = {
			current: true
		}
	}
	// 获取用户表
	let userInfo = await db.collection('user').doc(user_id).get()
	userInfo = userInfo.data[0]
	let label = await db.collection('label')
	.aggregate()
	.addFields({ 
		current: $.in(['$_id', $.ifNull([userInfo.label_ids, []])])
	})
	.match(matchObj)
	.end()
	// console.log(label)
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
	//返回数据给客户端
	return event
};
