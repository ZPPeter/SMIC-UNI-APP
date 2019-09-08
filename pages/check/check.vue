<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 6px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">待核验记录列表：显示{{ lstlength }}条记录。</view>
		</view>
		<view class="list_items" v-for="items in list_items" :key="items.id">						
							<view class="user-info-box">
								<view class="portrait"><img :src="'../../../static/ins/0.png'"/></view>
								<view class="username">
									<view class="mui-clearfix">
										<h4 class="oa-contact-name">{{ items.xhgg }} /{{ items.ccbh }}</h4>
									</view>
									<p class="oa-contact-email mui-h6">送检单位：{{ items.wtdw }}</p>
									<p class="oa-contact-email mui-h6">检定期限：{{ items.yqjcrq }}</p>
									<p class="oa-contact-email mui-h6">检定人员：{{ items.jdy }}</p>
								</view>
							</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			lstlength: 0,
			list_items: [
				{
					id: 0,
					img:1,
					xhgg:'SET2B',
					ccbh:'10056',
					wtdw:'山东省地质测绘院',
					yqjcrq:'2019-09-21',
					jdy:'王大年'
				},
				{
					id: 1,
					img:2,
					xhgg:'GTS-201N',
					ccbh:'23345',
					wtdw:'青岛市莱西地图测绘院',
					yqjcrq:'2019-09-21',
					jdy:'王大年'
				}				
			]
		};
	},
	methods: {},
	onShow() {
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('icon');
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100);
			}
		}
	}
};
</script>

<style type="text/css">
.font-seal0 {
	font-size: 12px;
	z-index: 2;
	position: absolute;
	right: -6px;
	top: 20px;
	border: 0px;
	transform: rotate(45deg);
	width: 53px;
	line-height: 20px;
	text-align: center;
	color: white;
	font-weight: bold;
}
.font-seal {
	font-size: 12px;
	z-index: 2;
	position: absolute;
	right: 14px;
	top: 42px;
	border: 1px solid #f73a3c;
	transform: rotate(45deg);
	width: 53px;
	line-height: 20px;
	text-align: center;
	color: #f73a3c;
	font-weight: bold;
}
.triangle-topright {
	position: absolute;
	right: 5px;
	top: 15px;
	width: 0;
	height: 0;
	border-top: 44px solid #fd9d2d;
	border-left: 2rem solid transparent;
}
.triangle-topright.add_wtd {
	border-top: 44px solid #56cf87;
}
.triangle-topright.working_wtd {
	border-top: 44px solid skyblue;
}
.triangle-topright.over_wtd {
	border-top-color: #cccccc;
}
.rectangle2 {
	width: 3px;
	height: 16px;
	margin-top: 7px;
	background-color: #45a6fc;
	margin-right: 5px;
	display: inline;
}
.div-inline {
	display: inline;
}
</style>
<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.user-info-box {
	height: 210upx;
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
		font-size: $font-base;
		color: $font-color-dark;
		margin-left: 20upx;
	}
	.list_items{
		margin-top:21upx;
		border: 2px #0A98D5 solid;
	}
}	
</style>
