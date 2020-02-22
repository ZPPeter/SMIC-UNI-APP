<template>
	<view>
		<h3 class="wtdh">委托单号：{{ wtdh }}</h3>
		<p class="wtdw2">委托单位：{{ wtdw }}</p>
		<p class="wtdw2">委托日期：{{ wtrq }}</p>
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info" @tap="showDetails(o)">
				<view class="qjmc"><image class="portrait" :src="getImg(o.zzc)"></image>
				<view>{{ o.qjmc }}</view>
				</view>
				<view class="content">
					<view>
						<h4 class="xhgg">{{ o.xhggmc }} / {{ o.ccbh }}</h4>
					</view>
					<p class="wtdw">证书编号：{{ o.zsbh }}</p>
					<view class="wtdw" v-if="o.jdzt != '222'">
						<p class="wtdw" :class="{ jdqx1: jdqx(o.yqjcrq, o.jwrq) }">要求检出日期：{{ format2(o.yqjcrq) }}</p>
					</view>
					<p class="wtdw" v-else>检完日期：{{ getJwrq(o.jwrq) }}</p>
					<p class="wtdw">检定员：{{ getJdy(o.jdy) }}<text style="padding-left: 50upx;">核验员:</text>{{ getJdy(o.hyy) }}</p>
					
					<p class="font-seal0">{{ jdzt(o.jdzt) }}</p>
					<p><view v-if="jdqx(o.yqjcrq) && o.jdzt != '222'" class="font-seal">已超期</view></p>
					
					<p v-if="o.jdzt == '100' " class="triangle-topright add_wtd"></p>
					<p v-else-if="o.jdzt == '222'" class="triangle-topright over_wtd"></p>
					<p v-else class="triangle-topright working_wtd"></p>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/libs/common/utils.js';
export default {
	data() {
		return {
			isActive: true,
			id:'',
			wtdh: '',
			wtdw: '',
			wtrq: '',
			list: ''
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
	onLoad(option) {
		//onLoad: function (option) {
		//this.wtd_obj = getApp().globalData.wtd_obj;
		//console.log(JSON.stringify(this.wtd_obj));
		//console.log(option);
		this.id = option.id;
		this.ListDetail(option.id);
		this.wtdh = option.wtdh;
		this.wtdw = option.wtdw;
		this.wtrq = this.format2(option.wtrq);
	},
	onShow() {
		let pages = getCurrentPages();
		let currPage = pages[pages.length-1];
		if(1==currPage.data.doReset){			
			this.ListDetail(this.id);
			uni.hideLoading();
		}
	},
	methods: {
		async ListDetail(id) {
			//console.log(id);
			const res = await this.$store.dispatch({
				type: 'sjmx/ListWtd',
				data: id
			});
			this.list = res;
			if (this.list.length > 0) {
				//this.wtdh = res[0].送检单号;
				//this.wtdw = res[0].单位名称;
				//this.wtrq = this.format2(res[0].送检日期);
			}
			//console.log(JSON.stringify(res));
		},		
		showDetails(o){
			//console.log(o);
			let bm = o.qjmcbm;
			if(o.jdzt>100)
			uni.navigateTo({
				url: '/pages/sjcl/'+bm+'/cx?o=' +  JSON.stringify(o)
			});
			//url: '/pages/sjcl/sorry?o=' +  JSON.stringify(o)
		},
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		format2(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD');
		},
		getJdy(o){
			if(o)
				return o;
			else
				return '-';
		},
		jdqx(item) {
			//console.log(this.$moment('1972-1-1').isAfter(item2));
			//if (this.$moment().isBefore(item) || this.$moment('1972-1-1').isAfter(item2)) {
			if (this.$moment().isBefore(item)) {
				return false; //'jdqx0';
			} else {
				return true; //'jdqx1';
			}
		},
		jdzt(zt2) {
			return utils.getJdzt(zt2);
		},
		jwrq(item) {
			return this.$moment('19720101').isAfter(item); // 错误格式：1972-1-1
		},
		getJwrq(item) {
			if (this.$moment('19720101').isBefore(item)) return this.format(item);
			else return '-';
		},
		getImg(zzc) {
			return utils.getImg(zzc);
		}
	}
};
</script>

<style lang="scss">
.wtdh {
	margin-top: 21upx;
	padding-left: 30upx;
}
.wtdw2 {
	padding-left: 30upx;
}
.list {
	padding-top: 40upx;
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
		border-radius: 5%;
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
		.jdqx0 {
			font-size: 26upx;
			color: #8f8f94;
		}
		.jdqx1 {
			font-size: 26upx;
			color: #e54d42;
			font-weight: 600;
			text-decoration: line-through;
		}
	}
}
.fab-box {
	position: absolute;
	right: 40upx;
	top: 40upx;
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
.font-seal0 {
	font-size: 12px;
	z-index: 2;
	position: absolute;
	right: -12px;
	top: 5px;
	border: 0px;
	transform: rotate(50deg);
	width: 53px;
	line-height: 20px;
	text-align: center;
	color: white;
	font-weight: bold;
}

.font-seal {
	font-size: 12px;
	z-index: 2;
	position: absolute;
	right: 8px;
	top: 24px;
	border: 1px solid #f73a3c;
	transform: rotate(50deg);
	width: 53px;
	line-height: 20px;
	text-align: center;
	color: #f73a3c;
	font-weight: bold;
}

.triangle-topright {
	position: absolute;
	right: 0px;
	top: 0px;
	width: 0;
	height: 0;
	border-top: 44px solid #fd9d2d;
	border-left: 2rem solid transparent;
	border-bottom: 1rem solid transparent;
}

.triangle-topright.add_wtd {
	border-top: 44px solid #56cf87;
}

.triangle-topright.working_wtd {
	border-top: 44px solid #0099ff;
}

.triangle-topright.over_wtd {
	border-top-color: #cccccc;
}
.qjmc {
	width: 112upx;
	font-size: 10px;
	z-index: 2;
	text-align: center;
	font-weight: bold;
}
</style>
