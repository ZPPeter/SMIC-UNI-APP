<template name="infobox">
	<view class="content">
		<view class="uni-swiper-msg" style="text-align: left;width: 100%;font-size: 32upx;padding-top: 10upx;">
			<view class="uni-swiper-msg-icon">
				<!-- icon type="info" size="14" color="darkgray" / -->
				<!-- image src="/static/img/info4.jpg" mode="widthFix" style="margin-left: 20upx;"></image -->
				<text class="cuIcon-title text-orange " style="margin-left: 30upx;font-size: 30upx;"></text>
			</view>
			<swiper vertical="true" :autoplay="autoplay" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in datas" :key="index">{{ item }}</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
export default {
	name: 'infobox',
	props: {
		datas: {
			type: Array,
			default() {
				return [' 正在连接服务器..', ' 正在连接服务器...'];
			}
		}
	},
	data() {
		return {
			autoplay:false
		};
	},
	methods: {},
	mounted: function () {
	  this.$nextTick(function () {
	    console.log(this.autoplay);
		console.log(this.datas);
		this.autoplay = true;
	  })
	},
	computed: {
		getDatas: function() {
			return this.datas;
		}
	}
};
</script>

<style lang="scss">
.content {
	margin-top: 10upx;
}
</style>
