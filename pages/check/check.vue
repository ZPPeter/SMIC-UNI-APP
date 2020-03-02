<template>
	<view style="padding-top: 10upx;">
		<view style="display: flex; width:90%;text-align: left; margin-left: 12px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">查询到{{ lstlength }}台仪器待核验。</view>
		</view>
		<view v-if="qjmcNames.length>0">		
		<mescroll-uni @down="downCallback" @up="upCallback"><pd-list :qjmcnames=qjmcnames :list="pdList"></pd-list></mescroll-uni>		
		<view class="fab-box fab">
			<view class="fab-circle" @tap="showModal" data-target="RadioModal"><text class="iconfont icon-icon-test2 fontsize"></text></view>
		</view>
		<view class="cu-modal" :class="modalName == 'RadioModal' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">全部类别</view>
								<radio class="round" :class="radio == 'radio0' ? 'checked' : ''" :checked="radio == 'radio0' ? true : false" :value="'radio0'"></radio>
							</label>
						</view>
						<view class="cu-item" v-for="(item, index) in qjmcNames" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{ qjmcNames[index][1] }}</view>
								<radio
									class="round"
									:class="radio == 'radio' + (index + 1) ? 'checked' : ''"
									:checked="radio == 'radio' + (index + 1) ? true : false"
									:value="'radio' + (index + 1)"
								></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view style="height: 24upx;"></view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import PdList from './veri_list.vue';
import PageRequest from '@/store/entities/page-request';
import ShowHomeData from '@/libs/ShowHomeData.js';
//import abp from '@/abp.js';
class PageNoticeRequest extends PageRequest {}
var meScroll;
export default {
	components: {
		MescrollUni,
		PdList
	},
	data() {
		return {
			lstlength: 0,
			showImg: true,
			pageNum: 1,
			pagerequest: new PageNoticeRequest(),
			modalName: null,
			query: '',
			wtdh: '',
			radio: 'radio0', // 全部类别
			qjmcnames: '',
			qjmcNames: [],
			pdList: []
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	onNavigationBarSearchInputChanged(e) {
		this.hideModal();
	},
	onNavigationBarSearchInputClicked(e) {
		// disabled 才有效
		this.hideModal();
	},
	onNavigationBarSearchInputConfirmed(e) {
		//console.log(e.text);
		this.hideModal();
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord(); //强制隐藏
		// #endif
		//if (this.hasLogin) {
			this.wtdh = e.text;
			meScroll.resetUpScroll();
		//} 
	},
	onNavigationBarButtonTap(e) {
		this.hideModal();
		const index = e.index;
		//console.log(index);
		if (index === 0) {
		}
		else if (index === 1) {
			uni.switchTab({
				url:'/pages/main/main'
			})
		}
		else if (index === 2) {
			this.doScan();
		}
	},
	methods: {
		doQuery(){
			this.modalName = null;
			//console.log(this.radio1);
			//console.log(this.query);
			meScroll.resetUpScroll();
		},
		checkboxChange: function(e) {
			var values = e.detail;
			console.log(values);
			/*
			for (var i = 0, lenI = 2; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}*/
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		hideModal(e) {
			this.modalName = null;
		},
		RadioChange(e) {
			this.radio = e.detail.value;
			this.modalName = null;
			this.query = '';
			var qjmc = this.radio.substr(5);
			if (qjmc > 0) {
				this.query = this.qjmcNames[qjmc - 1][0];
				var query = this.query;
				//console.log(this.qjmcNames[qjmc-1][0]);
				this.qjmcnames = this.query;
				this.qjmcNames.forEach(function(item, index) {
					// forEach 无法跳出循环，可用 for
					if (item[0] == query) {
						query = item[1];
					}
				});
				this.qjmcnames = query;
			} else this.qjmcnames = this.$abp.utils.getRolesValue(this.userInfo.roles, this.userInfo.roleNames);
			//console.log(this.query);
			//console.log(this.qjmcnames);
			// this.downCallback(); // x
			meScroll.resetUpScroll();
		},
		downCallback(mescroll) {
			//下拉刷新
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
					//console.log(curPageData.length);
					//this.lstlength = curPageData.length;
					this.lstlength = curPageData.items.length;
					var totalSize = this.lstlength;
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					//console.log('mescroll.num=' + mescroll.num + ', mescroll.size=' + mescroll.size + ', curPageData.length=' + curPageData.length);

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//console.log(curPageData.items.length +' - ' + totalSize);
					//mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
					mescroll.endBySize(curPageData.items.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					//mescroll.endSuccess(curPageData.items.length);

					//设置列表数据
					if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					//this.pdList = this.pdList.concat(curPageData); //追加新数据
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
			if(this.qjmcNames.length==0)
			return;
			this.pagerequest.skipCount = (pageNum - 1) * pageSize;
			this.pagerequest.WTDH = this.wtdh;
			this.pagerequest.FilterText = this.query;
			//console.log(this.pagerequest.FilterText);
			this.pagerequest.maxResultCount = pageSize;
			this.pagerequest.skipCount = (pageNum - 1) * pageSize;
			//console.log(this.pagerequest);
			const res = await this.$store.dispatch({
				type: 'sjmx/ListDhymxs',
				data: this.pagerequest
			});
			//console.log( JSON.stringify(res));
			if (res != '') {
				//console.log(res);
				successCallback && successCallback(res); //res.items
			} else errorCallback && errorCallback();
		},
		doScan() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
		}
	},
	onLoad() {
		//console.log('onLoad');		
	},
	onShow() {
		this.qjmcnames = this.$abp.utils.getRolesValue(this.userInfo.roles, this.userInfo.roleNames);
		this.qjmcNames.length = 0; // this.qjmcNames = [];		
		this.qjmcNames = this.qjmcNames.concat(this.$abp.utils.qjmcNames);
		getApp().globalData.userInfoid = this.userInfo.id;
		//console.log(meScroll);
		//console.log(this.qjmcNames.length);
		this.lstlength = 0;
		if(this.qjmcNames.length>0)
		this.downCallback(meScroll);
	}
};
</script>

<style lang="scss">
.list_title {
	//margin-left: 21upx;
	//padding-top: 10upx;
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

.tj-item {
	color: #75787d;
	font-size: $font-sm + 4upx;
	margin-left: 4px;
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
</style>