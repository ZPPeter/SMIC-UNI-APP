import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './modules/app';
import user from './modules/user';

const store = new Vuex.Store({
    state: {
		hasLogin: false,
		userInfo: {},
    },
    mutations: {		
		login(state, data) {
			state.hasLogin = true;
			state.userInfo = data;
			uni.setStorage({
			    key: 'userInfo',  
			    data: data  
			}) 
			//console.log(state.userInfo);
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
		user
    }	
})

export default store
