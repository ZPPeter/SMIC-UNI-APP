<template>
    <view>
		<view class="flex-item-0">
					<text class="iconfont icon-earth2 font-fize2">字体图标</text>
					<text class="yticon icon-shoucang font-fize2"/>					
					<icon type="info" size="18" color="red"/> 不支持 H5
		</view>
				<view>
					您好：<text class="username">{{ userInfo.realname || '游客' }}</text>
				</view>
			</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['hasLogin', 'userInfo']),
	methods: {		
	},
	onLoad() {
		//console.log(this.hasLogin)
	}
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
.font-fize2{
	font-size: 21px;
	color:red;
	font-weight: bold;
}
.test {
	background-color: #0faeff;
	width: 100%;
}
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}
</style>
