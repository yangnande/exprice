'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate // 聚合的操作夫
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
			user_id,
			value
		} = event
	
	const userInfo = await db.collection('user').doc(user_id || '').get()
	const article_likes_ids = userInfo.data[0] && userInfo.data[0].article_likes_ids
	// 聚合：更精细化的去处理数据，求和，分组，指定那些字段
	const list = await db.collection('article')
	 // 获取数据库集合的聚合操作实例
	.aggregate()
	// 追加字段
	.addFields({
		is_like: $.in(['$_id',article_likes_ids||'']) // $.in当前的某个数组里是否包含了某个字段 []数组里是否包含了某个值 第一个字段'$_id' 表示当前表的id 第二个字段我们要在哪个表里找这个id是否存在
	})
	// 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。 
	.project({
		content:false
	}) 
	.match({
		title: new RegExp(value)
	})
	.end() // 标志聚合操作定义完成，发起实际聚合操作 
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
