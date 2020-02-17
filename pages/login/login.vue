<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<image class="logo" src="/static/tlg5.jpg"></image>
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">你好，</view>
			<view class="welcome1">欢迎登录测绘仪器检定系统</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">账&nbsp;号:</text>
					<input class="zai-input" v-model="userNameOrEmailAddress" placeholder-class placeholder="请输入账号" />
				</view>
				<view class="input-item">
					<text class="tit">密&nbsp;码:</text>
					<input class="zai-input" v-model="password" placeholder-class password placeholder="请输入密码" @confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section"><text @click="toForgetPassword">忘记密码?</text></view>
		</view>
		<view class="version">版本:{{ version }}</view>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
//import request from '@/libs/ajax/request.js';
import config from '../../libs/common/config.js';
import ShowHomeData from 'libs/ShowHomeData.js';

export default {
	data() {
		return {
			userNameOrEmailAddress: 'user10',
			password: '123qwe',
			logining: false,
			version: '1.01'
		};
	},
	onBackPress() {},
	onReady() {},
	onLoad(option) {
		this.$store.state.hasLogin = false;
		//option为object类型，会序列化上个页面传递的参数
		// console.log(option.query);
		if (uni.getSystemInfoSync().platform === 'android') {
			this.version = plus.runtime.version; // 打包后有效，打包前是基座的版本号
		}
	},
	onShow() {
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('LogoImg');
			//console.log(icon);
			if (icon) {
				setTimeout(function() {
					icon.hide();
				}, 300);
			}
		}
	},
	methods: {
		...mapMutations(['login']),
		navBack() {
			uni.navigateBack();
		},
		toForgetPassword() {
			uni.showToast({
				icon: 'none',
				title: '请联系管理员重置密码!'
			});
		},
		async toLogin() {
			uni.showLoading({
				title: '登录中...'
			});
			if (this.userNameOrEmailAddress.length < 5) {
				uni.showToast({
					icon: 'none',
					title: '账号最短为 5 个字符'
				});
				uni.hideLoading();
				return;
			}
			if (this.password.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 6 个字符'
				});
				uni.hideLoading();
				return;
			}
			this.logining = true;
			const data = {
				userNameOrEmailAddress: this.userNameOrEmailAddress,
				password: this.password,
				rememberMe: true
			};
			//console.log(this.$store)
			//const res = await request.Login(data);
			const res = await this.$store.dispatch({
				type: 'app/Login',
				data: data
			});
			//console.log(res);
			if (res != '') {
				//console.log(res);
				this.$store.state.user.readLastNoticeTime = res.lastReadNoticeTime;
				var filePath = '';
				let userInfo = {
					id: res.userId,
					userName: this.userNameOrEmailAddress,
					realname: res.surName,
					roles: res.roles, //"roles": ["一般用户", "1000", "1030"],
					roleNames: res.roleNames, //"roleNames": ["一般用户", "全站仪", "GPS接收机"],
					portrait: null // config.avatarImgPath + res.userId + '.png?t=' + new Date().getTime()
					//changeAvata: false
				};

				/*
				const res2 = await this.$store.dispatch({
					type: 'app/CacheUserData'
				});
				if (res2 != '') {
					uni.setStorage({
						key: 'userData',
						data: res2
					});
				}
				*/
				
				var _this = this;
				uni.downloadFile({
					url: config.avatarImgPath + res.userId + '.png',
					success: function(res) {
						//console.log(res)
						filePath = res.tempFilePath; //下载到临时文件路径
						userInfo.portrait = filePath;
						if (res.statusCode === 200) {
							// #ifdef APP-PLUS
							uni.saveFile({
								tempFilePath: filePath,
								success: function(r) {
									filePath = r.savedFilePath;
									userInfo.portrait = filePath;
								},
								complete() {
									//console.log(userInfo.portrait);
									_this.login(userInfo); // -> ...mapMutations(['login'])
									_this.$signalR.connection(config.SignalR);
									//uni.navigateBack();
									uni.hideLoading();
									uni.switchTab({
										url: '/pages/main/main'
									});
								}
							});
							// #endif
							// #ifdef H5
							//console.log(userInfo);
							_this.login(userInfo); // -> ...mapMutations(['login'])
							uni.hideLoading();
							uni.switchTab({
								url: '/pages/main/main'
							});
							// #endif
						}
					}
				});
				//this.$Router.replace({ name: 'notice'}); //从 notice 返回不到 设置界面
				//this.$Router.push({ name: 'notice'}); // 缓存 login
				let showHomeData = new ShowHomeData.ShowHomeData();
				showHomeData.showData();
			} else {
				this.logining = false;
			}
		}
	}	
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.zai-input {
	background: #e2f5fc;
	margin-top: 10upx;
	border-radius: 100upx;
	padding: 10upx 20upx;
	font-size: 36upx;
}
.container {
	padding-top: 115px;
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #fff;
}
.wrapper {
	position: relative;
	z-index: 90;
	background: #fff;
	padding-bottom: 40upx;
}
.back-btn {
	position: absolute;
	left: 40upx;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 40upx;
	font-size: 40upx;
	color: $font-color-dark;
}
.left-top-sign {
	font-size: 80upx;
	color: $page-color-base;
	position: relative;
	left: 380upx;
	top: -10upx;
}
.right-top-sign {
	position: absolute;
	top: 80upx;
	right: -30upx;
	z-index: 95;
	&:before,
	&:after {
		display: block;
		content: '';
		width: 400upx;
		height: 80upx;
		background: lightsteelblue; /*#b4f3e2*/
	}
	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}
	&:after {
		position: absolute;
		right: -198upx;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}
.left-bottom-sign {
	position: absolute;
	left: -270upx;
	bottom: -320upx;
	border: 100upx solid lightsteelblue; /*#d0d1fd*/
	border-radius: 50%;
	padding: 180upx;
}
.welcome {
	position: relative;
	left: 50upx;
	top: -50upx;
	font-size: 46upx;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.welcome1 {
	position: relative;
	left: 50upx;
	top: -50upx;
	font-size: 30upx;
	color: #c0c0c0;
}
.input-content {
	padding: 0 20upx;
}
.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30upx;
	height: 120upx;
	border-radius: 4px;
	margin-bottom: 50upx;
	&:last-child {
		margin-bottom: 0;
	}
	.tit {
		height: 50upx;
		line-height: 56upx;
		font-weight: 400;
		font-size: $font-sm + 12upx;
		color: $font-color-dark;
	}
	input {
		height: 60upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		width: 100%;
	}
}

.confirm-btn {
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 70upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
	&:after {
		border-radius: 100px;
	}
}
.forget-section {
	font-size: $font-sm + 2upx;
	color: $font-color-spec;
	text-align: center;
	margin-top: 40upx;
}
.version {
	position: absolute;
	left: 0;
	bottom: 50upx;
	width: 100%;
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	text-align: center;
	text {
		color: $font-color-spec;
		margin-left: 10upx;
	}
}
.logo {
	position: absolute;
	left: 60upx;
	top: -150upx;
	width: 320upx;
	height: 180upx;
	border-radius: 10px;
}
</style>
