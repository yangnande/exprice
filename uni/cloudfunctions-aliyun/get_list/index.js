'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const list = await db.collection('article').get()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
