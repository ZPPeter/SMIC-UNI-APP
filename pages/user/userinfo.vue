<template>
	<view>
		<view class="box">
			<view @longpress="showModal" data-target="signModal"><image class="test" :src="userInfo.portrait"></image></view>
			<view v-show="userSign"><image class="sign" :src="userSign"></image></view>
			<view v-show="!userSign" @click="showModal" data-target="signModal">用户签名尚未设置</view>
			<view style="padding-top: 0upx;">
				<uni-notice-bar style="height:30upx;padding-left: 70upx;" show-icon="true" text="Tips：可以在设置界面修改头像。"></uni-notice-bar>
			</view>
			<view class="content">
				<view class="info">
					<text class="userinfo">{{ userInfo.realname }}</text>
				</view>
				<view class="info">
					<text class="userinfo">权限：</text>
					<text>{{ userInfo.roleNames.toString() }}</text>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName == 'signModal' ? 'show' : ''">
			<view class="signcanvas">
				<canvas
					class="firstCanvas"
					canvas-id="firstCanvas"
					@touchmove="move"
					@touchstart="start($event)"
					@touchend="end"
					@touchcancel="cancel"
					@longpress="tap"
					disable-scroll="true"
					@error="error"
				></canvas>
				<view v-show="!startsign" class="info" @tap="startSign">空白处长按开始</view>
				<view class="caozuo">
					<view class="button cancel" @tap="hideModal">取消</view>
					<view class="button chongqian" @tap="clearClick">重签</view>
					<view class="button over" @tap="overSign">完成签名</view>
				</view>
			</view>
		</view>
		<vus-layer></vus-layer>
	</view>
</template>

<script>
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import { mapState, mapMutations } from 'vuex';
import config from '@/libs/common/config.js';
var content = null;
var touchs = [];
var canvasw = 0;
var canvash = 0;
var _this;
//获取系统信息
uni.getSystemInfo({
	success: function(res) {
		canvasw = res.windowWidth;
		canvash = res.windowHeight;
	}
});
export default {
	components: {
		uniNoticeBar
	},
	data() {
		return {
			userSign: '',
			modalName: null,
			signImage: '',
			isEnd: false, // 是否签名
			startsign: false
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	onLoad() {
		this.CheckUserSign();
		//获得Canvas的上下文
		//thi.SetCanvascontent();
		_this = this;
	},
	onShow() {
		//console.log(this.userInfo.portrait);
	},
	onBackPress() {},
	onUnload() {
		/*
		let icon = plus.nativeObj.View.getViewById('LogoImg');
		if (icon) {
			setTimeout(function() {
				icon.show();
			}, 100);
		}*/
	},
	methods: {
		startSign(){
			this.startsign = true;
		},
		SetCanvascontent() {
			content = wx.createCanvasContext('firstCanvas');
			//设置线的颜色
			content.setStrokeStyle('#000');
			//设置线的宽度
			content.setLineWidth(7);
			//设置线两端端点样式更加圆润
			content.setLineCap('round');
			//设置两条线连接处更加圆润
			content.setLineJoin('round');
		},
		showModal(e) {
			//console.log(e);
			this.userSign = '';
			this.modalName = e.currentTarget.dataset.target;
			this.SetCanvascontent();
		},
		hideModal(e) {
			this.startsign = false;
			this.modalName = null;
			this.userSign = '_doc/logo/sign.png';
			//this.CheckUserSign();
		},
		CheckUserSign() {
			var relativePath = '_doc/logo/sign.png';
			//检查图片是否已存在
			plus.io.resolveLocalFileSystemURL(
				relativePath,
				function(entry) {
					_this.userSign = '_doc/logo/sign.png';
					//console.log(_this.userSign);
				},
				function(e) {
					_this.userSign = '';
					//console.log(_this.userSign);
				}
			);
		},
		/*gotoSign() {
			uni.navigateTo({
				url: '/pages/sign/sign'
			});
		},*/
		uploadFile(tempFilePath) {
			// 上传到服务器
			uni.showLoading({
				title: '正在上传...'
			});
			//console.log(config.uploadSign);
			//console.log(tempFilePath);
			const uploadTask = uni.uploadFile({
				url: config.uploadSign,
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
					//_this.userSign = '';
					_this.hideModal(); //_this.userSign = '_doc/logo/sign.png';
					uni.hideLoading();
					_this.vusui.msg('签名设置完毕!', {
						icon: 0 //0-5
					});
					/*
					uni.showToast({
						icon: 'success',
						title: '签名设置完毕!'
					});*/
				},
				fail(err) {
					//console.log(err);
					//console.log('签名上传失败: ' + err.errMsg);
					uni.hideLoading();
					_this.vusui.msg('注意：签名上传失败！错误信息：'+err.errMsg, {
						icon: 3 //0-5
					});
					/*uni.showToast({
						icon: 'none',
						title: '签名上传失败！'//err.errMsg
					});*/
					// reject(err); // ? Can't find variable: reject;at api uploadFile fail callback function
				}
			});
			uploadTask.onProgressUpdate(function(res) {});
		},
		compressImage(url, filename) {
			var path = '_doc/logo/' + filename;
			plus.zip.compressImage(
				{
					src: url, //src: (String 类型 )压缩转换原始图片的路径
					dst: path, //压缩转换目标图片的路径
					width: '80px', //将图片压缩为大小
					height: '240px',
					quality: 100, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
					//如同时设置了多个转换操作，则按缩放、旋转、裁剪顺序进行操作。
					rotate: 90, // 旋转90度
					//clip:{top:"25%",left:"25%",width:"50%",height:"50%"}		// 裁剪图片中心区域
					//format:"png"		// 将jpg转换成png格式
					overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件
				},
				async function(event) {
					//console.log(event);
					var target = event.target; // 压缩转换后的图片url路径，以"file://"开头
					var size = event.size; // 压缩转换后图片的大小，单位为字节（Byte）
					var width = event.width; // 压缩转换后图片的实际宽度，单位为px
					var height = event.height; // 压缩转换后图片的实际高度，单位为px
					_this.uploadFile(event.target);
					//_this.Image2dataURL(path);
				},
				function(error) {
					console.log('Compress error!' + error.message);
				}
			);
		},
		/**
		 * 图片文件转base64字符串
		 * @param {Object} path
		 */
		Image2dataURL(path) {
			plus.io.resolveLocalFileSystemURL(path, function(entry) {
				entry.file(
					function(file) {
						var reader = new plus.io.FileReader();
						reader.onloadend = function(e) {
							console.log(e.target.result);
						};
						reader.readAsDataURL(file);
					},
					function(e) {
						console.log('读写出现异常:' + e.message);
					}
				);
			});
		},
		overSign: function() {
			if (this.isEnd) {
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						//打印图片路径
						//console.log(res.tempFilePath);
						//console.log('完成签名');
						//设置图片
						_this.compressImage(res.tempFilePath, 'sign.png');
					}
				});
			} else {
				uni.showToast({
					title: '请先完成签名',
					icon: 'none',
					duration: 1500,
					mask: true
				});
			}
		},
		// 画布的触摸移动开始手势响应
		start: function(event) {
			this.startsign = true;
			// console.log(event)
			//console.log("触摸开始" + event.changedTouches[0].x)
			//console.log("触摸开始" + event.changedTouches[0].y)
			//获取触摸开始的 x,y
			let point = {
				x: event.changedTouches[0].x,
				y: event.changedTouches[0].y
			};
			// console.log(point)
			touchs.push(point);
		},
		// 画布的触摸移动手势响应
		move: function(e) {
			let point = {
				x: e.touches[0].x,
				y: e.touches[0].y
			};
			// console.log(point)
			touchs.push(point);
			if (touchs.length >= 2) {
				this.draw(touchs);
			}
		},
		// 画布的触摸移动结束手势响应
		end: function(e) {
			//console.log("触摸结束" + e)
			// 设置为已经签名
			this.isEnd = true;
			// 清空轨迹数组
			for (let i = 0; i < touchs.length; i++) {
				touchs.pop();
			}
		},

		// 画布的触摸取消响应
		cancel: function(e) {
			console.log('触摸取消' + e);
		},
		// 画布的长按手势响应
		tap: function(e) {
			this.startsign = true;
			//console.log('长按手势' + e);
		},
		error: function(e) {
			console.log('画布触摸错误' + e);
		},
		//绘制
		draw: function(touchs) {
			//console.log(touchs[0],touchs[1])
			let point1 = touchs[0];
			let point2 = touchs[1];
			touchs.shift();
			content.moveTo(point1.x, point1.y);
			content.lineTo(point2.x, point2.y);
			content.stroke();
			content.draw(true);
		},
		//清除操作
		clearClick: function() {
			// 设置为未签名
			this.isEnd = false;
			this.startsign = false;
			//清除画布
			content.clearRect(0, 0, canvasw, canvash);
			content.draw(true);
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
@mixin calc-width($w) {
	width: $w / 750 * 100;
}
@mixin calc-height($h) {
	height: $h / 750 * 100;
}
#signatureImg {
	background-color: white; //#eeeeee;
}
canvas {
	background-color: white; //#dddddd;
	width: calc((100vh - 70upx) / 2.5);
	margin: 25upx;
	height: calc(100vh - 110upx);
	//height: 655upx;
}
.sign {
	width: 150px;
	height: 50px;
	//background-color: #F0AD4E;
}
.box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40upx 30upx 0;
	position: relative;
}
.test {
	border: 16upx solid #fff;
	border-radius: 5%;
	background-color: dodgerblue;
	@include calc-width(560vw);
	@include calc-height(640vw);
}
.content {
	@include calc-width(560vw);
	font-size: $font-base;
	color: $font-color-dark;
	margin-left: 0upx;
	.info {
		font-size: $font-base;
		color: #8f8f94;
		padding-left: 8upx;
	}
}
.userinfo {
	font-size: $font-base + 2;
	color: $font-color-dark;
	font-weight: bold;
}
.caozuo {
	width: calc(100vh - 140upx);
	display: flex;
	position: absolute;
	bottom: calc((100vh - 140upx) / 2);
	left: -50upx; //-30
	transform: rotate(270deg);
	background-color: red;
	.button {
		width: 210upx;
		height: 96upx;
		line-height: 96upx;
		border-radius: 20px;
		//margin-top: 0upx;
		font-size: $font-base;
		&:after {
			border-radius: 10px;
		}
	}
	.over {
		position: absolute;
		right: -20px;
		background-color: #0599d7;
	}
	.chongqian {
		position: absolute;
		right: 120px;
		background-color: #ff8f58;
	}
	.cancel {
		position: absolute;
		left: 30px;
		background-color: #d5d5d5;
	}
}
.signcanvas {
	position: fixed;
	top: 30upx;
	left: 30upx;
	right: 30upx;
	bottom: 30upx;
	border-radius: 10px;
	background-color: #eeeeee;
	.info {
		white-space: nowrap;
		font-size: 156upx;
		color: #eeeeee;
		//background-color: green;
		position: absolute;
		top: 0;
		left: -90upx;
		transform: rotate(270deg) translate(-50%, -50%);
		color: transparent;
		-webkit-text-stroke: 2px #dfdfdf;
	}
}
</style>
