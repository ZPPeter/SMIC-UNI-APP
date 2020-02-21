<template>
	<view style="padding-left: 20upx;">
		<view style="display: flex; width:90%;text-align: left;margin-left: 0px;align-items: center;" class="wtdw2">
			<div style="background-color: skyblue;width:4px;height:12px;vertical-align: bottom;margin-right: 2px;padding-right: 2px;"></div>
			检定结果
		</view>
		<view style="display: flex;"><div style="background-color: skyblue;width:98%;height:1px;vertical-align:top;"></div></view>
		<view style="display: flex;" class="wtdw">证书编号：{{ res[1] }}</view>
		<view style="display: flex;" class="wtdw">
			温度：({{ res[2] }})℃
			<view style="padding-left: 30upx;">气压：{{ res[3] }}hPa</view>
		</view>
		<view style="display: flex;" class="wtdw">1、照准误差:C={{ res[13] }}″</view>
		<view style="display: flex;" class="wtdw">2、指标差:I={{ res[6] }}″</view>
		<view style="display: flex;" class="wtdw">3、横轴误差:i={{ res[4] }}″</view>
		<view style="display: flex;" class="wtdw">4、一测回水平方向标准偏差：μH={{ res[7] }}″</view>
		<view style="display: flex;" class="wtdw">5、测量重复性：{{ res[14] }}mm</view>
		<view style="display: flex;" class="wtdw">6、加 常 数：K= {{ res[15] }}mm</view>
		<view style="display: flex;" class="wtdw">7、乘 常 数：R= {{ res[16] }}mm/km</view>
		<view style="display: flex;" class="wtdw">8、测距综合标准差：a={{ res[17] }}mm;b={{ res[18] }}mm/km</view>
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
