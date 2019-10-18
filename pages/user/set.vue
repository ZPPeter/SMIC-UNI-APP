<template>
	<view class="container">
		<view class="first" hover-class="cell-hover" :hover-stay-time="50">
			<view class="user-section">
				<view class="portrait-box"><image class="portrait" :src="userInfo.portrait || '/static/img/missing-face.png'" @click="upload"></image></view>
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
		<view class="list-cell m-t">
			<text class="cell-tit">数据模拟</text>
			<switch :checked="useMockData" color="#fa436a" @change="switchChangeMk" />
		</view>
		<view class="list-cell m-t b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<view style="padding: 0upx;"><button class="cu-btn bg-green shadow" @tap="clearStorage">确认</button></view>
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
// var VConsole = require('@/libs/common/vconsole.min.js');
// var vConsole = new VConsole(); // 不支持 APP+
var _self;
export default {
	data() {
		return {
			version: '1.01',
			useMockData: false
		};
	},
	onLoad() {
		if (!this.hasLogin) {
			this.$Router.push('/pages/login/login');
		}
		if (uni.getSystemInfoSync().platform === 'android') {
			this.version = plus.runtime.version; // 打包后有效，打包前是基座的版本号
		}
		this.useMockData = config.Settings.useMockData();
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	methods: {
		...mapMutations(['logout']),
		//useMockData(){
		//	return config.Settings.useMockData();
		//},
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
		switchChangeMk(e) {
			uni.setStorage({
				key: 'useMkData',
				data: e.detail.value
			});
		},
		clearStorage() {
			// uni.clearStorage();
			// this.useMockData = false;
			
			let _this = this;
			uni.removeStorage({
				key: 'useMkData',
				success() {
					_this.useMockData = false;
					//console.log(config.Settings.useMockData());
				}
			});
			uni.removeStorage({
				key: 'LatestData'
			});
			uni.removeStorage({
				key: 'ChartsData'
			});
		},
		uploadFile(tempFilePath) {
			_self = this;
			var savedFilePath = '';
			const uploadTask = uni.uploadFile({
				url: config.uploadAvatar,
				filePath: tempFilePath,
				name: 'file',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				formData: {
					//user:'admin'
				},
				success: function(res) {
					// #ifdef APP-PLUS
					uni.saveFile({
						tempFilePath: tempFilePath,
						success: function(res) {
							savedFilePath = res.savedFilePath;
							_self.userInfo.portrait = savedFilePath;
							//console.log(savedFilePath);
						}
					});
					// #endif
					// #ifdef H5
					_self.userInfo.portrait = tempFilePath;
					// #endif
				},
				fail(err) {
					//console.log(err);
					uni.showToast({
						icon: 'none',
						title: err
					});
					reject(err);
				}
			});
			uploadTask.onProgressUpdate(function(res) {});

			/* 微信版 fly 不支持 FormData 参数
				    console.log(res.tempFiles[0]);
					var formData = new FormData();
					formData.append('file',res.tempFiles[0]);
					const ret = await _self.$store.dispatch({
						type: 'user/uploadAvatar',
						data: formData
					});
					*/
		},
		compressImage(url, filename) {
			_self = this;
			var path = '_doc/logo/' + filename; //_doc/upload/F_SMP-1467602809090.jpg
			// var path = "_www/img/" + filename; //_doc/upload/F_SMP-1467602809090.jpg //打包后 _www 只读
			// console.log(url); //file:///storage/emulated/0/Pictures/Screenshots/S70915-001739.jpg
			// console.log(filename);
			// console.log(path);
			plus.zip.compressImage(
				{
					src: url, //src: (String 类型 )压缩转换原始图片的路径
					dst: path, //压缩转换目标图片的路径
					width: '270px', //将图片压缩为大小
					quality: 20, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
					overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件
				},
				async function(event) {
					//event.target获取压缩转换后的图片url路
					//console.log(event.size);
					_self.uploadFile(event.target);
				},
				function(error) {
					console.log('Compress error!' + error.message);
				}
			);
		},
		upload() {
			_self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async function(res) {
					let tempFilePath = res.tempFilePaths[0];
					// console.log(tempFilePath);
					// #ifdef APP-PLUS
					if (res.tempFiles[0].size / 1000 > 20)
						// 大于 20k 压缩
						// 大于20k压缩
						_self.compressImage(tempFilePath, 'logo.png');
					else _self.uploadFile(tempFilePath);
					// #endif

					// #ifdef H5
					_self.uploadFile(tempFilePath);
					// #endif
				},
				fail(err) {
					//console.log(err);
					uni.showToast({
						icon: 'none',
						title: err
					});
					reject(err);
				}
			});
		}
	},
	onShow() {
		if (!this.hasLogin) {
			// 避免取消登录
			this.$Router.push('/pages/login/login');
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
	border-radius: 20px;
	margin-top: 0upx;
	background-color: lightslategray; // #449ded;
	color: #fff;
	font-size: $font-base;
	&:after {
		border-radius: 20px;
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
