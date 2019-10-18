<template>
	<view>
		<view class="notice-item">
			<view class="content0">
				<text class="title0">欢迎{{ showInfo }}{{ userInfo.realname }}</text>
			</view>
		</view>
		<view class="notice-item" v-for="(item, index) in list" :key="index">
			<view class="content">
				<view class="title1">
					<div style="background-color: #0081FF;width:4px;height:12px;vertical-align: bottom;"></div>
					<text class="title">{{ item.title }}</text>
				</view>
				<hr />
				<text class="details">{{ item.description }}</text>
				<text :class="before(item.creationTime)? 'time2' : 'time'">
				{{ format(item.creationTime) }}</text>
			</view>
		</view>
		<view style="padding-top: 48upx;">
			<uni-pagination :current="current" :total="total" :pageSize="pageSize" title="消息" prev-text="上一页" next-text="下一页" @change="change" />
		</view>
		<view class="btn-view">
			<view>当前页：{{ current }}，数据总量：{{ total }}条，每页数据：{{ pageSize }}</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
import utils from '@/libs/common/utils.js';
import PageRequest from '@/store/entities/page-request';
class PageNoticeRequest extends PageRequest {
}
export default {
	components: {
		uniPagination
	},
	data() {
		return {
			current: 1,
			total: 0,
			pageSize: 3,
			list: [],
			pagerequest: new PageNoticeRequest()
		};
	},
	onLoad: async function(e) {
		this.getNotice();		
	},
	onUnload: function() {
		this.$store.dispatch("notice/setReadLastNoticeTime");
		this.$store.state.user.readLastNoticeTime = new Date();
		//console.log(this.$store.state.user.readLastNoticeTime);
	},
	computed: {
		...mapState(['userInfo']),
		showInfo: {
			get() {
				if (this.userInfo.realname) return '您: ';
			},
			set() {}
		}
	},
	methods: {
		change(e) {			
			this.current = e.current;
			this.getNotice();
		},
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		before(item){
			return this.$moment(this.$store.state.user.readLastNoticeTime).isBefore(item)
		},
		lastReadTime() {
			return this.$store.state.user.readLastNoticeTime;
		},
		async getNotice() {
			this.pagerequest.maxResultCount = this.pageSize;
			this.pagerequest.skipCount = (this.current - 1) * this.pageSize;
			const res = await this.$store.dispatch({
				type: 'notice/GetNotices',
				data: this.pagerequest
			});			
			this.total = res.totalCount;			                 
			this.list = res.items;
			//console.log(res);
			//console.log(this.list);
			//console.log(this.lastReadTime());
		}
	}
};
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #fff; // #f7f7f7;
	padding-bottom: 30upx;
	padding-top: 30upx;
}

view {
	font-size: 28upx;
	line-height: inherit;
}
hr {
	border: none;
	height: 1px;
	background-color: #e5e5e5;
}
.notice-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 12upx;
}
.title1 {
	display: flex;
	width: 90%;
	text-align: left;
	margin-left: 0px;
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
.time2 {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	text-align: right;
	height: 80upx;
	padding-top: 10upx;
	padding-right: 50upx;
	font-size: 26upx;
	color: red;
	width: 100%;
}
.content {
	width: 710upx;
	padding: 0 24upx;
	border-radius: 18upx;
	background-color: #f0f0f0;
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
</style>
