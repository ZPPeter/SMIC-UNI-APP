import Vue from 'vue';
import App from './App';
import store from './store';
import moment from 'moment';
import config from 'libs/common/config.js';
import ShowHomeData from 'libs/ShowHomeData.js';
let showHomeData = new ShowHomeData.ShowHomeData();
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
this.$throw.errorHandler(error, this);
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

// 在main.js中引入全局过滤器
import * as filters from '@/libs/filters';
// register global utility filters.
Object.keys(filters).forEach(key => {
	//console.log(filters[key]);
	Vue.filter(key, filters[key])
})

/*
// 注册一个全局自定义指令 `v-focus`  -> 无效，应该 :focus="setFocus"
// <input v-focus>
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素	
    el.focus();
  }
})
*/

import abp from '@/abp.js';
Vue.prototype.$abp = abp;

Vue.config.productionTip = false;

var signalR = require('libs/signalR.js');
let _signalR = new signalR.signalR();
Vue.prototype.$signalR = _signalR;
Vue.prototype.$store = store;
Vue.prototype.$moment = moment;

//Vue.prototype.$eventHub = new Vue(); 
App.mpType = 'app';
import router from './router/uni-app-router.js';
import routerLink from './node_modules/uni-simple-router/component/router-link.vue';
//import cuCustom from './colorui/components/cu-custom.vue'
//Vue.component('cu-custom',cuCustom);
Vue.component('router-link', routerLink);

// 此处重写 receive，connection 则 signalR.js 对应函数不再执行
// MessageType 消息类型 1.发送连接消息 2.新消息通知 3.未定义 90.首页数字刷新 98.连接回执消息
_signalR.on('ReceiveMessage', async function(message) {
	//console.log(JSON.parse(message));
	//console.log(JSON.parse(message).MessageType);
	//MessageType:98 - 连接消息返回状态
	//console.log(message);
	store.state.connCount = 0;
	var msg = JSON.parse(message);
	var userName = store.state.userInfo.realname;
	if (msg.MessageType == 2) {
		store.state.user.newNotices = 1;
		//console.log(store.state.user.newNotices);
		uni.showTabBarRedDot({
			index: 4
		});
	} else if (msg.MessageType == 90) {
		showHomeData.showData();
	} else if (msg.MessageType == 98) { // 上线通知
		if (msg.MessageBody.replace('[PC]', '').replace('[App]', '').trim() != userName) {
			uni.showToast({
				icon: 'none',
				position: 'top',
				title: '用户: ' + msg.MessageBody + ' 上线了'
			})
		} else {
			showHomeData.showData();
		}
	};
});

_signalR.on('connection', function() {
	//console.log('连接成功！');
	//消息格式
	var msg = {
		messageType: 1, //消息类型 1.发送连接消息 2.普通内容消息 98.连接回执消息
		sendUserId: store.state.userInfo.realname + ' [App]', //消息发送人(登录用户ID)
		messageBody: 'online' //消息内容
	};
	_signalR.sendMessage(JSON.stringify(msg));
});

async function start() {
	try {
		await _signalR.connection(config.SignalR);;
	} catch (err) {
		console.log(err); // 执行下面的 _signalR.on('error', async function(ex) {, 此处不执行
		//setTimeout(() => start(), 5000);
	}
};

_signalR.on('close', async function() {
	//console.log('close');
	store.state.latestData.List.length = 0; // 清空
	store.state.latestData.List.push(' 注意：已经与服务器断开连接!');
	store.state.latestData.List.push(' 连接服务器.');
	store.state.latestData.List.push(' 连接服务器..');
	store.state.latestData.List.push(' 连接服务器...');
	uni.showModal({
		showCancel: false,
		content: '注意：已经与服务器断开连接!'
	});
	await start();
});

_signalR.on('error', async function(ex) {
	//console.log(ex);
	store.state.connCount = store.state.connCount + 1;
	if (store.state.connCount == 1) {
		store.state.latestData.List.length = 0; // 清空
		store.state.latestData.List.push(' 注意：已经与服务器断开连接!');
		store.state.latestData.List.push(' 连接服务器.');
		store.state.latestData.List.push(' 连接服务器..');
		store.state.latestData.List.push(' 连接服务器...');
		store.state.connCount = 0;
		//uni.showToast({
		//	icon: 'none',
		//	title: '注意：已经与服务器断开连接!'
		//});
	}
	setTimeout(() => start(), 5000); // 5 秒重连
	//await start();
});

const app = new Vue({
	store,
	router,
	...App
})
app.$mount()
