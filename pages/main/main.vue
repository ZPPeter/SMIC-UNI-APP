<template>
	<view class="container">
		<view class="content">
			<view class="dashboard0"><dash-board :datas="GetHomeData()"></dash-board></view>
			<view style="padding-top: 20upx;"><u-charts :percentage="GetStats()"></u-charts></view>
			<view class="uni-swiper-msg" style="text-align: left;width: 100%;font-size: 32upx;padding-top: 10upx;">
				<view class="uni-swiper-msg-icon">
					<!-- icon type="info" size="14" color="darkgray" / -->
					<!-- image src="/static/img/info4.jpg" mode="widthFix" style="margin-left: 20upx;"></image -->
					<text class="cuIcon-title text-orange " style="margin-left: 30upx;font-size: 30upx;"></text>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in NoticeList" :key="index">{{ item }}</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="infoBox">
			<!-- view class="fab-box fab">
				<view class="fab-circle" @click="doScan"><text class="iconfont icon-saoma1 fontsize"></text></view>
			</view -->
			<!-- App+ 不支持滚动 -->
			<view><uni-notice-bar class="noticebar" show-icon="true" :text="GetHomeInfo()"></uni-notice-bar></view>
		</view>
		<view class="time">{{ gDate }}{{ gTime }}</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uCharts from '@/pages/component/ucharts/ucharts.vue';
import dashBoard from '@/pages/component/dashboard/dashboard.vue';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import utils from '@/libs/common/utils.js';
import App from '@/App';
var weekAry = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
var d = new Date();
export default {
	components: {
		uCharts,
		uniNoticeBar,
		dashBoard
	},
	data() {
		return {
			gDate: new Date().Format('yyyy年MM月dd日 ') + weekAry[d.getDay()],
			gTime: new Date().Format(' hh:mm:ss'),
			NoticeList: [' 正在连接服务器..', ' 正在连接服务器...'],
			modalName: null,
			tabbar: true,
			windowHeight: ''
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	// #ifndef MP
	onNavigationBarSearchInputClicked() {
		//console.log('Clicked');
		//if (this.hasLogin) {
			this.$Router.push('/pages/wtdcx/wtdcx');
		//} else this.$Router.push('/pages/login/login');
	},
	onNavigationBarSearchInputConfirmed(e) {
		// 内容顶起 乱
		//if (this.hasLogin) {
			//console.log(e.text);
			//this.$Router.push('/pages/wtd/wtd');
			// 带查询参数，变成 /router1?filterText=private
			this.$Router.push({ path: '/pages/wtdcx/wtdcx', query: { filterText: e.text } });
		//} else this.$Router.push('/pages/login/login');
	},
	onNavigationBarButtonTap(e) {
		// 二维码扫描
		if (!this.hasLogin) this.$Router.push('/pages/login/login');
			const index = e.index;
			//console.log(index);
			if (index === 1) {
				//this.navTo('/pages/test/test');
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
			if (index === 2) {
				this.$Router.push('/pages/zhcx/zhcx');
			}
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
			//}		
	},
	// #endif
	methods: {
		test() {
			/*
			const subNVue = uni.getSubNVueById('test');
			console.log(subNVue);
			subNVue.show('slide-in-left',200,()=>{
			    console.log('subNVue 原生子窗体显示成功');
			})*/
		},
		GetHomeInfo() {
			return this.$store.state.latestData.HomeInfo;
		},
		GetStats() {
			if (this.$store.state.isConnected) {
				this.NoticeList = this.$store.state.latestData.List;
			}
			return this.$store.state.latestData.stats;
		},
		GetHomeData() {
			//console.log(this.$store.state.latestData.Data);
			return this.$store.state.latestData.Data || [0, 0, 0, 0, 0, 0, 1, 0, 0];
		},
		GotoLogo() {
			//if (this.hasLogin) 
			this.$Router.push('/pages/user/userinfo');
			//else this.$Router.push('/pages/login/login');
		},
		navTo(url) {
			this.$Router.push(url); // 拦截未登录路由
			return;
		},
		doScan() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
		}
	},
	onLoad: async function(e) {
		// #ifdef APP-PLUS
		var webView = this.$mp.page.$getAppWebview();
		// 修改buttons
		// index: 按钮索引, style {WebviewTitleNViewButtonStyles }
		webView.setTitleNViewButtonStyle(0, {
			text: '',
			width: '35px',
			fontWeight: 'bold',
			fontSize: '18px',
			background: '#0081FF'
		});
		var view = new plus.nativeObj.View('LogoImg', { top: '30px', left: '7px', height: '35px', width: '35px' }, [
			{ tag: 'img', id: 'img', src: '/static/img/logo.png', position: { top: '0px', left: '0px', width: '100%', height: '100%' } }
		]);
		view.show();
		// #endif

		/*
		   读取缓存 LatestData
		   读取服务器，成功后刷新并缓存
		*/

		// 只加载一次
		if (!this.hasLogin) 
		this.$Router.push('/pages/login/login');

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
	},
	onShow() {
	},
	onHide() {
		//console.log('onHide');
	},
	onUnload() {
		//console.log('onUnload');// reLaunch tabbar执行
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
	bottom: 80upx;
	//left: 60upx;
	width: 100%;
	flex-direction: row;
	flex: 1;
	background-color: #fffbe8;
}
.noticebar {
	//margin-left: 90upx;
	padding: 10upx;
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
	left: 10upx;
	top: 100upx;
	width: 90upx;
	height: 70upx;
}
.user-info-box {
	//flex-direction: column;
	width: 95%;
	height: 180upx;
	//display: flex;
	align-items: center;
	position: absolute; //relative
	top: 150upx;
	z-index: 1;
	.portrait-box {
	}
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
.list-info {
	justify-content: space-around;
	align-content: center;
	//position: relative;
	position: absolute;
	right: 120upx;
	margin-top: 0upx;
	z-index: 1;
	.list-item {
		//display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: right;
		width: 100%;
		height: 120upx;
		//border-radius: 10upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	.data {
		font-size: $font-lg + 96upx;
		color: #e4e7ed; //#555;
		text-shadow: 1px 5px 5px rgba(0, 0, 0, 0.8);
	}
	.data1 {
		font-size: $font-lg;
		color: #555;
		position: absolute;
		top: 60upx;
		right: -40upx;
	}
}
.list-info-box {
	justify-content: space-around;
	align-content: center;
	position: relative;
	margin-top: 240upx;
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
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
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
.dashboard0 {
	width: 100%;
}
</style>
