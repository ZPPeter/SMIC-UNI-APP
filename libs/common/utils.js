const utils = {
	showToast: function(params) {
		if (params != undefined && params.title != undefined && params.title.length > 0) {
			if (params.icon == undefined) {
				params.icon = 'none';
			}
			if (params.mask === undefined) {
				params.mask = true;
			}
			uni.showToast({
				duration: 2000,
				...params
			});
		} else if (params != undefined) {
			uni.showToast({
				icon: 'none',
				title: params
			});
		}
	},
	showLoading: function(params) {
		params = { ...params
		}
		if (params.title == undefined || params.title.length < 1) {
			params.title = '加载中...';
		}
		if (params.mask === undefined) {
			params.mask = true;
		}
		uni.showLoading({
			...params
		})
	},
	hideLoading: function() {
		uni.hideLoading();
	},
	showModal: function(params) {
		if (params != undefined && params.content != undefined &&
			params.content.length > 0) {
			if (!params.title || params.title.length == 0) {
				params.title = '提示';
			}
			uni.showModal({
				...params,
			})
		}
	},
	showActionSheet: function(params) {
		if (params != undefined && params.itemList != undefined && params.itemList.length > 0) {
			uni.showActionSheet({
				...params,
			})
		}

	},
	/*
	const now = Date.now || function () {  
	    return new Date().getTime();  
	};
	//let now = Date.now()
	const isArray = Array.isArray || function (obj) {  
	    return obj instanceof Array;  
	};
	*/
	now: function() {
		return new Date().getTime();
	},
	isArray: function(obj) {
		return obj instanceof Array;
	},
	isNullOrEmpty: function(value) { // 是否为空
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	inOf(arr, targetArr) {
		let res = true;
		arr.forEach(item => {
			if (targetArr.indexOf(item) < 0) {
				res = false;
			}
		});
		return res;
	},
	oneOf(ele, targetArr) {
		if (targetArr.indexOf(ele) >= 0) {
			return true;
		} else {
			return false;
		}
	},
	dateFormat(o) {
		return (new Date(o)).Format("yyyy.MM.dd");
	},
	debugObjectAttr(o, status = true) {
		var obj = o;
		for (var n in obj) {
			console.log("属性名:" + n);
			if (!n.startsWith('_') && status)
				console.log("属性值:" + obj[n]);
		}
	}
}

export default utils;

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(prefix) {
		return this.slice(0, prefix.length) === prefix;
	};
}

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}
//console.log( (new Date()).Format("yyyy.MM.dd") )
//alert((new Date()).Format("yyyy.MM.dd"));
//alert(("123.png").endsWith('.png'));
