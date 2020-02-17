<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 12px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">待批准记录列表：显示0条记录。</view>
		</view>
		<view class="list_items" v-for="items in list_items" :key="items.id">
			<view class="list-info">
				<view><image class="portrait" :src="'/static/ins/0.png'"></image></view>
				<view class="content">
					<view>
						<h4 class="xhgg">{{ items.xhgg }} / {{ items.ccbh }}</h4>
					</view>
					<p class="wtdw">送检单位：{{ items.wtdw }}</p>
					<p class="wtdw">检定期限：{{ items.yqjcrq }}</p>
					<p class="wtdw">检定:【{{ items.jdy }}】  核验:【{{ items.hyy }}】</p>
				</view>
			</view>
		</view>
		<button class="btnrightbottom">全部批准</button>
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
					jdy:'张九三',
					hyy:'李四四'
				},
				{
					id: 1,
					img: 0,
					xhgg: 'GTS-201N',
					ccbh: '23345',
					wtdw: '青岛市莱西地图测绘院',
					yqjcrq: '2019-09-21',
					jdy:'张三一',
					hyy:'李四四'					
				}
			]
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	methods: {},
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
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('LogoImg');
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100);
			}
		}		
		if (!this.hasLogin) {
			this.$Router.push('/pages/login/login');
		}
		else{			
			if(!this.userInfo.roles.includes('批准')){
				uni.showModal({
					title:'提示',
					content:'您没有批准权限！',
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							uni.switchTab({
								url:'/pages/main/main'
							})
						}
					}
				})
			} 
		}
	}
};
</script>

<style lang="scss">
.btnrightbottom{
	position: absolute;
	right: 40upx;
	bottom: 40upx;
	width: 210upx;
	height: 80upx;	

	border-radius: 50px;
	margin-top: 70upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: 24upx;
	&:after {
		border-radius: 100px;
	}	
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
