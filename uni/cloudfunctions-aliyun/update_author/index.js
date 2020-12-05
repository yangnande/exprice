'use strict';
// 获取数据库索引
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		user_id,
		author_id
	} = event
	const user = await db.collection('user').doc(user_id).get()
	const author_likes_ids = user.data[0].author_likes_ids
	let author_ids = null
	if(author_likes_ids.includes(author_id)) {
		author_ids = dbCmd.pull(author_id)  // 删除数组内容
	}else{
		author_ids = dbCmd.addToSet(author_id)  // 向数组中追加字段，如果数组有，不进行任何操作，没有则添加
	} 
	await db.collection('user').doc(user_id).update({
		author_likes_ids: author_ids
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: "更新成功"
	}
};