//import User from '../entities/user';
import config from '@/libs/common/config.js';
import Vue from 'vue';
import fly from '@/libs/ajax/request.js';

class AppModule {
	constructor() {
		this.namespaced = true;
		this.state = {
		};
		this.actions = {
			// 登录
			async Login(state, payload) {
				//console.log(payload.data)
				//return fly.post('/api/TokenAuth/Authenticate', data)
				//let res = await fly.post(config.Authenticate, data).then(function() { 
				// post 返回信息没用：{"_c":[],"_s":0,"_d":false,"_h":0,"_n":false} 
				let rep = await fly.post(config.Authenticate, payload.data).then(function(res) {
					//console.log(res);
					if (res.success && res.result.accessToken) {
						uni.setStorageSync('token', res.result.accessToken)
						return res.result;
					}
					return '';
				})
				//console.log('Login:' + JSON.stringify(rep));
				return rep; // return '登录成功'; 返回到此处
			},
			async GetHomeInfo(state) {
				let rep = await fly.get(config.GetHomeInfo).then(function(res) {
					//console.log(res);
					if (res.success) {						
						return res.result;
					}
					return '';
				})				
				return rep; // return '登录成功'; 返回到此处
			}			
		};
		this.mutations = {}
	}
}
const appModule = new AppModule();
export default appModule;

// dispatch 异步操作，比如向后台发送请求获取数据
// commit   同步操作
