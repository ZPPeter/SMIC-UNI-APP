<template>
	<view><web-view :src="url" @message="getMessage"></web-view></view>
</template>
<script>
export default {
	data() {
		return {
			//url: 'http://192.168.1.148:8848/SMIC-H5-ZHCX/index.html',
			//url: 'http://192.168.1.148:8080/#/pages/index/index',         // x
			//url0: 'http://192.168.1.148:8080/#/pages/wtd_list/wtd_list',  // x
			//url0: 'http://192.168.1.148:8003/', // 注意防火墙开放端口
			url0: 'http://192.168.0.191:8080', // 注意防火墙开放端口
			token: '',
			q: '',
			//t: '',
			url: ''
			//items: ['送检明细','委托单']
		};
	},
	created() {
		this.token = uni.getStorageSync('token');
		//console.log(this.token);
	},
	onBackPress(e) {
		/*
		console.log(e);
		if (e.from == 'backbutton') {
			uni.switchTab({
				url:'/pages/main/main'
			})
			return true; //阻止默认返回行为
		}*/
	},
	onNavigationBarButtonTap(e) {
		uni.switchTab({
			url: '/pages/main/main'
		});
		//this.test(); showActionSheet
	},
	onNavigationBarSearchInputChanged(e) {
		console.log('你输入了信息:' + e.text);
	},
	onLoad() {
		this.url = this.url0 + '?token=' + encodeURIComponent(this.token) + '&t=0';
		//console.log(this.url);
	},
	methods: {
		getMessage(event) {
			uni.showModal({
				content: JSON.stringify(event.detail),
				showCancel: false
			});
		},
		setMenu(i) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			//let titleNView = currentWebview.getStyle().titleNView;
			//titleNView.buttons[0].text = this.items[i];
			//currentWebview.setStyle({titleNView: titleNView}); // 下拉选择按钮失效!!!
			currentWebview.setTitleNViewButtonStyle(0, { text: this.items[i] });
			//currentWebview.setStyle({mask:"rgba(0,0,0,0.5)"});
			//currentWebview.addEventListener("maskClick",function(){
			//     currentWebview.setStyle({mask:"none"});
			//},false);
			// #endif
		},
		test() {
			/*
			// 注入脚本,html 脚本，vue 编译过的不可以
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.evalJS('alert("evalJS: "+location.href);');
			*/
			var _this = this;
			uni.showActionSheet({
				itemList: _this.items,
				success: function(res) {
					//console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					//_this.url = _this.url0 + '?q=' + _this.q + '&t=' + res.tapIndex;
					_this.url = _this.url0 + '?token=' + _this.token + '&q=' + _this.q + '&t=' + res.tapIndex;
					_this.t = res.tapIndex;
					//console.log(_this.url);
					_this.setMenu(res.tapIndex);
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		}
	},
	onNavigationBarSearchInputConfirmed(e) {
		this.url = this.url0 + '?q=' + e.text + '&t=0';
		//console.log(this.url);
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord(); //强制隐藏
		// #endif
		//uni.hideKeyboard(); //无效?
		//return true;
	},
	onNavigationBarSearchInputChanged(e) {
		this.q = e.text;
	}
};
</script>

<style></style>
