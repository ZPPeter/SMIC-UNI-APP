<template name="dashboard">
	<view class="content">
		<view class="user-section">
			<view class="time">{{ gDate }}</view>
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="userInfo.portrait || '/static/img/missing-face.png'" @tap="navTo('/pages/user/userinfo')"></image></view>
				<view>
					<text class="username">{{ userInfo.realname || '未登录' }}</text>
				</view>
				<view class="list-info">
					<view class="list-item" @tap="navTo('/pages/sjcl/getalltasks')">
						<text class="data">{{ datas[0] }}</text>
						<text class="data1">台</text>
						<!--所有未完成-->
					</view>
				</view>
			</view>
			<view class="list-info-box">
				<view class="list-item" @click="switchTo('/pages/verification/verification')">
					<text class="list-num">{{ datas[1] }}</text>
					<text class="list">待检</text>
				</view>
				<view>
					<div style="background-color: #c1c1c1;width:1px;"></div>
				</view>
				<view class="list-item" @click="switchTo('/pages/verification/verification')">
					<text class="list-num">{{ datas[2] }}</text>
					<text class="list">在检</text>
				</view>
				<view>
					<div style="background-color: #c1c1c1;width:1px;"></div>
				</view>
				<view class="list-item"  @click="switchTo('/pages/check/check')">
					<text class="list-num">{{ datas[3] }}</text>
					<text class="list">核验</text>
				</view>
				<view>
					<div style="background-color: #c1c1c1;width:1px;"></div>
				</view>
				<view class="list-item" @click="switchTo('/pages/approve/approve')">
					<text class="list-num">{{ datas[4] }}</text>
					<text class="list">批准</text>
				</view>
			</view>
		</view>
		<view class="dashboard">
			<view class="dashboard1">工作台</view>
			<view class="dashboard2">
				<view class="cu-capsule radius">
					<view class="cu-tag bg-grey ">工作量</view>
					<view class="cu-tag line-grey">今年:{{ datas[5] }}，去年:{{ datas[6] }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';
var weekAry = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
var d = new Date();
export default {
	name: 'dashboard',
	props: {
		datas: Array, // datas
		gDate: String
	},
	computed: mapState(['hasLogin', 'userInfo']),
	data() {
		return {
			//data:[0,0,0,0,0,0,0]
		};
	},
	created: async function() {
		//this.data[0] = 125;
		//this.Init();
	},
	onLoad() {
		//组件生命周期区别于页面生命周期，没有onShow，onLoad
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url:url
			})
		},
		/*GetData(i) {
			if (this.hasLogin) {
				return this.$store.state.latestData.Data[i];
			}
		},*/
		switchTo(tab) {
			if (tab == '/pages/approve/approve' && !this.userInfo.roles.includes('批准')) {
				uni.showToast({
					icon: 'none',
					title: '您没有证书批准权限，无法查看该项列表！'
				});
				return;
			} 
			uni.switchTab({
				url: tab
			});
		},
		async Init(){
			//console.log('Init');
			/*
			if (!this.hasLogin) 
				return;
			this.data = store.state.latestData.Data;
			const res1 = await store.dispatch({
					type: 'sjmx/GetDashboardDatas'
				});
				if (res1 != '') {
				
					if (res1[6] > 0)
						store.state.latestData.stats = Math.round((res1[5] / res1[6]) * 1000) / 10;//工作量%
					
					//this.data[0] = 25;// 这样写不会刷新页面数据
					Vue.set(this.data,0,res1[0]); // 未完成
					Vue.set(this.data,1,res1[1]); // 待检
					Vue.set(this.data,2,res1[2]); // 在检
					Vue.set(this.data,3,res1[3]); // 核验
					Vue.set(this.data,4,res1[4]); // 批准
					Vue.set(this.data,5,res1[5]); // 今年
					Vue.set(this.data,6,res1[6]); // 去年
										
					if (Number(res1[1] + res1[2]) > 0) {
						uni.setTabBarBadge({
							index: 1,
							text: (Number(res1[1]) + Number(res1[2])).toString()
						});
					}
					if (res1[3] > 0) {
						uni.setTabBarBadge({
							index: 2,
							text: res1[3]
						});
					}
					if (res1[4] > 0) {
						uni.setTabBarBadge({
							index: 3,
							text: res1[4]
						});
					}
				}
			*/
		}
	}
};
</script>

<style lang="scss">
.user-section {
	flex-direction: column;
	width: 100vw;
	height: 400upx;
	padding: 20upx 30upx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px); //图像高斯模糊度
		opacity: 0.8; //图像透明度
	}
}
.user-info-box {
	width: 95%;
	height: 120upx;
	align-items: center;
	position: absolute; //relative
	top: 90upx;
	z-index: 1;
	.portrait-box{
		margin-left: 20upx;
	}
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		font-size: $font-lg + 4upx;
		margin-left: 20upx;
		//color: $font-color-dark;
		color: #e4e7ed; //#555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
	}
}
.list-info {
	justify-content: space-around;
	align-content: center;
	//position: relative;
	position: absolute;
	right: 120upx;
	margin-top: 0upx;
	z-index: 1;
	.list-item {
		//display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: right;
		width: 100%;
		height: 120upx;
		//border-radius: 10upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	.data {
		font-size: $font-lg + 96upx;
		color: #ff0000; //#555;
		text-shadow: 1px 5px 5px rgba(0, 0, 0, 0.8);
	}
	.data1 {
		font-size: $font-lg;
		color: white;//#555;
		position: absolute;
		top: 60upx;
		right: -40upx;
	}
}
.list-info-box {
	justify-content: space-around;
	align-content: center;
	position: relative;
	margin-top: 180upx;
	z-index: 1;
	.list-item {
		//display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 120upx;
		height: 120upx;
		//border-radius: 10upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	.list-num {
		font-size: $font-lg + 4upx;
		color: $font-color-dark;
		margin-left: 0upx;
		color: #e4e7ed;
	}
	.list {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-left: 0upx;
		color: #e4e7ed;
	}
}
.dashboard {
	width: 100%;
	height: 75upx;
	text-align: left;
	color: #808080;
	padding: 10upx;
	background-color: #e4e7ed;
	.dashboard1 {
		font-size: $font-base + 2upx;
		width: 120upx;
	}
	.dashboard2 {
		width: 100%;
		justify-content: flex-end;
	}
}
.content {
	flex-direction: column;
	flex: 1;
	background-color: #0081ff;
}
</style>
