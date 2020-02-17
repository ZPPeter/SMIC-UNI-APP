<template>
	<view class="pd-list">
		<view v-for="pd in list" :key="pd.id">
			<view class="content">
				<view class="title1">
					<div style="background-color: silver;width:4px;height:12px;vertical-align: bottom;"></div>
					<text class="title">{{ pd.title }}</text>
				</view>
				<text class="details">{{ pd.description }}</text>
			</view>
			<view class="title1">
			<text class="time">{{ format(pd.creationTime) }}</text>
			<div :class="before(pd.creationTime) ? 'icon-red-dot' : ''"></div>
			</view>
		</view>
	</view>
</template>

<script>
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
	methods: {
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		before(item) {
			return this.$moment(this.$store.state.user.readLastNoticeTime).isBefore(item);
		},
		lastReadTime() {
			return this.$store.state.user.readLastNoticeTime;
		}
	}
};
</script>

<style>
.icon-red-dot {
	background-color: #0081FF;
	//position: absolute;
	width: 10px;
	height: 10px;
	background: red;
	//right: -5px;
	//top: -5px;
	border-radius: 50%;
}

.pd-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 12upx;
}
.title1 {
	display: flex;
	width: 90%;
	margin-left: 0px;
	align-items: center;
}
.time {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	text-align: right;
	height: 80upx;
	padding-top: 8upx;
	padding-right: 8upx;
	font-size: 26upx;
	color: #7d7d7d;
	width: 100%;
}
.content {
	width: 710upx;
	padding: 0upx 24upx;
	border-radius: 18upx;
	background-color: #f0f0f0;
	align-items: center;
}
.title {
	display: flex;
	align-items: center;
	height: 90upx;
	font-size: 28upx;
	margin-left: 5px;
	//color: #0081ff; //#303133;
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
.details {
	display: inline-block;
	padding: 12upx 0;
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
.btn-view {
	margin: 30upx 30upx 0;
	text-align: center;
}
/*数据列表*/
.pd-li {
	position: relative;
	height: 160upx;
	padding: 20upx 16upx 20upx 240upx;
	border-bottom: 1upx solid #eee;
}
.pd-li .pd-img {
	position: absolute !important; /*编译到H5,在list-mescroll-more的案例中需加上!important,解决tab切换过快定位失效的问题*/
	left: 36upx;
	top: 20upx;
	width: 160upx;
	height: 160upx;
}
.pd-li .pd-name {
	font-size: 26upx;
	line-height: 40upx;
	height: 80upx;
	margin-bottom: 20upx;
	overflow: hidden;
}
.pd-li .pd-price {
	font-size: 26upx;
	color: red;
}
.pd-li .pd-sold {
	font-size: 24upx;
	margin-left: 16upx;
	color: gray;
}
</style>
