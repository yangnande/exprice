'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command // 查询条件的标识符
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		user_id, // 用户id
		article_id, // 文章id
		content, // 评论内容
		comment_id ='' // 评论id
		
	} = event
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	// 获取当前文章信息
	const article = await db.collection('article').doc(article_id).get()
	
	// 获取文章下的所有评论
	const comments = article.data[0].comments
	let commentObj = {
		comment_id: getID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		replys: []
	}
	// 评论文章
	if(comment_id == '') {
		commentObj.replys = []
		commentObj = dbCmd.unshift([commentObj])
	} else {
		// 回复对文章的评论
		// 获取评论的索引
		let commentIndex = comments.findIndex(item=>item.comment_id === comment_id)
		// 获取作者信息
		let commentAuthor = comments.find(item=>item.comment_id === comment_id)
		commentAuthor = commentAuthor.author.author_name
		// to 给谁回复
		commentObj.to = commentAuthor
		// 更新回复信息
		commentObj = {
			[commentIndex]: dbCmd.unshift(commentAuthor)
		}
	}
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: "数据更新成功"
	}
};


function getID(length) {
	return Number(Math.random().toString().substr(3,length)).toString(36)
}