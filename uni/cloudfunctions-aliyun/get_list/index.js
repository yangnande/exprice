'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {name} = event
	// 聚合：更精细化的去处理数据，求和，分组，指定那些字段
	const list = await db.collection('article')
	 // 获取数据库集合的聚合操作实例
	.aggregate()
	// 根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。 
	.match({
		classily: name
	})
	// 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。 
	// .project({
		
	// }) 
	.end() // 标志聚合操作定义完成，发起实际聚合操作 
	// const list = await db.collection('article').get()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
