import request from '@/utils/request.js'
export default {
	// 获取话题数据接口
	getHotList(id){
		return request({
			url:"/hottopic"	
		})
	}
	
}