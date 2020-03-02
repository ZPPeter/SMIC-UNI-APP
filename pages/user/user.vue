<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/img/user-bg.jpg"></image>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/img/vip-card-bg.png" mode=""></image>
				<view class="b-btn" @click="showOpenSrcInfo()">关于系统</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					SMIC.测绘仪器检定系统
				</view>
				<text class="e-m">公正&nbsp;科学&nbsp;准确&nbsp;可靠</text>
				<text class="e-b">精心.精细.精准.精益求精，测绘仪器数据处理系统。</text>
			</view>
		</view>
		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/img/arc.png"></image>
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">{{Datas[1]}}</text>					
					<text class="qjmc">全站仪</text>
					<text class="num">{{Datas[0]}}</text>
				</view>
				<view class="tj-item">
					<text class="num">{{Datas[9]}}</text>
					<text class="qjmc">GPS接收机</text>
					<text class="num">{{Datas[8]}}</text>
				</view>
				<view class="tj-item">
					<text class="num">{{Datas[3]+Datas[5]}}</text>
					<text class="qjmc">经纬仪</text>
					<text class="num">{{Datas[2]+Datas[4]}}</text>
				</view>
				<view class="tj-item">
					<text class="num">{{Datas[7]}}</text>
					<text class="qjmc">水准仪</text>
					<text class="num">{{Datas[6]}}</text>
				</view>
				<view class="tj-item">
					<text class="num">{{Datas[11]}}</text>
					<text class="qjmc">手持测距仪</text>
					<text class="num">{{Datas[10]}}</text>
				</view>				
			</view>
			<view class="history-section icon">
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="检定地点管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<list-cell icon="icon-gongwenchuli" iconColor="#5fcda2" title="操作日志" @eventClick="navTo2('/pages/czrz/czrz')"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="系统设置" border="" @eventClick="navTo2('/pages/user/set')"></list-cell>
			</view>
		</view>
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import util from '../../libs/common/utils.js';
import { mapState } from 'vuex';
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		listCell
	},
	data() {
		return {
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			Datas: [0,0,0,0,0,0,0,0,0,0,0,0]
		};
	},
	onReady() {
		//onLoad  1
		//onShow  2
		//onReady 3
	},
	onShow() {
		// #ifdef APP-PLUS
		const pages = getCurrentPages();
		const page = pages[pages.length - 1];
		const currentWebview = page.$getAppWebview();
		//console.log(this.$store.state.user.newNotices);
		if (this.$store.state.user.newNotices > 0) currentWebview.showTitleNViewButtonRedDot({ index: 3 }); // 新消息
		// #endif
	},
	onError(err) {
		// 这里只能捕获方法内的异常，不能捕获生命周期中的逻辑异常
		// 不能捕获Unhandled promise rejection
		console.log(err);
	},
	onLoad() {
		this.getCountData();
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
		}
		else if (index === 1) {
			uni.switchTab({
				url:'/pages/main/main'
			})
		}
		else if (index === 2) {
			this.navTo('/pages/user/set');
		}
		else if (index === 3) {
			// 消息红点
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			uni.hideTabBarRedDot({
				index: 4
			});
			// #endif
			//uni.navigateTo({
			//	url: '/pages/notice/notice'
			//});
			this.navTo('/pages/notice/notice');
		}
		
	},
	// #endif
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	methods: {
		async getCountData(){
			const res = await this.$store.dispatch({
				type: 'sjmx/getStatsData'				
			});
			if (res != '') {
				//this.Datas = [];
				//this.Datas = this.Datas.concat(res)
				this.Datas = res;
			}
		},
		navTo(url) {
			uni.navigateTo({
				url:url
			})
		},
		navTo2(url) {
			uni.navigateTo({ url: url }); // 不传递 query 参数，uni.chooseImage 不会引发 unhandled promise rejection
		},
		navTo3(url) {
			if(!this.userInfo.roles.includes('ADMIN'))
			  return;
			uni.navigateTo({ url: url });
		},
		showOpenSrcInfo() {
			this.navTo('/pages/about/about');
			/*
			util.showToast(`  Copyright (c) 2019 SMIC is licensed 
			under the Mulan PSL v1.You can use  
			this software according to the terms
			and conditions of the Mulan PSL v1.`);
			*/
		},
		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 55 && moveDistance < 80) {
				moveDistance = 55;
			}

			if (moveDistance > 0 && moveDistance <= 55) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		}
	}
};
</script>
<style lang="scss">
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}

.user-section {
	position: relative;
	height: 520upx;
	padding: 100upx 30upx 0;	
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px);
		opacity: 0.7;
	}
}
.user-info-box {
	margin-left: 290upx;
	height: 180upx;
	display: flex;
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
		font-size: $font-lg + 6upx;
		color: $font-color-dark;
		margin-left: 20upx;
	}
}

.vip-card-box {
	margin-top: 70upx;
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16upx 16upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20upx 24upx;
	.card-bg {
		position: absolute;
		top: 20upx;
		right: 0;
		width: 380upx;
		height: 260upx;
	}
	.b-btn {
		position: absolute;
		right: 20upx;
		top: 16upx;
		width: 132upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 22upx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}
	.tit {
		position: absolute;
		top: 6upx;
		font-size: $font-base + 2upx;
		color: #f7d680;
		margin-bottom: 28upx;
		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}
	.e-m {
		margin-top: 55upx;
	}	
	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10upx;
	}
}
.cover-container {
	background: $page-color-base;
	margin-top: -255upx;
	padding: 0 30upx;
	position: relative;
	background: #f5f5f5;
	padding-bottom: 20upx;
	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
}
.order-section {
	@extend %section;
	padding: 28upx 0;
	margin-top: 20upx;
	.order-item {
		@extend %flex-center;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		font-size: $font-sm;
		color: $font-color-dark;
	}
	.yticon {
		font-size: 48upx;
		margin-bottom: 18upx;
		color: #fa436a;
	}
	.icon-shouhoutuikuan {
		font-size: 44upx;
	}
}
.username {
	font-size: 46upx;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.history-section {
	padding: 30upx 0 0;
	margin-top: 20upx;
	background: #fff;
	border-radius: 10upx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;
		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;
		image {
			display: inline-block;
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
.tj-sction {
	@extend %section;
	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 210upx;
		font-size: $font-sm;
		color: #75787d;
	}
	.num {
		font-size: $font-sm+1;
		color: $font-color-dark;
		margin-bottom: 4upx;
	}
	.qjmc {
		font-size: $font-sm+1;
		//color: #da0000;
		margin-bottom: 4upx;
	}
}
</style>
