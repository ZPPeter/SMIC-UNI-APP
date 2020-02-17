import Vue from 'vue'
import Router from 'uni-simple-router';
import store from '@/store'
Vue.use(Router);

// pages.json 里面的页面都要加进来，否则 url 找不到错误
// tabBar 渲染 2 次：原因:main中已经render了app，在route中不需要再加入app组件了，直接重定向到home即可， login: false

const router = new Router({
	login: false,
	routes: [{
			path: "/pages/main/main",
			name: 'main',
			meta: {
				login: false // tabBar
			}
		},
		{
			path: "/pages/user/userinfo",
			name: 'userinfo'
		},
		{
			path: "/pages/test/test",
			name: 'test',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/sign/sign",
			name: 'sign',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/user/changePwd",
			name: 'changePwd',
			meta: {
				login: false // tabBar
			}
		},
		{
			path: "/pages/scan/scan",
			name: 'scan',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/zhcx/zhcx",
			name: 'zhcx',
			meta: {
				login: true
			}
		},
		{
			path: "/pages/wtdcx/wtdcx",
			name: 'wtdcx',
			meta: {
				login: true
			}
		},
		{
			path: "/pages/component/ucharts/ucharts",
			name: 'ucharts',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/login/login",
			name: 'login',
			meta: {
				login: false
			},
		},
		{
			path: "/pages/ucharts/ucharts",
			name: 'ucharts',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/component/view/view",
			name: 'view'
		},
		{
			path: "/pages/address/address",
			name: 'address'
		},
		{
			path: "/pages/address/addressManage",
			name: 'addressManage'
		},
		{
			path: "/pages/user/set", // 设置
			name: 'set'
		},
		{
			path: "/pages/notice/notice",
			name: 'notice'
		},
		{
			path: "/pages/user/userinfo",
			name: 'userinfo'
		},
		{
			path: "/pages/about/about",
			name: 'about',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/wtd/wtd",
			name: 'wtd'
		},
		{
			path: "/pages/verification/verification", // 检定
			name: 'verification',
			meta: {
				login: false // App.vue 将加载 tabbar,避免登录
			}
		},
		{
			path: "/pages/check/check", // 核验
			name: 'check',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/approve/approve", // 批准
			name: 'approve',
			meta: {
				login: false
			}
		},
		{
			path: "/pages/user/user", // 我的
			name: 'user',
			meta: {
				login: false // tabBar
			}
		},
		{
			path: "/pages/sjcl/sorry",
			name: 'sorry',
			meta: {
				login: false // tabBar
			}
		},
		{
			path: "/pages/sjcl/1000/1000", 
			name: '1000',
			meta: {
				login: false // tabBar
			}
		},
		{
			path: "/pages/sjcl/1000/set", 
			name: '1000set',
			meta: {
				login: false // tabBar
			}
		},
		{
			path: "/pages/sjcl/update_ccbh", 
			name: 'update_ccbh',
			meta: {
				login: false // tabBar
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	/*
	console.log('------------------------------');
	console.log('from:');
	console.log(from);
	console.log('to:')
	console.log(to);
	*/
	//console.log(to.name);
	if (from.name != to.name && !['main', 'verification', 'check', 'approve', 'user'].in_array(to.name)) {
		//console.log(to.name);
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('LogoImg');
			//console.log(icon);
			if (icon) {
				setTimeout(function() {
					icon.hide();
				}, 100);
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
})

router.afterEach((to, from) => {
	// console.log(from)
	// console.log(to);	
	// before route -> show page -> after route
})
//console.log(router)

Array.prototype.in_array = function(e) {
	var r = new RegExp(',' + e + ',');
	return (r.test(',' + this.join(this.S) + ','));
};

export default router
