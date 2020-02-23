<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 12px;align-items: center;">
			<div style="background-color: skyblue;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">委托单：查询到{{ lstlength }}条记录。</view>
		</view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 12px;align-items: center;">
			<view class="tj-item">关键字:{{ q }}</view>
		</view>
		<mescroll-uni @down="downCallback" @up="upCallback">
			<wtd-list :list="pdList"></wtd-list>
		</mescroll-uni>
		<view class="fab-box fab">
			<view class="fab-circle" @tap="gotoZhcx()"><text class="iconfont icon-icon-test2 fontsize"></text></view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import WtdList from './wtd_list.vue';
import PageRequest from '@/store/entities/page-request';
class PageNoticeRequest extends PageRequest {};
var meScroll;
export default {
	components: {
		MescrollUni,
		WtdList
	},
	data() {
		return {
			lstlength: 0,
			showImg: true,
			pageNum: 1,
			q: '',
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
	onNavigationBarSearchInputConfirmed(e){ // 查询
		this.q = e.text;
		//console.log(this.q);
		meScroll.resetUpScroll();
	},
	onLoad(options) {
		/*
		//console.log('Load');
		//console.log(options);	
		var q = JSON.parse(options.query).filterText;
		this.q = q;
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		// #ifdef APP-PLUS
		let ws = page.$getAppWebview();
		ws.setTitleNViewSearchInputText(q);
		// #endif
		*/
	},
	methods: {
		gotoZhcx(){
			uni.navigateTo({
				url: '/pages/zhcx/zhcx'
			});			
		},
		test() {
			/*
			uni.showModal({
				title: 'Hello'
			});*/
			uni.navigateTo({
				url: '/pages/test/test'
			});
		},
		downCallback(mescroll) {
			//刷新
			if (mescroll) {
				meScroll = mescroll;
			}
			mescroll.resetUpScroll();
		},
		upCallback(mescroll) {
			this.getListDataFromNet(
				mescroll.num,
				mescroll.size,
				curPageData => {
					//console.log(curPageData);
					this.lstlength = curPageData.totalCount;
					var totalSize = this.lstlength;
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					//console.log('mescroll.num=' + mescroll.num + ', mescroll.size=' + mescroll.size + ', curPageData.length=' + curPageData.length);

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//console.log(curPageData.items.length +' - ' + totalSize);
					mescroll.endBySize(curPageData.items.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					//mescroll.endSuccess(curPageData.items.length);

					//设置列表数据
					if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					//console.log(curPageData.items);
					this.pdList = this.pdList.concat(curPageData.items); //追加新数据
					//this.pdList.forEach(function (element, index) {
					//   console.log(element.id);
					//});
				},
				() => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				}
			);
		},
		// 官方写法: http://www.mescroll.com/uni.html#tagUpCallback
		async getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
			this.pagerequest.FilterText = this.q;
			this.pagerequest.maxResultCount = pageSize;
			this.pagerequest.skipCount = (pageNum - 1) * pageSize;
			var _store = 'sjmx/ListWtds';
			const res = await this.$store.dispatch({
				type: _store,
				data: this.pagerequest
			});
			//console.log(JSON.stringify(res));
			if (res != '') {
				//console.log(res);
				successCallback && successCallback(res); //res.items
			} else errorCallback && errorCallback();
		}
	},
	/*
	created() {
		console.log('Created');
	},	
	onShow() {
		console.log('Show');
		if (this.$refs.fab && this.$refs.fab.isShow) {
			this.$refs.fab.close();
			return true;
		}
		return false;
	},
	onBackPress(options) {
		console.log(options);
	},
	onHide() {
		console.log('hide');
	},
	onUnload() {
		console.log('unload---------------------------------------------------');
	}*/
};
</script>

<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 2px;
}
.list_items {
	margin: 21upx;
	background-color: #f8f8f8;
	//margin-top:21upx;
	border: 1px #dcdcdc solid;
}
.list-info {
	//height: 280upx;
	padding: 12upx 15upx;
	//box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		//margin-left: 21upx;
		width: 108upx;
		height: 108upx;
		border: 2upx solid lightgrey;
		border-radius: 50%;
		background-color: #8f8f94;
	}
	.content {
		font-size: $font-base;
		color: $font-color-dark;
		margin-left: 20upx;
		.xhgg {
			font-size: 32upx;
		}
		.wtdw {
			font-size: 26upx;
			color: #8f8f94;
		}
		.jdqx {
			font-size: 26upx;
			color: #e54d42;
			font-weight: 600;
			text-decoration: line-through;
		}
	}
}
.fab-box {
	position: absolute;
	left: 40upx;
	bottom: 40upx;
	width: 90upx;
	height: 90upx;
	//position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.fab-box.fab {
	z-index: 10;
}

.fab-circle {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 110upx;
	height: 110upx;
	background: dodgerblue;
	//background: #3c3e49;
	/* background: #5989b9; */
	border-radius: 50%;
	box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	z-index: 11;
}

.fab-circle.left {
	left: 0;
}

.fab-circle.right {
	right: 0;
}

.fab-circle.top {
	top: 0;
}

.fab-circle.bottom {
	bottom: 0;
}
.fontsize {
	//color:white;
	//font-size: 40upx;
	color: #ffffff;
	font-size: 50upx;
	transition: all 0.3s;
	font-weight: bold;
}
</style>
