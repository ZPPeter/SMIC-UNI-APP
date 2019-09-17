<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 12px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">送检记录列表：显示0条记录。</view>
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
			showImg: true,
			list_items: [
				{
					id: 0,
					img: 1,
					xhgg: 'SET2B',
					ccbh: '10056',
					wtdw: '山东省地质测绘院',
					yqjcrq: '2019-09-21'
				},
				{
					id: 1,
					img: 0,
					xhgg: 'GTS-201N',
					ccbh: '23345',
					wtdw: '青岛市莱西地图测绘院',
					yqjcrq: '2019-09-21'
				}
			]
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		// console.log(index);
		if (index === 0) {
			this.scan();
		}
	},
	methods: {
		scan() {
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		}
	},
	onShow() {},
	onLoad() {
		//this.scan();
	}
};
</script>

<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.list_items {
	margin: 21upx;
	background-color: #f8f8f8;
	//margin-top:21upx;
	border: 1px #dcdcdc solid;
}
.list-info {
	height: 150upx;
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
	.content {
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
