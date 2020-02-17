import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './modules/app';
import user from './modules/user';
import sjmx from './modules/sjmx';
import sjcl from './modules/sjcl';
import xtgl from './modules/xtgl';
import notice from './modules/notice';
import config from '@/libs/common/config.js';

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		latestData: {
			HomeInfo: '欢迎使用SMIC测绘仪器检定系统！', // HomeInfo.ID = 1
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
			uni.setStorage({
				key: 'userInfo',
				data: data
			})
			//console.log(data);
			//下载 logo
			//console.log(config.avatarImgPath + data.id + '.png');			
			uni.downloadFile({
				url: config.avatarImgPath + data.id + '.png',
				success: function(res) {
					var filePath = res.tempFilePath; //下载到临时文件路径						
					if (res.statusCode === 200) {
						// #ifdef APP-PLUS
						uni.saveFile({ 
							tempFilePath: filePath,
							success: function(res) {
								var savedFilePath = res.savedFilePath;
								state.userInfo.portrait = savedFilePath;
								//console.log(savedFilePath);
							}
						});
						// #endif
						// #ifdef H5
						state.userInfo.portrait = filePath;
						// #endif
					}
				}
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			//state.latestData.Data.length = 0;
			state.latestData.Data = [0,0,0,0,0,0,0]
			uni.removeStorage({
				key: 'userInfo'
			});
			uni.removeStorage({
				key: 'ChartsData'
			});
			uni.setStorageSync('token', null);
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
