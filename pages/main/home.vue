<template>
    <view>
		<view class="flex-item-0">
					<text class="iconfont icon-earth2 font-fize2">字体图标</text>
					<text class="yticon icon-shoucang font-fize2"/>					
					<icon type="info" size="18" color="red"/> 不支持 H5
		</view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-title uni-common-mt">				
                flex-direction: row
                <text>\n横向布局</text>
            </view>
            <view class="uni-flex uni-row">
                <view class="flex-item uni-bg-red">A</view>
                <view class="flex-item uni-bg-green">B</view>
                <view class="flex-item uni-bg-blue">C</view>
            </view>
            <view class="uni-title uni-common-mt">
                flex-direction: column
                <text>\n纵向布局</text>
            </view>
            <view class="uni-flex uni-column">
                <view class="flex-item flex-item-V uni-bg-red">A</view>
                <view class="flex-item flex-item-V uni-bg-green">B</view>
                <view class="flex-item flex-item-V uni-bg-blue">C</view>
            </view>
        </view>
		<view>
			<textarea :value="value" placeholder="" />
		</view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			}
		},
		methods: {
			
		},
		onLoad(){
			this.value = this.$Route.query.name
			//console.log(this.$Route.query)
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
	
	.flex-item {
		width: 33.3%;
		height: 200upx;
		text-align: center;
		line-height: 200upx;
		background-color: #0faeff;
	}

	.flex-item-V {
		width: 100%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
		background-color: #0faeff;
	}

	.text {
		margin: 15upx 10upx;
		padding: 0 20upx;
		background-color: #ebebeb;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #777;
		font-size: 26upx;
	}

	.desc {
		/* text-indent: 40upx; */
	}
</style>
