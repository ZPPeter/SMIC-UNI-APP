<template>
	<view class="pd-list">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="pd in list" :key="pd.id" @tap="nav(pd)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
					<view class="uni-media-list-body">
						<view style="display: flex;align-items: center;">
							<view :class="before(pd.creationTime) ? 'icon-red-dot' : ''"></view>
							<view class="uni-media-list-text-top title">{{ pd.title }}</view>
						</view>
						<view class="uni-media-list-text-bottom uni-ellipsis details">{{ pd.description }}</view>
						<view class="user_time">
							<text>{{ pd.user }}</text>
							<text class="time">{{ getDateStr(pd.creationTime) }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dn from '@/libs/dn_utils.js';
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
		getDateStr(o){
			return dn.dateUtils.format(this.$moment(o).format('YYYY-MM-DD HH:mm:ss'));
		},
		nav(o) {
			uni.navigateTo({
				url: '/pages/notice/detail?o=' + JSON.stringify(o)
			});
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

<style lang="scss">
.icon-red-dot {
	//background-color: #0081ff;
	position: relative;
	width: 10px;
	height: 10px;
	background: red;
	margin-right: 5px;
	border-radius: 50%;
}

.pd-list {
	//display: flex;
	//flex-direction: column;
	//align-items: center;
	//padding-top: 100upx;
}
.title {
	display: flex;
	font-size: 36upx;
	font-weight: bold;
	//margin-left: 5px;
	//color: #0081ff; //#303133;
}
.details {
	//display: inline-block;// P 块内不换行显示
	padding: 12upx 0;
	font-size: 36upx;
	color: #606266;
	line-height: 48upx;
}
.user_time {
	display: flex;
	flex-direction: row;
	width: 100%;
	font-size: 26upx;
	.time {
		display: flex;
		position: absolute;
		right: 40upx;		
		font-style: italic;
		color: #7d7d7d;
		//width: 100%;
	}
}
</style>
