<template>
	<view style="padding-left: 20upx;">
		<view style="display: flex; width:90%;text-align: left;margin-left: 0px;align-items: center;" class="wtdw2">
			<div style="background-color: skyblue;width:4px;height:12px;vertical-align: bottom;margin-right: 2px;padding-right: 2px;"></div>
			检定结果
		</view>
		<view style="display: flex;"><div style="background-color: skyblue;width:98%;height:1px;vertical-align:top;"></div></view>
		<view style="margin-top: 20upx;" class="wtdw">证书编号：{{ res[1] }}</view>
		<view class="wtdw">温度：({{ res[2] }})℃</view>
		<view class="wtdw">1、天线在不同方位测定同一基线最大偏差:Z={{ res[4] }}mm</view>
		<view class="wtdw">2、测量基线{{ res[5] }}km时,测量误差:△d={{ res[6] }}mm</view>
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
