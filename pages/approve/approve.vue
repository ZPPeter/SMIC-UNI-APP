<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 6px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">待批准记录列表：显示0条记录。</view>
		</view>				
		<view class="uni-common-mt">			
			<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in lists" :key="index">
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">{{item.userName}}</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="item.emailAddress"></input>
					</view>
				</view>		
				</view>
				</view>
		</view>			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [
					{
						id:0,
						userName:'peter',
						emailAddress:'peter@163.com'
					},
					]
			}
		},
		methods: {
			
		},
		onShow() {
			if (uni.getSystemInfoSync().platform === 'android') {
				var icon = plus.nativeObj.View.getViewById('icon');
				if (icon) {
					setTimeout(function() {
						icon.show();
					}, 100);
				}
			}		
		},		
	}
</script>

<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
</style>
