import request from '@/utils/request.js'
export default {
	// 获取评论接口
	getCommentList(id){
		return request({
			url:`/post/${id}/comment`	
		})
	},
	// 详细接口
	getCentList(id){
		return request({
			url:`/post/${id}`	
		})
	},
	// 评论接口
	setComment(data,fid,post_id){
		return request({
			url:"/post/comment",
			method:"post",
			data:{
				data,
				fid,
				post_id
			}
		})
	},
	
}