import config from '@/libs/common/config.js';
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
		// var path = "_www/img/" + filename; 
		//_doc/upload/F_SMP-1467602809090.jpg 
		//打包后 _www 只读,_doc目录可读写
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
	},
	test() {
		return config.apiDomain;
	},
	getImg(zzc) {
		var img = '000';
		if (~zzc.indexOf('徕卡')) img = '100';
		else if (~zzc.indexOf('拓普康')) img = '101';
		else if (~zzc.indexOf('天宝')) img = '103';
		else if (~zzc.indexOf('索佳')) img = '102';
		else if (~zzc.indexOf('南方')) img = '106';
		else if (~zzc.indexOf('尼康')) img = '105';
		else if (~zzc.indexOf('宾得')) img = '104';
		else if (~zzc.indexOf('常州大地')) img = '107';
		else if (~zzc.indexOf('苏一光')) img = '108';
		else if (~zzc.indexOf('中海达')) img = '109';
		else if (~zzc.indexOf('科力达')) img = '110';
		else if (~zzc.indexOf('中翰')) img = '111';
		else if (~zzc.indexOf('欧波')) img = '112';
		return '/static/ins/' + img + '.png';
	},
	getJdzt(zt2) {
		//console.log(zt2);
		switch (zt2) {
			case '100':
				return '登记';
				break;
			case '111':
				return '在检';
				break;
			case '122':
				return '在检';
				break;
			case '200':
				return '在检';
				break;
			case '222':
				return '检完';
				break;
			default:
				return '检完';
				break;
		}
	},
	OpenDoc(bm, id) {
		let docUrl = config.apiDomain + '/Results/Doc/' + new Date().getFullYear() + '/' + bm + '/' + id + '.docx';
		//this.xlsUrl = config.apiDomain + '/Results/Xls/'+ new Date().getFullYear() +'/'+o.qjmcbm+'/' + o.id + '.xls';		
		uni.downloadFile({
			url: docUrl,
			success: function(res) {
				var filePath = res.tempFilePath;
				//console.log(filePath);
				uni.openDocument({
					filePath: filePath,
					success: function(res) {
						//console.log('打开文档成功');
					}
				});
			}
		});
	},
	OpenXls(bm, id) {
		let docUrl = config.apiDomain + '/Results/Xls/' + new Date().getFullYear() + '/' + bm + '/' + id + '.xls';
		uni.downloadFile({
			url: docUrl,
			success: function(res) {
				var filePath = res.tempFilePath;
				uni.openDocument({
					filePath: filePath,
					success: function(res) {
						//console.log('打开文档成功');
					}
				});
			}
		});
	},
	getProvider() {
		uni.getProvider({
			service: 'share',
			success: result => {
				const data = [];
				for (let i = 0; i < result.provider.length; i++) {
					switch (result.provider[i]) {
						case 'weixin':
							data.push({
								name: '分享到微信好友',
								id: 'weixin'
							});
							break;
						default:
							break;
					}
				}
				getApp().globalData.providerList = data;
			},
			fail: error => {
				console.log('获取分享通道失败' + JSON.stringify(error));
			}
		});
	},
	shareMessage(o) {
		var providerList = getApp().globalData.providerList;
		if (providerList.length === 0) {
			uni.showModal({
				title: '当前环境无分享渠道!',
				showCancel: false
			});
			return;
		}
		let info = '委托单位:' + o.dwmc + ',型号规格:' + o.xhggmc + ',出厂编号:' + o.ccbh;
		let provider = providerList[0].id;
		uni.share({
			provider: provider,
			scene: providerList[0].type && providerList[0].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession',
			type: provider === 'qq' ? 1 : 0,
			title: '加急任务提示',
			summary: info,
			imageUrl: config.apiDomain + '/logo.png',
			href: config.taskInfo + o.id,
			success: res => {
				//console.log('success:' + JSON.stringify(res));
			},
			fail: e => {
				console.log('error:' + JSON.stringify(e.errMsg));
				//uni.showModal({
				//	content: e.errMsg,
				//	showCancel: false
				//});
			}
		});
	},
	getUpdate() {
		let url = config.apiDomain + '/update'; //检查更新的服务器地址
		url = 'https://uniapp.dcloud.io/update';
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				},
				success: (res) => {
					//console.log('success', res);
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					}
					if (res.statusCode == 200 && !res.data.isUpdate) {
						console.log('当前版本已是最新版本。');
						resolve('none');
					}
				},
				fail: (err) => {
					reject('err')
				}
			});
		})
	},
	async checkUpdate() {
		console.log('升级包检测...');
		let rep = await this.getUpdate();
		//console.log(JSON.stringify(rep)); // 是 "none" 不是 none ,length=6
		return JSON.stringify(rep);
	}
}

export default utils;

/* 得到日期年月日等加数字后的日期 */
Date.prototype.DateAdd = function(interval, number) {
	var d = this;
	var k = {
		'y': 'FullYear',
		'q': 'Month',
		'm': 'Month',
		'w': 'Date',
		'd': 'Date',
		'h': 'Hours',
		'n': 'Minutes',
		's': 'Seconds',
		'ms': 'MilliSeconds'
	};
	var n = {
		'q': 3,
		'w': 7
	};
	eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
	return d;
}
/* 计算两日期相差的日期年月日等 */
Date.prototype.DateDiff = function(interval, objDate2) {
	var d = this,
		i = {},
		t = d.getTime(),
		t2 = objDate2.getTime();
	i['y'] = objDate2.getFullYear() - d.getFullYear();
	i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
	i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
	i['ms'] = objDate2.getTime() - d.getTime();
	i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
	i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
	i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
	i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
	i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
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
