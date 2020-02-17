<template>
	<view class='contents'>
		<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
		 @touchcancel='cancel' @longpress='tap' disable-scroll='true' @error='error'>
		</canvas>
		<view class="caozuo">
			<image class="sign" :src="signImage"></image>
			<view class="chongqian" @tap='clearClick'>
				重签
			</view>
			<view class="over" @tap="overSign">
				完成签名
			</view>
		</view>
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvash = res.windowWidth;
			canvasw = res.windowHeight;
		},
	})
	export default {
		data() {
			return {
				signImage: '',
				isEnd: false // 是否签名
			}
		},

		methods: {
			overSign: function() {
				if (this.isEnd) {
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',

						success: function(res) {
							//打印图片路径
							console.log(res.tempFilePath)
							console.log('完成签名')
							//设置图片
							_that.signImage = res.tempFilePath
							console.log(_that.signImage);
						}
					})
				} else {
					uni.showToast({
						title: '请先完成签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}

			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				console.log("触摸开始" + event.changedTouches[0].x)
				console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},

			error: function(e) {
				console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				console.log(touchs[0],touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			plus.screen.lockOrientation('landscape-secondary'); //锁定
			/*
			锁定屏幕方向可取以下值： 
			"portrait-primary": 竖屏正方向； 
			"portrait-secondary": 竖屏反方向，屏幕正方向按顺时针旋转180°； 
			"landscape-primary": 横屏正方向，屏幕正方向按顺时针旋转90°； 
			"landscape-secondary": 横屏方向，屏幕正方向按顺时针旋转270°； 
			"portrait": 竖屏正方向或反方向，根据设备重力感应器自动调整； 
			"landscape": 横屏正方向或反方向，根据设备重力感应器自动调整；
			*/
			_that = this;
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas');
			//设置线的颜色
			content.setStrokeStyle("#000");
			//设置线的宽度
			content.setLineWidth(5);
			//设置线两端端点样式更加圆润
			content.setLineCap('round');
			//设置两条线连接处更加圆润
			content.setLineJoin('round');
		},
		onHide() {
			console.log('Hide ...'); // 不起作用
		},
		onUnload() {
			//plus.screen.unlockOrientation(); //取消锁定 不起作用
			plus.screen.lockOrientation("portrait-primary");
		},
		onBackPress() {
			//console.log('Back ...');
		}
	}
</script>

<style lang="scss">
	.sign{
		width: 90px; 
		height: 30px;
		background-color: #F0AD4E;
	}
	.ts {
		color: #FF485D;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		background-color: #DDDDDD;
		width: 1200upx;
		margin: 0 25upx;
		//height: calc(100vh - 140upx); 动态会第一笔没有
		height: 455upx;
	}

	.contents {
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	#signatureImg {
		background-color: #EEEEEE;
	}

	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.caozuo view {
		width: 375upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		color: #FFFFFF;
	}

	.caozuo view:active {
		background-color: #CCCCCC;
		color: #333333;
	}

	.chongqian {
		background-color: #FF8F58;
	}

	.over {
		background-color: #0599D7;
	}
</style>
