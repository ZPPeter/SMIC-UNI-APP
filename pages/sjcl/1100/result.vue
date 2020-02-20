<template>
	<view style="padding-left: 20upx;">
		<view style="display: flex; width:90%;text-align: left;margin-left: 0px;align-items: center;" class="wtdw2">
			<div style="background-color: skyblue;width:4px;height:12px;vertical-align: bottom;margin-right: 2px;padding-right: 2px;"></div>
			检定结果
		</view>
		<view style="display: flex;"><div style="background-color: skyblue;width:98%;height:1px;vertical-align:top;"></div></view>
		<view style="margin-top: 20upx;" class="wtdw">证书编号：{{ res[1] }}</view>
		<view class="wtdw">温度：{{ res[2] }}℃</view>	
	
		<view class="wtdw">1、望远镜视轴对横轴的垂直度：{{ res[6] }}″</view>
		<view class="wtdw">2、照准误差:   C ={{ res[7] }}″</view>
		<view class="wtdw">3、指标差:   I = {{ res[4] }}″</view>
		<view class="wtdw">4、横轴误差:   i = {{ res[5] }}″</view>
		<view class="wtdw">5、补偿范围：±{{ res[8] }}′</view>
		<view class="wtdw">6、补偿准确度：X= {{ res[9] }}″;Y= {{ res[10] }}″</view>
		<view class="wtdw">7、零位误差：X垂直= {{ res[11] }}″;Y水平= {{ res[12] }}″</view>
		<view class="wtdw">8、一测回水平方向标准偏差：μH= {{ res[13] }}″</view>
		
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
