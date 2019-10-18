import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './modules/app';
import user from './modules/user';
import notice from './modules/notice';
import config from '@/libs/common/config.js';

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {}
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
					//console.log(filePath);
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
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.setStorageSync('token', null);
		}
	},
	modules: {
		app,
		user,
		notice
	}
})

export default store
