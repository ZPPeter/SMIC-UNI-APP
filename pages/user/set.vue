<template>
	<view class="container">
		<view class="first" hover-class="cell-hover" :hover-stay-time="50">
			<view class="user-section">
				<view class="portrait-box"><image class="portrait" :src="userInfo.portrait || '/static/img/missing-face.png'" @click="uploadPortrait"></image></view>
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
			<switch disabled="true" :checked="useMockData" color="#fa436a" @change="switchChangeMk" />
		</view>
		<view class="list-cell m-t b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<view style="padding: 0upx;">
				<text style="padding-right: 20px;">{{ tempSize }}</text>
				<button class="cu-btn bg-green shadow" @tap="clearStorage">清除</button>
			</view>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/about/about')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于系统</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="checkUpdate()" hover-class="cell-hover" :hover-stay-time="50">
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
import utils from '@/libs/common/utils.js';
// var VConsole = require('@/libs/common/vconsole.min.js');
// var vConsole = new VConsole(); // 不支持 APP+
var _self;
export default {
	data() {
		return {
			version: '1.01',
			useMockData: false,
			tempSize: ''
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
		this.getTempSize();
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
			//utils.showToast(`跳转到${url}`);
			if (url) this.$Router.push(url);
		},
		async checkUpdate() {
			// 检测升级
			uni.showToast({
				icon:'loading',
				title: '检测升级...',
				duration:2000
			});
			let ret = await utils.checkUpdate(); 
			uni.hideToast();
			if (ret == '"none"')
				uni.showToast({
					icon:'none',
					title: '当前版本已是最新版本。'
				});
		},
		getTempSize() {// 使用plus.cache.calculate 获取应用的缓存大小			
			// 没有计算 Doc 目录			
			//SaveFile会删除临时文件
			//官方：临时文件问题已经优化，会自动清理，不用手动处理
			//删除本地_doc/uniapp_save路径下面存储的文件
			/*
			uni.getSavedFileList({
			  success: function (res) {
			    if (res.fileList.length > 0) {
			      uni.removeSavedFile({
			        filePath: res.fileList[0].filePath,
			        complete: function (res) {
			          console.log(res);
			        }
			      });
			    }
			  }
			});
			*/
			uni.getSavedFileList({
				// _doc/uniapp_save
				success: function(res) {
					//console.log(JSON.stringify(res.fileList));
				}
			});

			var self = this;
			plus.cache.calculate(function(size) {// _doc 路径之外的缓存文件
				//size是多少个字节单位是b
				//你可以做下面相应的处理
				if (size < 1024) {
					self.tempSize = size + 'B';
				} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
					self.tempSize = Math.floor((size / 1024) * 100) / 100 + 'KB';
				} else if (size / 1024 / 1024 >= 1) {
					self.tempSize = Math.floor((size / 1024 / 1024) * 100) / 100 + 'M';
				}
			});
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
							//uni.navigateBack();
							uni.switchTab({
								url: '/pages/main/main'
							});
						}, 200);
					}
				}
			});
		},
		//switch
		switchChange(e) {
			let statusTip = e.detail.value ? '打开' : '关闭';
			utils.showToast(`${statusTip}消息推送`);
		},
		switchChangeMk(e) {
			uni.setStorage({
				key: 'useMkData',
				data: e.detail.value
			});
		},
		clearStorage() {
			// Cache 非 Storage
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '确定清除缓存吗?',
				success(res) {
					// 用户确定要删除
					if (res.confirm) {
						//使用plus.cache.clear 清除应用中的缓存数据 这里清除后还要二十几KB没有清除，达不到全部清除
						plus.cache.clear(function() {
							uni.showToast({
								title: '清除成功',
								icon: 'none',
								success() {
									//成功后处理
									_this.tempSize = '';
								}
							});
						});
					}
				}
			});
			/*
			uni.getStorageInfo({
				success: function(res) {
					console.log(res.keys);
					console.log(res.currentSize); // kb
					console.log(res.limitSize); // kb
				}
			});
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
			//uni.removeStorage({
			//	key: 'LatestData'
			//});
			uni.removeStorage({
				key: 'ChartsData'
			});*/
		},
		uploadPortrait() {
			_self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async function(res) {
					let tempFilePath = res.tempFilePaths[0];
					// console.log(tempFilePath);
					// #ifdef APP-PLUS
					// 不管大小都执行压缩操作，取得固定文件名称
					_self.compressImage(tempFilePath, 'logo.png');
					/*
					if (res.tempFiles[0].size / 1000 > 20)
						// 大于 20k 压缩
						_self.compressImage(tempFilePath, 'logo.png');
					else _self.uploadFile(tempFilePath);
					*/
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
		},
		compressImage(url, filename) {
			// _doc/logo/logo.png
			_self = this;
			var path = '_doc/logo/' + filename; //_doc/upload/F_SMP-1467602809090.jpg
			// var path = "_www/img/" + filename; //_doc/upload/F_SMP-1467602809090.jpg
			// 打包后 _www 只读，_doc目录可操作
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
					_self.userInfo.portrait = event.target;
					//console.log(event.target);
					_self.uploadFile(event.target); // 上传到服务器
				},
				function(error) {
					console.log('Compress error!' + error.message);
				}
			);
		},
		uploadFile(tempFilePath) {
			// 上传到服务器
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
					// compressImage() 已经获取固定文件路径 uni.saveFile 不能指定文件名
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
		}
	},
	onShow() {
		if (!this.hasLogin) {
			// 避免取消登录
			this.$Router.push('/pages/login/login');
		}
		uni.hideKeyboard(); // 无效???
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
