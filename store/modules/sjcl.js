import config from '@/libs/common/config.js';
import Vue from 'vue';
import fly from '@/libs/ajax/request.js';

class SjclModule {
	constructor() {
		this.namespaced = true;
		this.state = {};
		this.actions = {			
			async SetApproveReject(state, payload) {
				let rep = await fly.post(config.SetApproveReject,payload.data).then(function(res) {
					if (res.success) {
						return res.result;
					}
					return '';
				})
				return rep;
			},
			async SetReject(state, payload) {
				let rep = await fly.post(config.SetReject,payload.data).then(function(res) {
					if (res.success) {
						return res.result;
					}
					return '';
				})
				return rep;
			},
			async MakeCert(state, payload) {
				//console.log(payload.data);
				//let rep = await fly.post(config.MakeCert,{params:payload.data}).then(function(res) { 这种写法错误
				let rep = await fly.post(config.MakeCert,payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async MakeXlsCert(state, payload) {
				//console.log(payload.data);
				//let rep = await fly.post(config.MakeCert,{params:payload.data}).then(function(res) { 这种写法错误
				let rep = await fly.post(config.MakeXlsCert,payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async ShowZshData(state, payload) {
				//console.log(payload.data);
				let rep = await fly.post(config.ShowZshData+'?ID='+payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async SetJDWB(state, payload) {
				//console.log(payload.data);
				let rep = await fly.post(config.SetJDWB+'?ID='+payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async SetHYWB(state, payload) {
				//console.log(payload.data);
				let rep = await fly.post(config.SetHYWB+'?ID='+payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async SetPZWB(state, payload) {
				//console.log(payload.data);
				let rep = await fly.post(config.SetPZWB+'?ID='+payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async SetQBWB(state) {
				//console.log(payload.data);
				let rep = await fly.post(config.SetQBWB).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async ResetJdzt(state, payload) {
				//console.log(payload.data);
				let rep = await fly.post(config.ResetJdzt+'?ID='+payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async GetAllTasks(state, payload) { // 所有任务列表
				let rep = await fly.get(config.GetAllTasks, {params:payload.data}).then(function(res) {
					//console.log(JSON.stringify(res));
					return res.result;
				})
				//console.log(rep);
				return rep; // return '成功'; 返回到此处
			},
		};
		this.mutations = {}
	}
}
const sjcl = new SjclModule();
export default sjcl;
