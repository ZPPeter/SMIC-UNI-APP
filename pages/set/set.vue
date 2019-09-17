<template>
	<view class="container">
		<view class="first" hover-class="cell-hover" :hover-stay-time="50">
			<view class="user-section">
				<view class="portrait-box"><image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'" @click="upload"></image></view>
				<view>
					<text class="username">{{ userInfo.realname || '未登录' }}</text>
				</view>
				<button class="confirm-btn" @click="navTo('/pages/user/changePwd')" :disabled="!hasLogin">修改密码</button>
			</view>
		</view>
		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell m-t b-b" @click="navTo()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/about/about')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于系统</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 {{ version }}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout"><text class="cell-tit">退出登录</text></view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import config from '@/libs/common/config.js';
import util from '../../libs/common/utils.js';
var _self;
export default {
	data() {
		return {
			version: '1.01'
		};
	},
	onLoad() {
		if (uni.getSystemInfoSync().platform === 'android') {
			this.version = plus.runtime.version; // 打包后有效，打包前是基座的版本号
		}
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	methods: {
		...mapMutations(['logout']),
		navTo(url) {
			//util.showToast(`跳转到${url}`);
			if (url) this.$Router.push(url);
		},
		//退出登录
		toLogout() {
			uni.showModal({
				title: '系统提示',
				content: '确定要退出登录吗？',
				success: e => {
					if (e.confirm) {
						this.logout();
						setTimeout(() => {
							uni.navigateBack();
						}, 200);
					}
				}
			});
		},
		//switch
		switchChange(e) {
			let statusTip = e.detail.value ? '打开' : '关闭';
			util.showToast(`${statusTip}消息推送`);
		},
		upload() {
			_self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async function(res) {
					/*
					const tempFilePaths = res.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url: config.uploadAvatar,
						filePath: tempFilePaths[0],
						name: 'file',
						header:{
							'Authorization': 'Bearer ' + uni.getStorageSync('token')
						}, 
						formData: {
							//user:'admin'
						},
						success: function(uploadFileRes) {
							console.log(uploadFileRes);
						}
					});
					uploadTask.onProgressUpdate(function(res) {
					});
					*/
				    console.log(res.tempFiles[0]);
					var formData = new FormData();
					formData.append('file',res.tempFiles[0]);					
					const ret = await _self.$store.dispatch({
						type: 'user/uploadAvatar',
						data: formData
					});
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.user-section {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 180upx;
	//padding: 20upx 15upx 0;
	padding-left: 30upx;
	position: relative;
	.portrait-box {
		width: 120upx;
		height: 120upx;
		border: 6upx solid #fff;
		border-radius: 50%;
		position: relative;
		z-index: 2;
	}
	.portrait {
		position: relative;
		width: 100%;
		height: 100%;
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
.first {
	background-color: #449ded;
	//margin-top: -20upx;
}
.confirm-btn {
	width: 210upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 0upx;
	background: #449ded;
	color: #fff;
	font-size: $font-base;
	&:after {
		border-radius: 100px;
	}
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right: 10upx;
	}
	.cell-tip {
		font-size: $font-base;
		color: $font-color-light;
	}
	switch {
		transform: translateX(16upx) scale(0.84);
	}
}
</style>
