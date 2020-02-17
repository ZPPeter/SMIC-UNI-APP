import config from '@/libs/common/config.js';
import Vue from 'vue';
import fly from '@/libs/ajax/request.js';

class XtglModule {
	constructor() {
		this.namespaced = true;
		this.state = {};
		this.actions = {
			async AddtoCZRZ(state, payload) {
				//console.log(payload.data);
				await fly.post(config.AddtoCZRZ, payload.data);
			},
			async ListCzrzs(state, payload) { // 查询日志
				//console.log(payload.data);
				let rep = await fly.get(config.ListCzrzs, {params:payload.data}).then(function(res) {
					return res.result;
				})
				//console.log(rep);
				return rep; // return '成功'; 返回到此处
			}
		};
		this.mutations = {}
	}
}
const xtgl = new XtglModule();
export default xtgl;
