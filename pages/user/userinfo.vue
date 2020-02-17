<template>
	<view class="box">
		<view><image class="test" :src="userInfo.portrait"></image></view>
		<view style="padding-top: 0upx;"><uni-notice-bar style="height:30upx;padding-left: 70upx;" show-icon="true" text="Tips：可以在设置界面修改头像。"></uni-notice-bar></view>
		<view class="content">
			<view>
				<text class="info">用户：{{ userInfo.realname }}</text>
			</view>
			<view>
				<text class="info">权限：{{ userInfo.roleNames.toString() }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		uniNoticeBar
	},
	data() {
		return {};
	},
	computed: {
		...mapState(['userInfo'])
	},
	onShow() {
		// console.log(this.userInfo.portrait);
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
@mixin calc-width($w) {
	width: $w / 750 * 100;
}
@mixin calc-height($h) {
	height: $h / 750 * 100;
}
.box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40upx 30upx 0;
	position: relative;
}
.test {
	border: 16upx solid #fff;
	border-radius: 5%;
	background-color: dodgerblue;
	@include calc-width(560vw);
	@include calc-height(640vw);
}
.content {
	@include calc-width(560vw);
	font-size: $font-base;
	color: $font-color-dark;
	margin-left: 0upx;
	.info {
		font-size: $font-base;
		color: #8f8f94;
		padding-left: 15upx;
	}
}
</style>
