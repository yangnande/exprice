'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		user_id,
		article_id
	} = event
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id: article_id
	})
	.unwind('$comments') // 使用指定的数组字段中的每个元素，对文档进行拆分。拆分后，文档会从一个变为一个或多个，分别对应数组的每个元素。
	.project ({
		_id: 0,
		comments: 1
	})
	.replaceRoot({ // $comments 指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点。 

		newRoot:'$comments'
	})
	.end()

	//返回数据给客户端
	return {
		code: 200,
		msg:"数据请求成功",
		data: list.data
	}
};
