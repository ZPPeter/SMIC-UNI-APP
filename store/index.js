import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import config from '@/libs/common/config.js';
import app from './modules/app';
import user from './modules/user';
import sjmx from './modules/sjmx';
import sjcl from './modules/sjcl';
import xtgl from './modules/xtgl';
import notice from './modules/notice';
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		latestData: {
			HomeInfo: '', // HomeInfo.ID = 1
			stats: 0,
			List: [' 正在连接服务器..', ' 正在连接服务器...'], // 只有一条消息要再重复一遍
			Data: [0, 0, 0, 0, 0, 0, 0]
		},
		isConnected: false,
		connCount: 0 //连接次数
		//portrait: config.avatarImgPath + 'null.png'
	},
	mutations: {
		login(state, data) {			
			state.hasLogin = true;
			state.userInfo = data;
			//uni.setStorage({
			//	key: 'userInfo',
			//	data: data
			//})
			try {
			    uni.setStorageSync('userInfo', data);
			} catch (e) {
			    // error
			}
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			//state.latestData.Data.length = 0;
			state.latestData.Data = [0,0,0,0,0,0,0]
			uni.removeStorage({
				key: 'userInfo'
			});
			//uni.removeStorage({
			//	key: 'ChartsData'
			//});
			uni.setStorageSync('token', null);
			//setTimeout(() => {
			uni.navigateTo({
				url: '/pages/login/login'
			});
			//}, 200);
		}
	},
	modules: {
		app,
		user,
		sjmx,
		sjcl,
		xtgl,
		notice
	}
})
export default store
