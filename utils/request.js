// 导入 uni-request 模块
import uniRequest from 'uni-request';

let url = "";
if(process.env.NODE_ENV==="development"){
	url="/api"
}else{
	url="/pro"
}
//#ifdef H5
   uniRequest.defaults.baseURL= "/api"
// #endif
// 公共接口
// #ifndef H5
uniRequest.defaults.baseURL='http://ceshi2.dishait.cn/api/v1';
// #endif

// 设置token请求头信息
let token = uni.getStorageSync('token');
uniRequest.defaults.headers.common['token'] = token;

// 请求头配置
// uniRequest.defaults.headers.common['Authorization' ] = AUTH_TOKEN;
// uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 加载提示
function showLoading(){
		uni.showLoading({
			title: "加载中",
		})
}
// 错误提示
function showError(){
		uni.showLoading({
			title: "网络出错了",
			icon:"none"
		})
}
// 请求拦截
uniRequest.interceptors.request.use(
	request => {
		// 调用请求时开启loading加载
	  // showLoading()
		//配置基本信息	
		return request;
	},
	err => {
		// 调用错误提示/
        showError()
		// 返回错误信息
		return Promise.reject(err);
	});

// 响应拦截
uniRequest.interceptors.response.use(function(response) {
	// 隐藏Loading加载提示
	// uni.hideLoading()
	// console.log('返回进入拦截成功')
	return Promise.resolve(response);
}, function(error) {
	// 调用错误提示
      showError()
	// console.log('返回进入拦截失败')
	return Promise.reject(error);
});
export default uniRequest
