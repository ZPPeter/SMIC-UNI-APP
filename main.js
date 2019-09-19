import Vue from 'vue'
import App from './App'

import store from './store'

/*
//系统错误捕获(未测试)  
const errorHandler = (err, vm, info) => {
	// handle error  
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子  
	// 只在 2.2.0+ 可用   

	// console.error('抛出全局异常');  
	// console.log("message: " + err.message);  
	// console.log("stack: " + err.stack);  
	// console.error(err);  

	var log = {
		message: err.message,
		stack: err.stack
	}
	uni.setStorage({
		key: 'errlog',
		data: log,
		success: function() {
			console.log('success');
		}
	});
}
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);
*/

/*
api.js
    export const Login = (params) => {
        return fly.post('/api/TokenAuth/Authenticate', params)
    }
...	
import * as API from '@/libs/ajax/api.js'
Vue.prototype.$api = API
// 调用 this.$api.Login(data);
*/

Vue.config.productionTip = false

Vue.prototype.$store = store
//Vue.prototype.$eventHub = new Vue(); 
App.mpType = 'app'

import router from './router/uni-app-router.js'
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
Vue.component('router-link', routerLink)

const app = new Vue({
	store,
	router,
	...App
})
app.$mount()
