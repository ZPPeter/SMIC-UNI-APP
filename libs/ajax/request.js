//var Fly = require("flyio/dist/npm/wx")
var Fly = require('./wx.umd.min.js');
var fly = new Fly;
//var log = console.log;
//log("success"); //不会显示行号等信息
import config from '@/libs/common/config.js'

// 配置请求根域名
fly.config.baseURL = config.apiDomain;
fly.config.timeout = 15000; // 超时时间，为0时则无超时限制 

// 配置请求拦截器
fly.interceptors.request.use((request) => {
	console.log('全局请求拦截');
	//console.log(request.url.includes(config.Authenticate));
	uni.showLoading();
	if (!!uni.getStorageSync('token')) {
		request.headers['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
	}
	//else if(!request.url.includes(config.Authenticate)){ // 非登录页面必须先登录
	//}	
	return request;
})

// 配置响应拦截器
fly.interceptors.response.use(
	(response) => {
		//console.log('全局响应拦截：' + JSON.stringify(response.data));
		console.log('全局响应拦截');
		uni.hideLoading();
		return response.data;
	},
	(err) => {
		uni.hideLoading();
		if (err.status === 500) {
			if (err.response.data.error.details === 'Invalid user name or password') {
				uni.showToast({
					icon: 'none',
					title: '用户账号或密码不正确'
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '登录失败，服务器错误'
				});
			}
		} else if (err.status === 401) { // 未登录
			uni.reLaunch({
				url: '/pages/login/login'
			});
		} else if (err.status <= 1){ // 0 网络错误 1 请求超时
			uni.showToast({
				icon: 'none',
				title: '无法访问服务器'
			});	
		} else {
			//console.log(err.message)
			console.log('网络错误：' + JSON.stringify(err))			
				uni.showToast({
					icon: 'none',
					title: '未知服务器错误'
				});
		}
		return Promise.resolve(err); //  "网络请求：ERROR！")
	}
)

// 登录
const Login = async (data) => {
	//return fly.post('/api/TokenAuth/Authenticate', data)
	//let res = await fly.post(config.Authenticate, data).then(function() { 
	// post 返回信息没用：{"_c":[],"_s":0,"_d":false,"_h":0,"_n":false} 
	let rep = await fly.post(config.Authenticate, data).then(function(res) {
		//console.log(res);
		if (res.result && res.result.accessToken) {
			uni.setStorageSync('token', res.result.accessToken)
			return 'OK';
		}
		return '';
	})
	//console.log('Login:'+rep);
	return rep; // return '登录成功'; 返回到此处
}

const GetUsers = async () => {
	let rep = await fly.get(config.GetUsers).then(function(res) {
		//console.log(res.result);
		return res.result;
	})
	//console.log('GetUsers:' + rep);
	return rep; // return '登录成功'; 返回到此处
}

export default {
	Login,
	GetUsers
}