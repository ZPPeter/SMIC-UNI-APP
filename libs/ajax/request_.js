import uniFly from 'unifly'
import utils from '@/libs/common/utils.js'
import config from '@/libs/common/config.js'

//基础路由
uniFly.baseUrl = config.apiDomain; //baseApiUrl

//设置请求头
uniFly.headers['Content-Type'] = 'application/json;charset=utf-8'

//全局请求超时时间
uniFly.timeOut = 20000

// 自定义请求拦截 - 配置 Token
uniFly.requestInterceptors.success = function(request) {
	console.log('自定义请求拦截');
	//配置基本信息
	/*
    if (!!window.abp.auth.getToken()) {
        config.headers.common["Authorization"] = "Bearer " + window.abp.auth.getToken();
    }
    config.headers.common[".AspNetCore.Culture"] = window.abp.utils.getCookieValue("Abp.Localization.CultureName");
    config.headers.common["Abp.TenantId"] = window.abp.multiTenancy.getTenantIdCookie();
	*/
	request.headers = uniFly.headers;
	uni.showLoading();
	return request;
}

// 自定义响应拦截 - success Status:200
uniFly.responseInterceptors.success = function(request) {
  console.log('自定义响应拦截');
  uni.hideLoading();
  return Promise.resolve(request);
}

// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const postTest = function(data) {
	return uniFly.post({
		url: config.Authenticate,
		params: data
	})
}

const getTest = function(data) {
	return uniFly.get({
		url: 'info/5ca854ca82de0949287feeed',
		params: data
	})
}

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		userNameOrEmailAddress: userInfo.userNameOrEmailAddress,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
	postTest,
	getTest,
	getUsers,
	addUser
}
