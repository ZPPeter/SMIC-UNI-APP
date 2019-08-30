<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">你好，</view>
			<view class="welcome1">欢迎登录测绘仪器智检系统</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">账&nbsp;号:</text>					
					<input 
						type="text" 
						v-model="userNameOrEmailAddress" placeholder="请输入账号"
					/>					
				</view>
				<view class="input-item">
					<text class="tit">密&nbsp;码:</text>
					<input 
						type="password"
						v-model="password" placeholder="请输入密码"
						@confirm="toLogin"
					/>					
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section"><text @click="toForgetPassword">忘记密码?</text></view>
		</view>
		<view class="version">版本:{{ version }}</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
import request from '@/libs/ajax/request.js';
export default {
	data() {
		return {
			userNameOrEmailAddress: 'admin',
			password: '123qwe',
			logining: false,
			version: '1.01'
		};
	},
	onLoad() {
		if (uni.getSystemInfoSync().platform === 'android') {
			this.version = plus.runtime.version; // 打包后有效，打包前是基座的版本号
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
				title: '请联系管理员重置密码'
			});
		},
		async toLogin() {
			if (this.userNameOrEmailAddress.length < 5) {
				uni.showToast({
					icon: 'none',
					title: '账号最短为 5 个字符'
				});
				return;
			}
			if (this.password.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 6 个字符'
				});
				return;
			}
			this.logining = true;
			const data = {
				userNameOrEmailAddress: this.userNameOrEmailAddress,
				password: this.password,
				rememberMe: true
			};
			const res = await request.Login(data);
			if (res === 'OK') {
				const userInfo = {
					id:99,
					userName: this.userNameOrEmailAddress,
					realname: '管理员',
					portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
				};
				this.login(userInfo);
				uni.navigateBack();
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
	font-size: 120upx;
	color: $page-color-base;
	position: relative;
	left: 10upx;
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
	top: -90upx;
	font-size: 46upx;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.welcome1 {
	position: relative;
	left: 50upx;
	top: -90upx;
	font-size: 30upx;
	color: #C0C0C0
}
.input-content {
	padding: 0 60upx;
}
.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30upx;
	background: $page-color-light;
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
</style>