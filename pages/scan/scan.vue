<template>
	<view>
	</view>
</template>
<script>
export default {
	data() {
	},
	methods: {
		scan: function() {
			uni.scanCode({
				success: res => {
					console.log(res.result);
				}
			});
		}
	},
	onLoad: function(e) {
		this.scan();
	},
	onShow() {
	}
};
</script>
