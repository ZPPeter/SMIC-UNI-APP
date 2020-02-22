const home = [
	{
      //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: "/pages/main/main",
      name: 'main',
      meta: {
	    title: '首页',
		login: false // 早期版本路由插件(App.vue 将加载 tabbar 登录 2 次 设置 login: false 避免重复登录) ,新版本已经解决,不用了.
	  },
    },	
	{
		path: "/pages/user/userinfo",
		name: 'userinfo'
	}
]
export default home