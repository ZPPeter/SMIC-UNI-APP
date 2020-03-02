<template>
	<view>
		<mescroll-uni @down="downCallback" @up="upCallback">
			<uni-section title="消息通知" type="line"></uni-section>
			<pd-list :list="pdList"></pd-list>
		</mescroll-uni>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import utils from '@/libs/common/utils.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import PdList from '@/pages/component/notice_list/notice_list.vue';
import uniSection from '@/components/uni-section/uni-section.vue'
import PageRequest from '@/store/entities/page-request';
class PageNoticeRequest extends PageRequest {};
export default {
	components: {
		MescrollUni,
		PdList,
		uniSection
	},
	data() {
		return {
			pageNum: 1,
			pagerequest: new PageNoticeRequest(),
			pdList: []
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		//console.log(index);
		if (index === 0) {
			uni.switchTab({
				url: '/pages/main/main'
			});
		}
	},
	onLoad: async function(e) {
		uni.setNavigationBarTitle({
		　　title:'欢迎您：'+this.userInfo.realname
		})
	},
	/*
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},*/
	onUnload: function() {
		//console.log('UnLoad');
		this.$store.state.user.newNotices = 0;
		this.$store.dispatch('notice/setReadLastNoticeTime');
		this.$store.state.user.readLastNoticeTime = new Date();
		//console.log(this.$store.state.user.readLastNoticeTime);
	},
	computed: {
		...mapState(['userInfo']),
		showInfo: {
			get() {
				if (this.userInfo.realname) return '您: ';
			}
		}
	},
	methods: {
		/*下拉刷新的回调 */
		downCallback(mescroll) {
			// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
			// loadSwiper();
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
		upCallback(mescroll) {
			//联网加载数据
			this.getListDataFromNet(
				mescroll.num,
				mescroll.size,
				curPageData => {
					//console.log(curPageData);
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					//console.log('mescroll.num=' + mescroll.num + ', mescroll.size=' + mescroll.size + ', curPageData.length=' + curPageData.length);

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					mescroll.endSuccess(curPageData.length);

					//设置列表数据
					if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList = this.pdList.concat(curPageData); //追加新数据
					//console.log(curPageData);
				},
				() => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				}
			);
		},
		// 官方写法: http://www.mescroll.com/uni.html#tagUpCallback
		async getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
			this.pagerequest.maxResultCount = pageSize;
			this.pagerequest.skipCount = (pageNum - 1) * pageSize;			
			const res = await this.$store.dispatch({
				type: 'notice/GetNotices',
				data: this.pagerequest
			});
			//console.log(res);
			if (res != '') {
				//console.log(res);
				successCallback && successCallback(res.items);
			}
			else
			errorCallback && errorCallback();
			/*
			//延时一秒,模拟联网
			setTimeout(() => {
				try {					
					let data = pdlistNor;
					let listData = [];
					for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
						if (i == data.length) break;
						listData.push(data[i]);
					}
					successCallback && successCallback(listData);
				} catch (e) {					
					errorCallback && errorCallback();
				}
			}, 1000);
			*/
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
	//padding-top: 30upx;
}
view {
	font-size: 28upx;
	line-height: inherit;
}
.notice-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 12upx;
}
</style>
