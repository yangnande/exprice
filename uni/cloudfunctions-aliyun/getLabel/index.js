'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let label = await db.collection('label').get()
	// console.log(label)
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
	//返回数据给客户端
	return event
};
