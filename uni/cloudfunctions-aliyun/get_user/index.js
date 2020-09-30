'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	
	const {
		user_id = ''
	} = event
	if(!user_id) {
		return {
			code: 201,
			msg: '获取用户信息失败'
		}
	}
	let user = await db.collection('user').doc(user_id).get()
	return {
		code: 200,
		msg: '数据请求成功',
		data: user.data[0]
	}
};
