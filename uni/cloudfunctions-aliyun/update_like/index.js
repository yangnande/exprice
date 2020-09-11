'use strict';
const db = uniCloud.database()
const dbCmd = db.command // 数据库操作符 -对数组，字符串进行操作
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		user_id,
		article_id
	} = event
	// 获取指定的用户id的数据
	const userInfo = await db.collection('user').doc(user_id).get()
	// 获取当前用户喜欢的文章id
	const article_id_ids = userInfo.data[0].article_likes_ids
	let dbCmdfuns= null
	// 收藏和取消收藏功能-如果存在喜欢的文章id，则删除，否则就添加
	if(article_id_ids.includes(article_id)){
		dbCmdfuns = dbCmd.pull(article_id) // 删除-删除数组中的元素
	}else {
		dbCmdfuns = dbCmd.addToSet(article_id) // 添加-数组更新操作符。原子操作。给定一个或多个元素，除非数组中已存在该元素，否则添加进数组
	}
	// 给当前用户添加喜欢的文章
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdfuns 
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: userInfo
	}
};
