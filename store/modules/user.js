//import User from '../entities/user';
import config from '@/libs/common/config.js';
import Vue from 'vue';
import fly from '@/libs/ajax/request.js';

class UserModule {
	constructor() {
		this.namespaced = true;
		this.state = {};
		this.actions = {
			async changePassword(state, payload) {              
				//console.log(payload);
				let rep = await fly.post(config.ChangePwd, payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				return rep;
			},
			async uploadAvatar(state, payload) {
				console.log('----:'+payload.data);				                
				
 // 浏览器报错
 //var formData = new FormData();
 //fly.post(config.uploadAvatar,formData).then().catch();
				
				
				//上传单个文件
				//var formData = {
				//	file: fs.createReadStream('./v.png'), //文件
				//}
				//fly.upload("http://localhost/upload", formData)
				
				//var formData = new FormData(); 
				//formData.append('username', 'Chris');
				//let rep = await fly.post(config.uploadAvatar, formData).then(function(res) {
				
				let rep = await fly.post(config.uploadAvatar, payload.data).then(function(res) {	
					console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				return rep;
			},
			async GetUsers(state) {
				let rep = await fly.get(config.GetUsers).then(function(res) {
					//console.log(res.result);
					return res.result;
				})
				//console.log('GetUsers:' + rep);
				return rep; // return '登录成功'; 返回到此处
			}
			
		};
		this.mutations = {}
	}
}
const user = new UserModule();
export default user;
