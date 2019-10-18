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
						<text class="list-num">{{ latestData.Data[0] }}</text>
						<text class="list">待检</text>
					</view>
					<view class="list-item">
						<text class="list-num">{{ latestData.Data[1] }}</text>
						<text class="list">在检</text>
					</view>
					<view class="list-item">
						<text class="list-num">{{ latestData.Data[2] }}</text>
						<text class="list">核验</text>
					</view>
					<view class="list-item">
						<text class="list-num">{{ latestData.Data[3] }}</text>
						<text class="list">批准</text>
					</view>
				</view>
			</view>
			<view class="dashboard">
				<view class="dashboard1">工作台</view>
				<view class="dashboard2">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-grey ">我的工作量</view>
						<view class="cu-tag line-grey">{{ latestData.Data[4] }}</view>
					</view>
				</view>
			</view>
			<view style="padding-top: 20upx;"><u-charts></u-charts></view>
			<view class="uni-swiper-msg" style="text-align: left;width: 100%;font-size: 32upx;padding-top: 10upx;">
				<view class="uni-swiper-msg-icon">
					<!-- icon type="info" size="14" color="darkgray" / -->
					<!-- image src="/static/img/info4.jpg" mode="widthFix" style="margin-left: 20upx;"></image -->
					<text class="cuIcon-title text-orange " style="margin-left: 30upx;font-size: 30upx;"></text>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in latestData.List" :key="index">
						<navigator>{{ item }}</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="infoBox">
			<view class="fab-box fab">
				<view class="fab-circle" @click="doScan"><text class="iconfont icon-saoma1 fontsize"></text></view>
			</view>
			<!-- App+ 不支持滚动 -->
			<view><uni-notice-bar class="noticebar" show-icon="true" :text="latestData.HomeInfo"></uni-notice-bar></view>
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
			modalName: null,
			latestData: {
				HomeInfo: '欢迎使用SMIC测绘仪器检定系统！', // HomeInfo.ID = 1
				List: [
					' 正在连接服务器..',
					' 正在连接服务器...'
				],// 只有一条消息要再重复一遍
				Data: [0, 0, 0, 0, 0]
			}
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
			//this.navTo('/pages/wtd/wtd');
			this.navTo('/pages/test/test');
			//}
		}
	},
	// #endif
	methods: {
		GotoTest() {
			this.navTo('/pages/test/test');
		},
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
		// console.log(this.latestData.HomeInfo);
		/*
		   读取缓存 LatestData
		   读取服务器，成功后刷新并缓存
		*/

		// 只加载一次
		if (!this.hasLogin) this.$Router.push('/pages/login/login');
		/*
		uni.showModal({
			title:'提示',
			content:'服务器消息。',
			showCancel: false,
			success:function(){
			   uni.navigateTo({
			      url:"/pages/login"
			   });
			}
		})*/

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
			type: 'app/GetHomeInfos'
		});

		if (res != '') {
			//console.log(res.length);
			this.latestData.HomeInfo = res[0].description.replace('<br>', '');
			if (res.length > 1) {
				this.$store.state.user.newNotices = res.length-1;
				uni.showTabBarRedDot({
					index: 4
				});
			}
			if (res.length == 2) {
				this.latestData.List.push(' ' + res[1].description.replace('<br>', ''));
				this.latestData.List.push(' ' + res[1].description.replace('<br>', ''));
			}
			if (res.length >= 2) {
				this.latestData.List.length = 0;
				for (var i = 1; i < res.length; i++) {
					this.latestData.List.push(' ' + res[i].description.replace('<br>', ''));
				}
			}
		} else {
			this.latestData.List.push(' 正在连接服务器.');
		}
	},
	onShow() {
		// 页面刷新
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
.infoBox {
	position: absolute;
	bottom: 120upx;
	left: 60upx;
	//width: 100%;
	flex-direction: row;
	flex: 1;
}
.noticebar {
	//margin-left: 90upx;
	padding-left: 25upx;
	font-size: $font-lg;
	//height:240upx;
}
.fab-box {
	width: 90upx;
	height: 90upx;
	//justify-content: center;
	//align-items: center;
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
	height: 500upx;
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
	width: 190upx;
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
		width: 120upx;
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
.dashboard {
	width: 100%;
	height: 75upx;
	text-align: left;
	color: #808080;
	padding: 10upx;
	background-color: #e4e7ed;
	.dashboard1 {
		font-size: $font-base + 2upx;
		width: 120upx;
	}
	.dashboard2 {
		width: 100%;
		justify-content: flex-end;
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
