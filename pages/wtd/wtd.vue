<template>
	<view>
		<uni-card class="head" title="济南市规划局水利设计院" extra="2019121121" note="送检日期:2019.12.31">
			<ul>
				<li>SET2B/100678</li>
				<li>GTS311/23845</li>
			</ul>
		</uni-card>				
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
export default {
	components: {
		uniCard
	},
		data() {
			return {
			}
		},
		methods: {
			
		},
		onLoad(){
		}		
	}
</script>

<style>
	.head{
		background-color: #0A98D5;
	}
.flex-item-0 {
	width: 100%;
	height: 200upx;
	text-align: center;
	line-height: 200upx;
	background-color: #0faeff;
}
</style>
