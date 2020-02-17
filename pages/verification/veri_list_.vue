<template>
	<view class="list">
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info">
				<view><image class="portrait" :src="getImg(o.zzc)"></image></view>
				<view class="content">
					<view>
						<h4 class="xhgg">{{ o.xhggmc }} / {{ o.ccbh }}</h4>
					</view>
					<p class="wtdw">送检单位：{{ o.wtdw }}</p>
					
					<p v-show="!o.jdzt" class="font-seal0">登记</p>
					<p v-if="o.jdzt >= 100 && o.jdzt != 222" class="font-seal0">在检</p>
					<p v-if="o.jdzt == 222" class="font-seal0">检完</p>
					<p v-else><view v-if="jdqx(o.yqjcrq)" class="font-seal">已超期</view></p>

					<p v-if="o.jdzt1 == '登记'" class="triangle-topright add_wtd"></p>
					<p v-else-if="o.jdzt1 == '检完'" class="triangle-topright over_wtd"></p>
					<p v-else class="triangle-topright working_wtd"></p>

					<p :class="{ jdqx1: jdqx(o.yqjcrq) }">检定期限：{{ format(o.yqjcrq) }}</p>
					<!-- :class="jdqx(o.yqjcrq)"-->
					<view class="wtdw">
						检定项目：
						<view class="cu-tag radius bg-red">测角</view>
						<view class="cu-tag radius bg-blue">测距</view>
					</view>
				</view>
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
	data() {
		return {
			isActive: true
		};
	},
	onLoad() {
		console.log('---------------- 不运行 ---------------');
	},
	methods: {
		getStatusColorById: function(id, tag) {
			//console.log(id);
			var _color = {};
			switch (id) {
				case '登记':
					_color = 'add_wtd'; //登记
					break;
				case 222:
					_color = 'over_wtd'; //检完
					break;
				default:
					_color = 'working_wtd'; //在检
					break;
			}
			////console.log(JSON.stringify(_color))
			return _color;
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
		}
	}
};
</script>

<style lang="scss">
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
</style>
