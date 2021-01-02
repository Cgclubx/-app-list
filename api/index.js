import request from '@/utils/request.js'
export default {
	// 分类接口
	getNavList(){
		return request({
			url:"/postclass"
		})
	},
	getCentList(id,ind){
		return request({
			url:`/postclass/${id}/post/${ind}`
		})
	}
}