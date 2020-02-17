<template>
	<view class="list">
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info">
				<view class="content">
					<p class="wtdw">操作者：{{ o.surname }}</p>
					<p class="wtdw">操作时间：{{ o.czsj | formatDateFilter }}</p>
					<p class="wtdw">操作内容：{{ o.cznr }}</p>					
					<p class="wtdw">备注说明：{{ o.bzsm | formatTextFilter}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '@/libs/common/utils.js';
export default {
	props: {
		list: {
			// 数据列表
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
	},	
	methods: {
	}
};
</script>

<style lang="scss">
.list {
	padding-top: 80upx;
}
.list_items {
	margin: 21upx;
	background-color: #f8f8f8;
	//margin-top:21upx;
	border: 1px #dcdcdc solid;
}
.list-info {
	//height: 280upx;
	padding: 12upx 15upx;
	//box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: center;
	position: relative;
	z-index: 1;
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
