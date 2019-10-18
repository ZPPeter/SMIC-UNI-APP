<template name="ucharts">
	<view class="qiun-columns">
		<view class="info">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">近两年月工作量统计【0/0】</view>
		</view>
		<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" /></view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.min.js';
var _self;
var canvaColumn = null;
export default {
	name: 'ucharts',
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			chartData: {
			categories: ['1月', '', '3月', '', '5月', '', '7月', '', '9月', '', '11月', ''],
			series: [
				{
					name: (new Date()).DateAdd('y',-1).Format("yyyy") + "年",
					data: [35, 36, 31, 33, 13, 34,35, 136, 31, 33, 13, 134]
					// data: [15, { value: 20, color: '#f04864' }, 45, 37, 43, 34]
				},
				{
					name: (new Date()).Format("yyyy") + "年",
					data: [18, 27, 21, 214, 6, 28,235, 36, 31, 33, 13, 34]
				}
			]
			}
		};
	},
	created() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(450);
		this.getServerData();
	},
	methods: {
		getServerData() {
			/*
				每周读取1次服务器数据，存在 ChartsData 缓存中，ChartsData 存在则判断是否需要刷新数据
				参数：
				   年度 (new Date()).Format("yyyy")
				   最近一次读取服务器时间，大于7日刷新数据
				   年度总计  1 x 2
				   每月合计 12 x 2 
			*/
			let Column = { categories: [], series: [] };
			Column.categories = this.chartData.categories;
			Column.series = this.chartData.series;
			_self.showColumn('canvasColumn', Column);
			/*
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data: {},
				success: function(res) {
					//console.log(res.data.data);
					let Column = { categories: [], series: [] };
					Column.categories = res.data.data.ColumnB.categories;
					Column.series = res.data.data.ColumnB.series;
					console.log(Column.categories);
					console.log(Column.series);
					_self.showColumn('canvasColumn', Column);
				},
				fail: () => {
					_self.tips = '网络错误';
				}
			});
			*/
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
							axisLine: true,
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
.qiun-columns {
	flex-direction: column;
}
.info {
	display: flex;
	width: 90%;
	text-align: left;
	margin-left: 6px;
	align-items: center;
}
.qiun-charts {
	width: 750upx;
	height: 470upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 450upx;
	background-color: #ffffff;
}
</style>

<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
</style>
