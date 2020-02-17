<template>
	<view class="list">
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info" @tap="showDetails(o)">
				<view class="qjmc"><image class="portrait" :src="getImg(o.zzc)"></image>
				<view >{{ o.qjmc }}</view>
				</view>				
				<view class="content">
					<view>
						<h4 class="xhgg">{{ o.xhggmc }} / {{ o.ccbh }}</h4>
					</view>
					<p class="wtdw">委托单号：{{ o.wtdh }}</p>
					<p class="wtdw">委托单位：{{ o.wtdw }}</p>
					<p class="wtdw">委托日期：{{ format2(o.djrq) }}</p>

					<view class="wtdw" v-if="o.jdzt1 != '检完'">
						<p class="wtdw" :class="{ jdqx1: jdqx(o.yqjcrq, o.jwrq) }">要求检出日期：{{ format2(o.yqjcrq) }}</p>
					</view>
					<p class="wtdw" v-else>检完日期：{{ getJwrq(o.jwrq) }}</p>
					<p class="wtdw">检定员：{{ getJdy(o.jdy) }}<text style="padding-left: 50upx;">核验员:</text>{{ getJdy(o.hyy) }}</p>
					<p class="font-seal0">{{ o.jdzt1 }}</p>
					<p><view v-if="jdqx(o.yqjcrq) && o.jdzt1 != '检完'" class="font-seal">已超期</view></p>

					<p v-if="o.jdzt1 == '登记'" class="triangle-topright add_wtd"></p>
					<p v-else-if="o.jdzt1 == '检完'" class="triangle-topright over_wtd"></p>
					<p v-else class="triangle-topright working_wtd"></p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '@/libs/common/utils.js';
export default {
	props: {
		list: {
			// 数据列表
			type: Array,
			default() {
				return [];
			}
		}
		/*
        "sjdid": "1000028337",
        "qjmc": "全站仪",
        "djrq": "2019-10-09T16:17:02",
        "xhggmc": "TCR1201+",
        "xhggbm": "101422",
        "ccbh": "873709",
        "jdzt1": "检完",  登记 检完 正在检定
        "jdzt2": null,   100 200 222
        "zzc": "瑞士徕卡",
        "yqjcrq": "2019-10-23T16:17:02",
        "wtdw": "山东明嘉勘察测绘有限公司",
        "jdrq": "0001-01-01T00:00:00",
        "jwrq": "0001-01-01T00:00:00",
        "jdy": null,
        "bzsm": "",
        "id": 1000078434
		*/
	},
	data() {
		return {
			isActive: true
		};
	},
	onLoad() {
		console.log('---------------- template onLoad 不运行 ---------------');
	},
	onShow() {
		console.log('---------------- template onShow 不运行 ---------------');
	},
	created() {
		//console.log('---------------- template created ---------------');
		//console.log(utils.test());
	},
	methods: {
		showDetails(o){
			//console.log(o);
			let bm = o.qjmcbm;
			if(o.jdzt2>100)
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
		jdqx(item, item2) {
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
			return this.$moment('19720101').isAfter(item); // 1972-1-1 格式错误
		},
		getJdy(o) {
			if (o) return o;
			else return '-';
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
.list {
	padding-top: 80upx;
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
