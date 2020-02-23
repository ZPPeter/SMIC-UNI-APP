<template>
	<view class="list">
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info" @tap="showDetails(o)">
				<view class="content">
					<view>
						<h5 class="xhgg">委托单号：{{ o.sjdid }} </h5>
					</view>
					<p class="wtdw">委托单位：{{ o.dwmc }}</p>
					<p class="wtdw">仪器件数：{{ o.yqjs }}</p>
					<p class="wtdw">检定期限：{{ format2(o.sjrq) }} - 
					<text class="wtdw" :class="{ jdqx1: jdqx0(o.yqjcrq) && o.jdzt!='检完' }">{{ format2(o.yqjcrq) }}</text></p>
					
					<p class="font-seal0">{{ o.jdzt }}</p>
					<view v-if="jdqx0(o.yqjcrq) && o.jdzt!='检完'" class="font-seal">已超期</view>
					
					<p v-if="o.jdzt == '登记'" class="triangle-topright add_wtd"></p>
					<p v-else-if="o.jdzt == '检完'" class="triangle-topright over_wtd"></p>
					<p v-else class="triangle-topright working_wtd"></p>
					
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
		"sjdid": "1551811",
        "dwmc": "山东省煤田地质局物探测量队",
        "sjrq": "2019-10-11T15:45:00",
        "yqjs": 3,
        "jdzt": "登记",
        "yqjcrq": "2019-10-21T15:44:30",
        "id": 1000028341
		*/
	},
	data() {
		return {
			isActive: true,
			jcrqlbl: '',
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
	},
	methods: {
		showDetails(o){
			//getApp().globalData.wtd_obj = o;
			uni.navigateTo({
				url: '/pages/wtdcx/wtd_details?id=' + o.id // + '&wtdh=' + o.sjdid + '&wtdw=' + o.dwmc + '&wtrq=' + o.sjrq
			});
		},
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY-MM-DD HH:mm:ss');
		},
		format2(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY-MM-DD');
		},
		jdqx0(item) {
			//console.log(this.$moment('1972-1-1').isAfter(item2));
			//if (this.$moment().isBefore(item) || this.$moment('1972-1-1').isAfter(item2)) {
			if (this.$moment().isBefore(item)) {
				return false; //'jdqx0';
			} else {
				return true; //'jdqx1';
			}
		},
		jdqx(jdzt,item) {
			//console.log(jdzt);
			//console.log(item);
			this.jcrqlbl = "检完日期：" + this.$moment(item).format('YYYY-MM-DD');
			if(jdzt==='检完'){
				return true;
			}
			if (this.$moment().isBefore(item)) {
				return false;//'jdqx0';
			} else {
				this.jcrqlbl = "要求检出日期：" + this.$moment(item).format('YYYY-MM-DD');
				return true;//检完
			}
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
		margin-left: 12upx;
		.xhgg {
			font-size: 26upx;
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
</style>
