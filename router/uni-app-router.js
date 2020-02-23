import Vue from 'vue'
import Router from 'uni-simple-router';
import store from '@/store'
Vue.use(Router);
const router = new Router({
	routes: ROUTES //路由表 webpack vue.config.js
});
//console.log(JSON.stringify(router));
router.beforeEach((to, from, next) => {
	/*
	console.log('------------------------------');
	console.log('from:');
	console.log(from);
	console.log('to:')
	console.log(to);
	*/
	//console.log(to.name);
	//console.log(from.name == to.name);
	//if (from.name === to.name)return;

	//if (uni.getSystemInfoSync().platform === 'android') {
	//console.log(to.name == null);
	let icon = plus.nativeObj.View.getViewById('LogoImg');
	if (icon) {
		if (to.name == null) {
			//console.log('to.name == null hide icon');
			setTimeout(function() {
				icon.hide();
			}, 100);
		} else {
			if (['main', 'verification', 'check', 'approve', 'user'].in_array(to.name)) {
				//console.log('Show Icon');
				setTimeout(function() {
					icon.show();
				}, 100);
			} else {
				//console.log('to.name != null Hide Icon');
				setTimeout(function() {
					icon.hide();
				}, 100);
			}
		}
	} else {
		// App Launch 之前取不到此对象
		console.log('getViewById_LogoImg Error');
	}

	if (!store.state.hasLogin) {
		next({
			path: '/pages/login/login'
		})
	} else {
		next()
	}

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
