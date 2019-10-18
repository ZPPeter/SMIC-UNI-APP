<template>
	<view>
		<view class="flex-item-0">
			<text class="iconfont icon-earth2 font-fize2">字体图标</text>
			<text class="yticon icon-shoucang font-fize2" />
			<icon type="info" size="18" color="red" />
			uni-icon和icon不支持 H5
			<uni-icon type="contact" size="30"></uni-icon>
		</view>
		<view class="qiun-title-dot-light">基本柱状图</view>
		<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas></view>
	</view>
</template>

<script>
//import uCharts from '@/pages/component/ucharts/ucharts.vue';
import uCharts from '@/components/u-charts/u-charts.min.js';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
var _self;
var canvaColumn = null;
export default {
	components: {
		uniIcon
	},	
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1
		};
	},
	onLoad() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		getServerData() {
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data: {},
				success: function(res) {
					console.log(res.data.data);
					let Column = { categories: [], series: [] };
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Column.categories = res.data.data.ColumnB.categories;
					Column.series = res.data.data.ColumnB.series;
					_self.showColumn('canvasColumn', Column);
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},
		showColumn(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 5, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					data: [
						{
							position: 'left',
							format: val => {
								return val.toFixed(0) + '台';
							}
						}
					]
				},
				dataLabel: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'group',
						width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length
					}
				}
			});
		}
	}
};
</script>

<style>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
