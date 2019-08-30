import Vue from 'vue'
import Router from 'uni-simple-router';
import store from '@/store'
Vue.use(Router);

// pages.json 里面的页面都要加进来，否则 url 找不到错误
// tabBar 渲染 2 次：原因:main中已经render了app，在route中不需要再加入app组件了，直接重定向到home即可， login: false

const router = new Router({
	login: true,
	routes: [{
			path: "/pages/main/main",
			name: 'main',
			meta:{
				login: false  // tabBar
			}
		},
		{
			path: "/pages/main/home",
			name: 'home',
			meta:{
				login: false // tabBar
			}
		},
		{
			path: "/pages/user/user",
			name: 'user',
			meta:{				
				login: false // tabBar
			}			
		},
		{
			path: "/pages/test/test",
			name: 'test'
		},
		{
			path: "/pages/login/login",
			name: 'login',
			meta: {
				login: false
			},			
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
			path: "/pages/set/set",
			name: 'set'
		},
		{
			path: "/pages/notice/notice",
			name: 'notice'
		},
		{
			path: "/pages/userinfo/userinfo",
			name: 'userinfo'
		},
		{
			path: "/pages/about/about",
			name: 'about',
			meta:{				
				login: false
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
	if(from.name===to.name){ // tabBar 直接跳转不用登录
		next();
	}
	if (to.meta && to.meta.login == false) { // 不用登录的 view
		next()
	} else {		
		if (!store.state.hasLogin) {			
			next({
				path: '/pages/login/login'
			})
		} else {
			next()
		}
	}
})

router.afterEach((to, from) => {
	//console.log(to);
	//console.log(from)
})
//console.log(router)

export default router
