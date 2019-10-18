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
	},
	async compressImage(url, filename) { // 异步操作，不能用
		var path = '_doc/logo/' + filename; //_doc/upload/F_SMP-1467602809090.jpg
		var dest = '';
		// var path = "_www/img/" + filename; //_doc/upload/F_SMP-1467602809090.jpg //打包后 _www 只读
		// console.log(url); //file:///storage/emulated/0/Pictures/Screenshots/S70915-001739.jpg
		// console.log(filename);
		// console.log(path);
		await plus.zip.compressImage({
				src: url, //src: (String 类型 )压缩转换原始图片的路径
				dst: path, //压缩转换目标图片的路径
				width: '270px', //将图片压缩为大小
				quality: 20, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
				overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件
			},
			function(event) {
				//event.target获取压缩转换后的图片url路
				console.log(event.target);
			},
			function(error) {
				console.log('Compress error!' + error.message);
			}
		);
	}
}

export default utils;

/* 得到日期年月日等加数字后的日期 */ 
Date.prototype.DateAdd = function(interval,number) 
{ 
    var d = this; 
    var k={'y':'FullYear', 'q':'Month', 'm':'Month', 'w':'Date', 'd':'Date', 'h':'Hours', 'n':'Minutes', 's':'Seconds', 'ms':'MilliSeconds'}; 
    var n={'q':3, 'w':7}; 
    eval('d.set'+k[interval]+'(d.get'+k[interval]+'()+'+((n[interval]||1)*number)+')'); 
    return d; 
} 
/* 计算两日期相差的日期年月日等 */ 
Date.prototype.DateDiff = function(interval,objDate2) 
{ 
    var d=this, i={}, t=d.getTime(), t2=objDate2.getTime(); 
    i['y']=objDate2.getFullYear()-d.getFullYear(); 
    i['q']=i['y']*4+Math.floor(objDate2.getMonth()/4)-Math.floor(d.getMonth()/4); 
    i['m']=i['y']*12+objDate2.getMonth()-d.getMonth(); 
    i['ms']=objDate2.getTime()-d.getTime(); 
    i['w']=Math.floor((t2+345600000)/(604800000))-Math.floor((t+345600000)/(604800000)); 
    i['d']=Math.floor(t2/86400000)-Math.floor(t/86400000); 
    i['h']=Math.floor(t2/3600000)-Math.floor(t/3600000); 
    i['n']=Math.floor(t2/60000)-Math.floor(t/60000); 
    i['s']=Math.floor(t2/1000)-Math.floor(t/1000); 
    return i[interval]; 
}

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

if (typeof String.prototype.inOf != 'function') {
	String.prototype.inOf = function(targetArr) {
		let res = true;
		forEach(item => {
			if (targetArr.indexOf(item) < 0) {
				res = false;
			}
		});
		return res;
	};
}

/*
	oneOf(ele, targetArr) {
		if (targetArr.indexOf(ele) >= 0) {
			return true;
		} else {
			return false;
		}
	},
*/


//console.log( (new Date()).Format("yyyy.MM.dd") )
//alert((new Date()).Format("yyyy.MM.dd"));
//alert(("123.png").endsWith('.png'));
