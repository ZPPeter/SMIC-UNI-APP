<template>
	<view class="container">
		<view class="content">
		<view class="user-section">
			<image class="bg" src="/static/img/user-bg.jpg"></image>
			<image class="logo" src="/static/img/logo.png"></image>
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="userInfo.portrait || '/static/img/missing-face.png'" @click="GotoLogo"></image></view>
				<view>
					<text class="username">{{ userInfo.realname || '未登录' }}</text>
				</view>
			</view>
			<view class="list-info-box">
				<view class="list-item">
					<text class="list-num">11</text>
					<text class="list">待检</text>
				</view>
				<view class="list-item">
					<text class="list-num">51</text>
					<text class="list">在检</text>
				</view>
				<view class="list-item">
					<text class="list-num">32</text>
					<text class="list">核验</text>
				</view>
				<view class="list-item">
					<text class="list-num">56</text>
					<text class="list">批准</text>
				</view>
			</view>
		</view>
		<view class="dashboard">
			<view class="dashboard1">工作台</view>
			<view class="dashboard2">
				<!-- uni-notice-bar class="dashboard3" background-color="#e4e7ed" speed="50" scrollable="true" single="true" text="最新送检:济南市勘察测绘院2台。"></uni-notice-bar -->
			</view>
		</view>
		<view style="padding-top: 20upx;"><u-charts></u-charts></view>
		<view class="noticebar"><uni-notice-bar class="noticebar" show-icon="true" :text="homeInfo"></uni-notice-bar></view>
	</view>
	<view class="time">{{ gDate }}{{ gTime }}</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uCharts from '@/pages/component/ucharts/ucharts.vue';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import utils from '@/libs/common/utils.js';
import App from '@/App';
var weekAry = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
var d = new Date();
export default {
	components: {
		uCharts,
		uniNoticeBar
	},
	data() {
		return {
			gDate: new Date().Format('yyyy年MM月dd日 ') + weekAry[d.getDay()],
			gTime: new Date().Format(' hh:mm:ss'),
			homeInfo: ''
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		if (!this.hasLogin) this.$Router.push('/pages/login/login');
		else {
			const index = e.index;
			//if (index === 0) {
			//	uni.scanCode({
			//		onlyFromCamera: true,
			//		success: function(res) {
			//			console.log('条码类型：' + res.scanType);
			//			console.log('条码内容：' + res.result);
			//		}
			//	});
			//} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			//uni.navigateTo({
			//	url: '/pages/notice/notice'
			//});
			this.navTo('/pages/test/test');
			//}
		}
	},
	// #endif
	methods: {
		GotoLogo() {
			if (this.hasLogin) this.$Router.push('/pages/user/userinfo');
			else this.$Router.push('/pages/login/login');
		},
		navTo(url) {
			this.$Router.push(url); // 拦截未登录路由
			return;
		},
		doScan() {
			if (this.hasLogin) {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			} else this.$Router.push('/pages/login/login');
		}
	},
	onLoad: async function(e) {
		// #ifdef APP-PLUS
		//console.log(plus.screen.resolutionHeight);
		//uni.getSystemInfo({
		//	success: function(res) {
				//console.log(res.model);
				//console.log(res.pixelRatio);
				//console.log(res.windowWidth);
				//console.log(res.windowHeight); // 单位 px 非 upx
				//console.log(res.language);
				//console.log(res.version);
				//console.log(res.platform);
		//	}
		//});
		// #endif

		//console.log(this.hasLogin)
		this.timer = setInterval(() => {
			this.gTime = new Date().Format(' hh:mm:ss'); // new Date().Format("yyyy年MM月dd日 hh:mm:ss");
		}, 500);

		const res = await this.$store.dispatch({
			type: 'app/GetHomeInfo'
		});
		this.homeInfo = res.description;
		this.homeInfo += res.description;
		this.homeInfo += res.description;
		this.homeInfo += res.description;
		this.homeInfo += res.description;
		//if (res != '') {}
	},
	onShow() {
		//console.log(this.userInfo.portrait);
	}
};
</script>
<style lang="scss">
page,
view {
	display: flex;
	font-size: 25upx;
	color: #303133;	
}
page {
	min-height: 100%;
	background-color: #ffffff;
}	
.fab-box {
	position: absolute;
	right: 40upx;
	top: 180upx;
	width: 90upx;
	height: 90upx;
	//position: fixed;
	//display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.fab-box.fab {
	z-index: 10;
}

.fab-circle {
	//display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 110upx;
	height: 110upx;
	background: dodgerblue;
	//background: #3c3e49;
	/* background: #5989b9; */
	border-radius: 50%;
	box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	z-index: 11;
}

.fab-circle.left {
	left: 0;
}

.fab-circle.right {
	right: 0;
}

.fab-circle.top {
	top: 0;
}

.fab-circle.bottom {
	bottom: 0;
}

.fontsize {
	//color:white;
	//font-size: 40upx;
	color: #ffffff;
	font-size: 50upx;
	transition: all 0.3s;
	font-weight: bold;
}
.user-section {
	flex-direction: column;
	height: 520upx;
	padding: 100upx 30upx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px); //图像高斯模糊度
		opacity: 0.8; //图像透明度
	}
}
.logo {
	position: absolute;
	right: 190upx;
	top: 110upx;
	width: 210upx;
	height: 170upx;
}
.user-info-box {
	//flex-direction: column;
	height: 180upx;
	//display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		font-size: $font-lg + 4upx;
		margin-left: 20upx;
		//color: $font-color-dark;
		color: #e4e7ed; //#555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
	}
}
.list-info-box {
	justify-content: space-around;
	align-content: center;
	position: relative;
	margin-top: 70upx;	
	z-index: 1;
	.list-item {
		//display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 150upx;
		height: 120upx;
		//border-radius: 10upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	.list-num {
		font-size: $font-lg + 4upx;
		color: $font-color-dark;
		margin-left: 0upx;
		color: #e4e7ed;
	}
	.list {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-left: 0upx;
		color: #e4e7ed;
	}
}
.noticebar {
	width: 100%;
	padding: 10upx;
	font-size: $font-lg;
}
.dashboard {
	width: 100%;
	height: 75upx;
	text-align: left;	
	color: #808080;
	padding: 10upx;
	background-color: #e4e7ed;
	.dashboard1 {
		font-size: $font-base + 2upx;
		width: 210upx;
	}
	.dashboard2 {}
	.dashboard3 {
		width: 400upx;
		height: 60upx;		
	}
}
.container {
	flex-direction: column;
	flex: 1;
	.time {		
		position: relative;
		justify-content: center;
		align-items: center;
		text-align: center;		
		bottom: 5px;
		width: 100%;
		font-size: $font-base - 1upx;
		color: silver; //: #808080;
		padding: 0upx;
	}
}
.content {
	flex-direction: column;	
	flex: 1;
}
</style>
