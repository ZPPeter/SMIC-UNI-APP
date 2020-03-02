<script>
import { mapState, mapMutations } from 'vuex';
import config from 'libs/common/config.js';
import utils from '@/libs/common/utils.js';
//import socket from 'plus-websocket';
//import * as signalR from '@aspnet/signalr';
export default {
	/*
	* globalData 属性
	* 支持vue和nvue共享数据。是目前 nvue 和 vue 共享数据的一种比较好的方式。
	* js中操作globalData的方式如下：
		赋值：getApp().globalData.text = 'test'
		取值：console.log(getApp().globalData.text) 
	    如果需要把globalData的数据绑定到页面上，可在页面的onshow声明周期里进行变量重赋值。
	* */
	globalData: {
		userInfoid: '',
		providerList: ''
	},
	computed: mapState(['hasLogin', 'userInfo']),
	data() {
		return {
			UserName: ''
		};
	},
	methods: {
		...mapMutations(['login']), // ... 扩展函数要放在其它函数后面
		CheckNetworkStatus() {
			uni.getNetworkType({
				success: function(res) {
					//console.log(res.networkType); // wifi 4g 3g 2g ethernet unknown none
					if (res.networkType === 'none') {
						// unknown 是一种网络类型
						uni.showToast({
							icon: 'none',
							title: '没有网络!!!'
						});
					}
				}
			});
		},
		async appInit(){
			let rep = await this.$store.dispatch({
				type: 'app/init'
			});
			if (rep) {
				if (rep.user) this.$store.state.user.readLastNoticeTime = rep.user.readLastNoticeTime;
			}
		}
	},
	onLaunch: function() {
		console.log('App Launch');
		//console.log((this.hasLogin));
		//console.log(config.Settings.useMockData());
		this.CheckNetworkStatus();

		try {
			// 本地缓存登录信息 userInfo
		    const res = uni.getStorageSync('userInfo');
		    if (res) {
				this.login(res); // this.hasLogin = true				
				this.UserName = res.realname;
				this.appInit();
		    }
		} catch (e) {
		    // error
		}
		
		// uni.getStorage({//异步， uni.getStorageSync 同步
		// 	key: 'userInfo',
		// 	success: res => {
		// 		this.login(res.data); // this.hasLogin = true
		// 		console.log(res.data);
		// 		this.UserName = res.data.realname;
		// 		this.appInit();	
		// 	}
		// });	
		
		this.$signalR.connection(config.SignalR);
		
		// 检测升级
		utils.checkUpdate();
		utils.getProvider();	
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	created: function() {
		// App.vue 不支持 OnLoad()
		console.log('App created');
		
		try {
		    const res = uni.getSystemInfoSync(); // 同步
		    if(res.system<=8){				
				plus.runtime.quit();
				//非阻塞模式
				//plus.nativeUI.alert("本系统运行于安卓9.0以上版本!", function(){					
				//}, "提示", "确定");				
		    }
		} catch (e) {
		    // error
		}
		
		// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
		// #endif	
	}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'css/iconfont.css';
@import 'css/uni.css';
</style>
<style lang="scss">
	//@import 'css/qiun.css'; //uCharts
@font-face {
	font-family: yticon;
	font-weight: normal;
	font-style: normal;
	src: url('static/font_1078604_w4kpxh0rafi.ttf') format('truetype');
}

/*
    page {
        background-color: #4993dd;
        height: 100%;
        font-size: 28upx;
        line-height: 1.8;
    }
*/

.yticon {
	font-family: 'yticon' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-yiguoqi1:before {
	content: '\e700';
}

.icon-iconfontshanchu1:before {
	content: '\e619';
}

.icon-iconfontweixin:before {
	content: '\e611';
}

.icon-alipay:before {
	content: '\e636';
}

.icon-shang:before {
	content: '\e624';
}

.icon-shouye:before {
	content: '\e626';
}

.icon-shanchu4:before {
	content: '\e622';
}

.icon-xiaoxi:before {
	content: '\e618';
}

.icon-jiantour-copy:before {
	content: '\e600';
}

.icon-fenxiang2:before {
	content: '\e61e';
}

.icon-pingjia:before {
	content: '\e67b';
}

.icon-daifukuan:before {
	content: '\e68f';
}

.icon-pinglun-copy:before {
	content: '\e612';
}

.icon-dianhua-copy:before {
	content: '\e621';
}

.icon-shoucang:before {
	content: '\e645';
}

.icon-xuanzhong2:before {
	content: '\e62f';
}

.icon-gouwuche_:before {
	content: '\e630';
}

.icon-icon-test:before {
	content: '\e60c';
}

.icon-icon-test1:before {
	content: '\e632';
}

.icon-bianji:before {
	content: '\e646';
}

.icon-jiazailoading-A:before {
	content: '\e8fc';
}

.icon-zuoshang:before {
	content: '\e613';
}

.icon-jia2:before {
	content: '\e60a';
}

.icon-huifu:before {
	content: '\e68b';
}

.icon-sousuo:before {
	content: '\e7ce';
}

.icon-arrow-fine-up:before {
	content: '\e601';
}

.icon-hot:before {
	content: '\e60e';
}

.icon-lishijilu:before {
	content: '\e6b9';
}

.icon-zhengxinchaxun-zhifubaoceping-:before {
	content: '\e616';
}

.icon-naozhong:before {
	content: '\e64a';
}

.icon-xiatubiao--copy:before {
	content: '\e608';
}

.icon-shoucang_xuanzhongzhuangtai:before {
	content: '\e6a9';
}

.icon-jia1:before {
	content: '\e61c';
}

.icon-bangzhu1:before {
	content: '\e63d';
}

.icon-arrow-left-bottom:before {
	content: '\e602';
}

.icon-arrow-right-bottom:before {
	content: '\e603';
}

.icon-arrow-left-top:before {
	content: '\e604';
}

.icon-icon--:before {
	content: '\e744';
}

.icon-zuojiantou-up:before {
	content: '\e605';
}

.icon-xia:before {
	content: '\e62d';
}

.icon--jianhao:before {
	content: '\e60b';
}

.icon-weixinzhifu:before {
	content: '\e61a';
}

.icon-comment:before {
	content: '\e64f';
}

.icon-weixin:before {
	content: '\e61f';
}

.icon-fenlei1:before {
	content: '\e620';
}

.icon-erjiye-yucunkuan:before {
	content: '\e623';
}

.icon-Group-:before {
	content: '\e688';
}

.icon-you:before {
	content: '\e606';
}

.icon-forward:before {
	content: '\e607';
}

.icon-tuijian:before {
	content: '\e610';
}

.icon-bangzhu:before {
	content: '\e679';
}

.icon-share:before {
	content: '\e656';
}

.icon-yiguoqi:before {
	content: '\e997';
}

.icon-shezhi1:before {
	content: '\e61d';
}

.icon-fork:before {
	content: '\e61b';
}

.icon-kafei:before {
	content: '\e66a';
}

.icon-iLinkapp-:before {
	content: '\e654';
}

.icon-saomiao:before {
	content: '\e60d';
}

.icon-shezhi:before {
	content: '\e60f';
}

.icon-shouhoutuikuan:before {
	content: '\e631';
}

.icon-gouwuche:before {
	content: '\e609';
}

.icon-dizhi:before {
	content: '\e614';
}

.icon-fenlei:before {
	content: '\e706';
}

.icon-xingxing:before {
	content: '\e70b';
}

.icon-tuandui:before {
	content: '\e633';
}

.icon-zuanshi:before {
	content: '\e615';
}

.icon-zuo:before {
	content: '\e63c';
}

.icon-shoucang2:before {
	content: '\e62e';
}

.icon-shouhuodizhi:before {
	content: '\e712';
}

.icon-yishouhuo:before {
	content: '\e71a';
}

.icon-dianzan-ash:before {
	content: '\e617';
}

view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
	box-sizing: border-box;
}
/* 骨架屏替代方案 */
.Skeleton {
	background: #f3f3f3;
	padding: 20upx 0;
	border-radius: 8upx;
}

/* 图片载入替代方案 */
.image-wrapper {
	font-size: 0;
	background: #f3f3f3;
	border-radius: 4px;

	image {
		width: 100%;
		height: 100%;
		transition: 0.6s;
		opacity: 0;

		&.loaded {
			opacity: 1;
		}
	}
}

.clamp {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;
}

.common-hover {
	background: #f5f5f5;
}

/*边框*/
.b-b:after,
.b-t:after {
	position: absolute;
	z-index: 3;
	left: 0;
	right: 0;
	height: 0;
	content: '';
	transform: scaleY(0.5);
	border-bottom: 1px solid $border-color-base;
}

.b-b:after {
	bottom: 0;
}

.b-t:after {
	top: 0;
}

/* button样式改写 */
uni-button,
button {
	height: 80upx;
	line-height: 80upx;
	font-size: $font-lg + 2upx;
	font-weight: normal;

	&.no-border:before,
	&.no-border:after {
		border: 0;
	}
}

uni-button[type='default'],
button[type='default'] {
	color: $font-color-dark;
}

/* input 样式 */
.input-placeholder {
	color: #999999;
}

.placeholder {
	color: #999999;
}
</style>
