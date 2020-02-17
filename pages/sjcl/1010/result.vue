<template>
	<view style="padding-left: 20upx;" v-show="res">
		<view style="display: flex; width:90%;text-align: left;margin-left: 0px;align-items: center;" class="wtdw2">
			<div style="background-color: skyblue;width:4px;height:12px;vertical-align: bottom;margin-right: 2px;padding-right: 2px;"></div>
			检定结果
		</view>
		<view style="display: flex;"><div style="background-color: skyblue;width:98%;height:1px;vertical-align:top;"></div></view>
		<view style="margin-top: 20upx;" class="wtdw">证书编号：{{ res[1] }}</view>
		<view class="wtdw">温度：{{ res[2] }}℃</view>		
		<view class="wtdw">1、视准轴与横轴的垂直度：{{ res[4] }}″</view>
		<view class="wtdw">2、横轴与竖轴的垂直度：{{ res[5] }}″</view>
		<view class="wtdw">3、竖盘指标差：{{ res[6] }}″</view>
		<view class="wtdw">4、望远镜调焦运行误差：{{ res[8] }}″</view>
		<view class="wtdw">5、竖盘指标自动补偿误差：{{ res[9] }}″</view>
		<view class="wtdw">6、一测回水平方向标准偏差：sH= {{ res[7] }}″</view>		
		<div style="height:10px;"></div>
	</view>
</template>
<script>
import utils from '@/libs/common/utils.js';
export default {
	props: {
		res: {
			// 数据列表
			type: Array,
			default() {
				return [];
			}
		}
	},
	watch: {
		res: function() {
			//console.log(JSON.stringify(this.res));
		}
	}
};
</script>

<style lang="scss">
.wtdw {
	font-size: 28upx;
	color: #707074;
}
</style>
