import Vue from 'vue'
import Router from 'uni-simple-router';
import store from '@/store';
import utils from '../libs/common/utils.js';
Vue.use(Router);
const router = new Router({
	    APP:{
	        holdTabbar:true //默认是true,false不拦截原生tab,Bugs:?true 也不会拦截 uni.switchTab
	    },
	routes: ROUTES //路由表 webpack vue.config.js
});

//console.log(JSON.stringify(ROUTES));

router.beforeEach((to, from, next) => {
	//console.log(to.name + ',' + from.name);
	// login 在 main.vue 处理！！！	
	// 原生 Tab 主页 main,login 必须在 main 处理， 不能在这里处理
	// uni.switchTab 也不能在这里处理
	if (to.name === "approve" && !store.state.userInfo.roles.includes('批准')) {
		uni.showToast({
			icon: 'none',
			title: '您没有证书批准权限，无法查看该项列表！'
		});
	} else
		next();
	//console.log('Good');
	//if (utils.isNullOrEmpty(from.name))
	//if (['main', 'verification', 'check', 'approve', 'user'].in_array(from.name) && 
	//['main', 'verification','check', 'approve', 'user'].in_array(to.name))

	/*
	if (from.name != to.name && !['main', 'verification', 'check', 'approve', 'user'].in_array(to.name)) {
		console.log(to.name);
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('LogoImg');
			//console.log(icon);
			if (icon) {
				setTimeout(function() {
					icon.hide();
				}, 150);
			}
		}
	}
	if (from.name === to.name) { // tabBar 直接跳转不用登录
		next();
	}
	if (to.meta && to.meta.login == false) { // 不用登录的 view
		next()
	} else {
		if (!store.state.hasLogin) {
			next({
				path: '/pages/login/login',
				//,query: to.name
			})
		} else {
			next()
		}
	}
	*/
})

// 进入后触发
router.afterEach((to, from) => {
	//console.log(to.name + ',' + from.name);	
	//if (to.name ==="main" && !store.state.hasLogin) {
	//	next({
	//		path: '/pages/login/login'
	//	})
	//}	
	//if (['main', 'verification', 'check', 'approve', 'user'].in_array(to.name))
	//	utils.showLogoImg(true);
	// before route -> show page -> after route
})
//console.log(router)

export default router
