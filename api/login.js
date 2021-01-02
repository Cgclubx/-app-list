import request from '@/utils/request.js';
export default {
	// 手机密码登陆接口
	login(username,password){
		return request({
			url:"/user/login",
			method:"post",
			data:{
				username,
				password
			}
		})
	},
	// 获取验证码
	getCodeList(phone){
		return request({
			url:"/user/sendcode",
			method:"post",
			data:{
				phone
			}
		})
	},
	// 验证码登陆接口
	phonelogin(phone,code){
		return request({
			url:"/user/phonelogin",
			method:"post",
			data:{
				phone,
				code
			}
		})
	},
	// 获取counts数据
	getCounts(id){
		return request({
			url:`/user/getcounts/${id}`
		})
	},
	// 搜索
	searchData(keyword,page){
		return request({
			url:"/search/post",
			method:"post",
			data:{
				keyword,
				page
			}
		})
	},
	logout(token){
		return request({
			url:"/user/logout",
			method:"post",
			data:{
				token
			}
		})
	}
}