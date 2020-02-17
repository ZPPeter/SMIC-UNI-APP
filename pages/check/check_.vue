<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 12px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">待核验记录列表：显示{{ lstlength }}条记录。</view>
		</view>
		<view class="list_items" v-for="items in list_items" :key="items.id">
			<view class="list-info">
				<view><image class="portrait" :src="'/static/ins/0.png'" mode="widthFix"></image></view>
				<view class="content">
					<view>
						<h4 class="xhgg">{{ items.xhgg }} / {{ items.ccbh }}</h4>
					</view>
					<p class="wtdw">送检单位：{{ items.wtdw }}</p>
					<p class="wtdw">检定期限：{{ items.yqjcrq }}</p>
					<p class="wtdw">检定人员：{{ items.jdy }}</p>
				</view>
			</view>
		</view>
		<view class="fab-box fab">
			<view  class="fab-circle" @click="doScan">
				<text class="iconfont icon-saoma1 fontsize"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import ShowHomeData from '@/libs/ShowHomeData.js';
export default {
	data() {
		return {
			lstlength: 0,
			showImg: true,
			list_items: [
				{
					id: 0,
					img: 1,
					xhgg: 'SET2B',
					ccbh: '10056',
					wtdw: '山东省地质测绘院',
					yqjcrq: '2019-09-21',
					jdy:'王大年'
				},
				{
					id: 1,
					img: 0,
					xhgg: 'GTS-201N',
					ccbh: '23345',
					wtdw: '青岛市莱西地图测绘院',
					yqjcrq: '2019-09-21',
					jdy:'王大年'
				}
			]
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	onNavigationBarButtonTap(e) {
		const index = e.index;
		// console.log(index);
		if (index === 0) {
			this.$Router.push('/pages/wtd/wtd');
		} else if (index === 1) {
		}
	},
	methods: {
		doScan(){
			if (this.hasLogin) {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			} else this.$Router.push('/pages/login/login');
		}		
	},
	onLoad() {
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
		// #endif
		//let showHomeData = new ShowHomeData.ShowHomeData();
		//showHomeData.showData();
	},
	onShow() {
		if (!this.hasLogin) {
			this.$Router.push('/pages/login/login');
		}
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('LogoImg');
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100);
			}
		}		
	}
};
</script>

<style lang="scss">
	.fab-box {
		position: absolute;
		right: 40upx;
		bottom: 40upx;
		width: 90upx;
		height: 90upx;	
		//position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	.fab-box.fab {
		z-index: 10;
	}

	.fab-circle {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 110upx;
		height: 110upx;
		background:dodgerblue;
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

	.fontsize{
		//color:white;
		//font-size: 40upx;
		color: #ffffff;
		font-size: 50upx;
		transition: all 0.3s;
		font-weight: bold;		
	}
.tj-item {	
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.list_items{
	margin: 21upx;
	background-color:#F8F8F8;
	//margin-top:21upx;
	border: 1px #DCDCDC solid;
}
.list-info{
	//height: 210upx;
	padding: 12upx 15upx;
	//box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		//margin-left: 21upx;
		width: 108upx;
		height: 108upx;
		border: 2upx solid lightgrey;
		border-radius: 50%;
		background-color: #8f8f94;
	}
	.content{
		font-size: $font-base;
		color: $font-color-dark;
		margin-left: 20upx;
		.xhgg {
			font-size: 32upx;
		}
		.wtdw {
			font-size: 26upx;
			color: #8f8f94;
		}
	}
}
</style>
