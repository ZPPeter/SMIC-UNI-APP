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
				let rep = await fly.get(config.GetNotices, {params:payload.data}).then(function(res) {
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
export default notice;
