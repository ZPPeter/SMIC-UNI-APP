<template>
	<view>
		<view class="notice-item">
			<view class="content">
				<text class="title">欢迎{{ showInfo }}{{ userInfo.realname }}</text>
				<!-- view class="img-wrapper">
					<image class="pic" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761064275,227090144&fm=26&gp=0.jpg"></image>
					<view class="cover">
						活动结束
					</view>
				</view -->
				<text class="introduce">在使用过程中发现Bugs请提交给管理员，谢谢。</text>
				<!--view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view -->
			</view>
			<text class="time">{{ new Date().Format("yyyy.MM.dd hh:mm:ss") }}</text>
		</view>
		<view class="notice-item">
			<view class="content">
				<text class="title">消息</text>
				<!-- view class="img-wrapper">
					<image class="pic" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556465765776&di=57bb5ff70dc4f67dcdb856e5d123c9e7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fd015aa4d95fa801206d96069229.jpg%401280w_1l_2o_100sh.jpg"></image>
				</view -->
				<text class="introduce">SMIC.智慧检定系统-全站仪数据处理测试版上线了。</text>
				<!-- view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view -->
			</view>
			<text class="time">2019.07.31 10:30:25</text>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import utils from '../../libs/common/utils.js';
export default {
	computed: {
		...mapState(['userInfo']),
		showInfo: {
			get() { 
				if(this.userInfo.realname)
					return '您: ';
			},
			set() {}
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
page {
	background-color: #f7f7f7;
	padding-bottom: 30upx;
	padding-top: 30upx;
}

.notice-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.time {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	text-align: right;
	height: 80upx;
	padding-top: 10upx;
	padding-right: 50upx;
	font-size: 26upx;
	color: #7d7d7d;
	width: 100%;
}

.content {
	width: 710upx;
	padding: 0 24upx;
	background-color: #fff;
	border-radius: 4upx;
}

.title {
	display: flex;
	align-items: center;
	height: 90upx;
	font-size: 32upx;
	color: #303133;
}

.img-wrapper {
	width: 100%;
	height: 260upx;
	position: relative;
}

.pic {
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 6upx;
}

.cover {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	font-size: 36upx;
	color: #fff;
}

.introduce {
	display: inline-block;
	padding: 16upx 0;
	font-size: 28upx;
	color: #606266;
	line-height: 38upx;
}

.bot {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 80upx;
	font-size: 24upx;
	color: #707070;
	position: relative;
}

.more-icon {
	font-size: 32upx;
}
</style>
