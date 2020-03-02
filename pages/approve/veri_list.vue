<template>
	<view class="list">
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
					<view v-if="jdqx(o.yqjchrq)" class="font-seal">已超期</view>
					<p class="wtdw">登记时间：{{ format(o.djrq) }}</p>
					<p :class="{ jdqx1: jdqx(o.yqjchrq) }">检定期限：{{ format(o.yqjchrq) }}</p>
					<p class="wtdw">检完日期：{{ format(o.jwrq) }}</p>
					<p class="wtdw">检定员:{{ o.surname }}<text style="padding-left: 20upx;">核验员:</text>{{ o.hyy }}</p>					
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import store from '@/store';
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
		console.log('----------------组件 onLoad 是无效的 ---------------');
	},
	methods: {
		showDetails(o){
			let bm = o.qjmcbm;
			uni.navigateTo({
				url: '/pages/sjcl/'+bm+'/pz?o=' +  JSON.stringify(o)
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
		getImg(zzc) {
			return utils.getImg(zzc);
		}
	}
};
</script>

<style lang="scss">
.list {
	padding-top: 50upx;
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
</style>
