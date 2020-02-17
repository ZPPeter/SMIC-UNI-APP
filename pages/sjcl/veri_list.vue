<template>
	<view class="list">
		<view class="list_items" v-for="o in list" :key="o.id">
			<view class="list-info">
				<view class="qjmc"><image class="portrait" :src="getImg(o.zzcnr)"></image>
				<view >{{ o.qjmc }}</view>
				</view>				
				<view class="content">
					<view>
						<h4 class="xhgg">{{ o.xhggmc }} / {{ o.ccbh }}</h4>
					</view>
					<p class="wtdw">委托单号：{{ o.sjdid }}</p>
					<p class="wtdw">委托单位：{{ o.dwmc }}</p>
					<p class="wtdw">委托日期：{{ format2(o.djrq) }}</p>
					<p v-if="o.jdzt > 100" class="wtdw">检定日期：{{ getJwrq(o.jdrq) }}</p>									
					<p v-if="o.jdzt > 100" class="wtdw">检定员：{{ getJdy(o.surname) }}<text style="padding-left: 50upx;">核验员:</text>{{ getJdy(o.hyy) }}</p>					
					<view>
						<p class="wtdw" :class="{ jdqx1: jdqx(o.yqjcrq) }">要求检出日期：{{ format2(o.yqjcrq) }}</p>
					</view>	
					
					<p class="font-seal0">{{ jdzt(o.jdzt) }}</p>
					<p><view v-if="jdqx(o.yqjcrq)" class="font-seal">已超期</view></p>

					<p v-if="o.jdzt == 100" class="triangle-topright add_wtd"></p>
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
	},
	data() {
		return {
			isActive: true
		};
	},
	onLoad() {
		console.log(this.list[0]);
	},
	methods: {
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		format2(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD');
		},
		jdqx(item) {
			if (this.$moment().isBefore(item)) {
				return false; //'jdqx0';
			} else {
				return true; //'jdqx1';
			}
		},
		jdzt(zt2) {
			if(zt2==100)
			return '登记';
			else
			return '在检';
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
	},
	watch: {
		list: function() {
			//console.log(JSON.stringify(this.list[0]));
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
