<template>
	<view>
		<view class="flex-item-0">
			<text class="iconfont icon-earth2 font-fize2">字体图标</text>
			<text class="yticon icon-shoucang font-fize2" />
			<icon type="info" size="18" color="red" />
			不支持 H5
		</view>
		<textarea :value="value" placeholder="" />
		<view><progress :percent="percent" stroke-width="10"></progress></view>
		<view><button type="primary" :loading="loading" :disabled="disabled" @click="upload">选择照片</button></view>
	</view>
</template>

<script>
//import uCharts from '@/pages/component/ucharts/ucharts.vue';
var _self;
export default {
	components: {
		//uCharts
	},
	data() {
		return {
			value: '',
			percent: 0,
			loading: false,
			disabled: false
		};
	},
	onBackPress() {},
	methods: {
		upload: function() {
			_self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album','camera'],
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url: 'https://demo.hcoder.net/index.php?c=uperTest',
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							user: 'test'
						},
						success: function(uploadFileRes) {
							console.log(uploadFileRes);
						}
					});
					uploadTask.onProgressUpdate(function(res) {
					});
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
	},
	onLoad() {}
};
</script>

<style>
.flex-item-0 {
	width: 100%;
	height: 200upx;
	text-align: center;
	line-height: 200upx;
	background-color: #0faeff;
}
</style>
