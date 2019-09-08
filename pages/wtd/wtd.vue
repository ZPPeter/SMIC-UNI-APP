<template>
	<view>
		<view class="flex-item-0">
					<text class="iconfont icon-earth2 font-fize2">字体图标</text>
					<text class="yticon icon-shoucang font-fize2"/>					
					<icon type="info" size="18" color="red"/> 不支持 H5
		</view>		
		<textarea :value="value" placeholder="" />
		<view><u-charts></u-charts></view>
	</view>
</template>

<script>
	import uCharts from '@/pages/component/ucharts/ucharts.vue';
	export default {
		components: {
			uCharts
		},		
		data() {
			return {
				value:''
			}
		},
		methods: {
			
		},
		onLoad(){
			this.value = this.$Route.query.name
			console.log(this.$Route.query.name)
		}		
	}
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
