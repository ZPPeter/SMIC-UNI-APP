/*
import config from '@/libs/common/config.js';
import Vue from 'vue';
import fly from '@/libs/ajax/request.js';
class NoticeModule {	
	constructor() {
		this.namespaced = true;
		this.state = {
		};
		this.actions = {
			async GetNotices(state, payload) {
				//console.log(payload.data);
				let rep = await fly.get(config.GetNotices, {params:payload.data},{ShowLoading:false}).then(function(res) {
					return res.result;
				})
				return rep; // return '登录成功'; 返回到此处
			},
            async setReadLastNoticeTime(context) {
                await fly.post('/api/services/app/Session/SetReadLastNoticeTime',null,{ShowLoading:false});
            },			
		};
		this.mutations = {}
	}
}
const notice = new NoticeModule();
*/
const notice1 = [{hello:'Hello world 2020'}];
const notice2 = [{hello:'Hello world 2020'}];
const addUser = function (userInfo) {
    console.log('I come from a function');
}
// OK
const store2 = [notice1,notice2] 
export default store2;//addUser;

//Error 无法通过 index.js 自动加载
//export default addUser;
