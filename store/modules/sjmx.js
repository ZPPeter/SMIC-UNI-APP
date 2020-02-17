import config from '@/libs/common/config.js';
import Vue from 'vue';
import fly from '@/libs/ajax/request.js';

class SjmxModule {
	constructor() {
		this.namespaced = true;
		this.state = {};
		this.actions = {
			async GetStatsData(state) { // 统计图表
				let rep = await fly.get(config.GetQzyStatsData,null,{ShowLoading:false}).then(function(res) {
					//console.log(res.result);
					return res.result;
				})
				//console.log('GetStatsData:' + rep);
				return rep;
			},
			async GetHomeDatas(state) {
				let rep = await fly.get(config.GetHomeDatas,null,{ShowLoading:false}).then(function(res) {
					//console.log(res);
					return res.result;
				})
				//console.log('GetHomeDatas:' + rep);
				return rep;
			},
			async GetDashboardDatas(state) {
				let rep = await fly.get(config.GetDashboardDatas,null,{ShowLoading:false}).then(function(res) {
					//console.log(res);
					return res.result;
				})
				return rep;
			},
			async GetLastSjmxDatas(state){
				let rep = await fly.get(config.GetLastSjmxDatas,null,{ShowLoading:false}).then(function(res) {
					return res.result;
				})
				return rep;
			},
			async ListWtd(state, payload) {
				//console.log('-----------------');
				//console.log(payload.data);
				let rep = await fly.get(config.ListWtd+'?sjdid='+payload.data).then(function(res) {
					return res.result;
				})
				//console.log(JSON.stringify(rep));
				return rep; // return '登录成功'; 返回到此处
			},
			async ListWtds(state, payload) {
				//console.log(payload.data);
				let rep = await fly.get(config.ListWtds, {params:payload.data}).then(function(res) {
					return res.result;
				})
				//console.log(JSON.stringify(rep));
				return rep; // return '登录成功'; 返回到此处
			},
			async ListSjmxs(state, payload) { // 综合查询
				//console.log(payload.data);
				let rep = await fly.get(config.ListSjmxs, {params:payload.data}).then(function(res) {
					return res.result;
				})
				//console.log(rep);
				return rep; // return '成功'; 返回到此处
			},
			async ListDjmxs(state, payload) { //待检列表
				//console.log(payload.data);
				//console.log(config.ListDjmxs);
				let rep = await fly.get(config.ListDjmxs, {params:payload.data}).then(function(res) {
					//console.log(JSON.stringify(res));
					return res.result;
				})
				//console.log(rep);
				return rep; // return '成功'; 返回到此处
			},
			async ListDhymxs(state, payload) { //待检列表
				//console.log(payload.data);
				//console.log(config.ListDhymxs);
				let rep = await fly.get(config.ListDhymxs, {params:payload.data}).then(function(res) {
					//console.log(JSON.stringify(res));
					return res.result;
				})
				//console.log(rep);
				return rep; // return '成功'; 返回到此处
			},
			async ListDpzmxs(state, payload) { //待批准列表
				//console.log(payload.data);
				//console.log(config.ListDhymxs);
				let rep = await fly.get(config.ListDpzmxs, {params:payload.data}).then(function(res) {
					//console.log(JSON.stringify(res));
					return res.result;
				})
				//console.log(rep);
				return rep; // return '成功'; 返回到此处
			},
			async UpdateCcbh(state, payload) {
				//console.log(payload);
				let rep = await fly.put(config.UpdateCcbh, payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async GetQzyJbcs(state, payload) {
				//console.log(payload.data);
				//console.log(config.GetQzyJbcs + "?bm="+payload.data);
				let rep = await fly.get(config.GetQzyJbcs + "?bm="+payload.data).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async AddQzyJbcs(state, payload) {
				//console.log(payload.data);
				let rep = await fly.post(config.AddQzyJbcs,{params:payload.data}).then(function(res) {
					//console.log(res);
					if (res.success) {
						return res.result;
					}
					return '';
				})
				//console.log(rep);
				return rep;
			},
			async getStatsData(state){
			    let rep = await fly.get(config.getStatsData,null,{ShowLoading:false}).then(function(res) {
			    	//console.log(res);
			    	return res.result;
			    })
			    return rep;
			},
		};
		this.mutations = {}
	}
}
const sjmx = new SjmxModule();
export default sjmx;
