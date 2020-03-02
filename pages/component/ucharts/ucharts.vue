<template name="ucharts">
	<view class="qiun-columns">
		<view class="info">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">近两年月工作量统计【{{ percentage }}%】</view>
		</view>
		<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" /></view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.min.js';
import config from '@/libs/common/config.js';
var _self;
var canvaColumn = null;
export default {
	name: 'ucharts',
	props: {
		percentage: [String, Number]
	},
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			chartData: {
				date: '', //统计日期 7 天后失效
				categories: ['1月', '', '3月', '', '5月', '', '7月', '', '9月', '', '11月', ''],
				series: [
					{
						name: new Date().DateAdd('y', -1).Format('yyyy') + '年',
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						// data: [15, { value: 20, color: '#f04864' }, 45, 37, 43, 34]
					},
					{
						name: new Date().Format('yyyy') + '年',
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					}
				]
			}
		};
	},
	beforeCreate() {},
	//created() {
	created: async function() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(450);
		// 读取缓存数据
		const res = uni.getStorageSync('ChartsData');
		//console.log(res);
		if (res) {
			this.chartData.series[0].data = res.data1; // from ChartsData
			this.chartData.series[1].data = res.data2;
			this.chartData.date = res.date;
		}
		else{
			await _self.getServerData(); // 今年无数据情况
		}
		let Column = { categories: [], series: [] };
		Column.categories = this.chartData.categories;
		Column.series = this.chartData.series;
		_self.showColumn('canvasColumn', Column);
	},
	updated() {
		//console.log('updated');
	},
	methods: {
		async getServerData() {
			try {
				// 7天统计一次
				if (
					!this.$moment()
						.add(-7, 'days')
						.isBefore(this.$moment(this.chartData.date))
				) {
					const res2 = await this.$store.dispatch({
						type: 'sjmx/GetStatsData'
					});
					if (res2 && res2 != '') {
						//console.log(res);
						this.chartData.series[0].data = res2[1];
						this.chartData.series[1].data = res2[0];
						uni.setStorage({
							key: 'ChartsData',
							data: { date: new Date(), data1: this.chartData.series[0].data, data2: this.chartData.series[1].data }
						});
						let Column = { categories: [], series: [] };
						Column.categories = this.chartData.categories;
						Column.series = this.chartData.series;
						_self.showColumn('canvasColumn', Column);
					}
				}
			} catch (e) {
				//console.log(e);
				if (config.isDevelopment) {
					uni.showModal({
						content: 'sjmx/GetStatsData 错误！' + e
					});
				}
			}
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
	},
	watch: {
		percentage: function() {
			// DOM 更新了
			// #ifdef APP-PLUS
			// 定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
			Vue.nextTick().then(function() {
				//console.log('2');
				//let Column = { categories: [], series: [] };
				//Column.categories = _self.chartData.categories;
				//Column.series = _self.chartData.series;
				//_self.showColumn('canvasColumn', Column);
				_self.getServerData(); // 检查缓存，7天统计一次
			});
			// #endif
		}
	}
};
</script>

<style lang="scss">
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-columns {
	flex-direction: column;
}
.info {
	display: flex;
	width: 90%;
	text-align: left;
	//margin-top: 2px;
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
