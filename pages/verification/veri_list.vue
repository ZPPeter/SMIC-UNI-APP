<template> 
	<view class="list">
		<view style="display: flex; width:90%;text-align: left; margin-left: 6px;align-items: center;overflow:hidden;">
			<view class="tj-item">器具名称:【{{ qjmcnames }}】</view>
		</view>
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info" @tap="showDetails(o)">
				<view class="qjmc"><image class="portrait" :src="getImg(o.zzc)"></image>
				<view>{{ o.qjmc }}</view>
				</view>	
				<view class="content">
					<view>
						<h4 class="xhgg">{{ o.xhggmc }} / {{ o.ccbh }}</h4>
					</view>
					<p class="wtdw">送检单位：{{ o.dwmc }}</p>
					
					<p v-show="o.jdzt == 100" class="font-seal0">登记</p>
					<p v-if="o.jdzt == 111" class="font-seal0">在检</p>
					<view v-if="jdqx(o.yqjchrq)" class="font-seal">已超期</view>					
					
					<view v-if="o.jdzt == 111" class="jdy cu-capsule">
						<view class="cu-tag bg-gray" :class="{ isme: !isme(o.surname) }">{{ o.surname }}</view>
					</view>
					
					<p v-if="o.jdzt == 100" class="triangle-topright add_wtd"></p>
					<p v-else class="triangle-topright working_wtd"></p>
					
					<p class="wtdw">登记时间：{{ format(o.djrq) }}</p>
					<p :class="{ jdqx1: jdqx(o.yqjchrq) }">检定期至：{{ format(o.yqjchrq) }}</p>

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	import utils from '@/libs/common/utils.js';
export default {
	props: {
		qjmcnames:String,
		list: {
			// 数据列表
			type: Array,
			default() {
				return [];
			}
		}
		/*
			bzsm: ""
			ccbh: "1401505"
			djrq: "2019-04-24T08:46:44"
			id: 0
			img: null
			jdrq: "0001-01-01T00:00:00"
			jdy: null
			jdzt: null
			jwrq: "0001-01-01T00:00:00"
			qjmc: "全站仪"
			sjdid: "1000027631"
			wtdw: "中建筑港集团有限公司"
			xhggbm: "102598"
			xhggmc: "TS09plus"
			yqjcrq: "2019-05-08T08:46:44"
			zzc: "瑞士徕卡"
		*/
	},
	computed: mapState(['userInfo']),
	data() {
		return {
			isActive: true
		};
	},
	onLoad() {
		console.log('----------------组件 onLoad 是无效的 ---------------');
	},
	methods: {
		isme(obj) {
			return this.userInfo.realname == obj;
		},
		showDetails(o){
			let bm = o.qjmcbm;
			uni.navigateTo({
				url: '/pages/sjcl/'+bm+'/'+bm+'?o=' +  JSON.stringify(o)
			});
			//url: '/pages/sjcl/sorry?o=' +  JSON.stringify(o)
		},
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		jdqx(item) {
			if (this.$moment().isBefore(item)) {
				return false; //'jdqx0';
			} else {
				return true; //'jdqx1';
			}
		},
		lastReadTime() {
			return this.$store.state.user.readLastNoticeTime;
		},
		getImg(zzc) {
			return utils.getImg(zzc);
		}		
	}
};
</script>

<style lang="scss">
.list {
	padding-top: 65upx;
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
.qjmc {
	width: 112upx;
	font-size: 10px;
	z-index: 2;
	text-align: center;
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
}

.triangle-topright.add_wtd {
	border-top: 44px solid #56cf87;
}

.triangle-topright.working_wtd {
	border-top: 44px solid #0099FF;
}

.triangle-topright.over_wtd {
	border-top-color: #cccccc;
}
.jdy {
	position: absolute;
	right: 15px;
	bottom: 20upx;
	//color: #868686;
	font-size: 14px;
	font-weight: bold;
}
.isme {
	color: #c5c5c5;
}
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
</style>
