<template>
	<view>
		<view class="list_items">
			<view class="list-info">
				<view><image class="portrait" :src="getImg(o.zzc)" mode="widthFix"></image></view>
				<view class="content">
					<view style="display: flex;" class="wtdw">
						型号规格：
						<view style="font-weight:bold;">{{ o.xhggmc }}</view>
					</view>
					<view style="display: flex;" class="wtdw">
						出厂编号：
						<view style="font-weight:bold;">{{ o.ccbh }}</view>
					</view>
					<p class="wtdw">制造厂家：{{ o.zzc }}</p>
					<p class="wtdw">精度指标：{{ o.jbcs.cjjd }}″，{{ dsz }}，{{ o.jbcs.bcjda }}+{{ o.jbcs.bcjdb }}</p>
					<p class="wtdw2">检定员：<text style="font-weight:bold;">{{ o.surname }}</text></p>
				</view>
			</view>
			<view style="padding-left: 20upx;" v-show="res">
				<view style="display: flex; width:90%;text-align: left;margin-left: 0px;align-items: center;" class="wtdw2">
					<div style="background-color: skyblue;width:4px;height:12px;vertical-align: bottom;margin-right: 2px;padding-right: 2px;"></div>
					检定结果
				</view>
				<view style="display: flex;"><div style="background-color: skyblue;width:98%;height:1px;vertical-align:top;"></div></view>
				<view style="display: flex;" class="wtdw">证书编号：{{ res[1] }}</view>
				<view style="display: flex;" class="wtdw">
					温度：({{ res[2] }})℃
					<view style="padding-left: 30upx;">气压：{{ res[3] }}hPa</view>
				</view>
				<view style="display: flex;" class="wtdw">1、照准误差:C={{ res[13] }}″</view>
				<view style="display: flex;" class="wtdw">2、指标差:I={{ res[6] }}″</view>
				<view style="display: flex;" class="wtdw">3、横轴误差:i={{ res[4] }}″</view>
				<view style="display: flex;" class="wtdw">4、一测回水平方向标准偏差：μH={{ res[7] }}″</view>
				<view style="display: flex;" class="wtdw">5、测量重复性：{{ res[14] }}mm</view>
				<view style="display: flex;" class="wtdw">6、加 常 数：K= {{ res[15] }}mm</view>
				<view style="display: flex;" class="wtdw">7、乘 常 数：R= {{ res[16] }}mm/km</view>
				<view style="display: flex;" class="wtdw">8、测距综合标准差：a={{ res[17] }}mm;b={{ res[18] }}mm/km</view>
			</view>
		</view>
		<view v-show="res" class="bottom-icon">
			<view class="doc" @click="OpenDoc(o.qjmcbm,o.id)"><text class="iconfont icon-Word fontsize2"></text></view>			
			<view class="xls" @click="OpenXls(o.qjmcbm,o.id)"><text class="iconfont icon-Excel1 fontsize2"></text></view>
		</view>	
		<button v-show="res" :disabled="o.surname == userInfo.realname" class="bottom-btn" @click="Hywb()">核验通过</button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';
import JDJLFM from '@/store/entities/jdjlfm';
import JBCS from '@/store/entities/jbcs';
import utils from '@/libs/common/utils.js';
export default {
	computed: mapState(['userInfo']),
	data() {
		return {
			dsz: '-',
			o: new JDJLFM(),
			res: ''
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			uni.switchTab({
				url: '/pages/main/main'
			});
		} else if (index === 1) {
		}
	},
	async onLoad(option) {
		var o = JSON.parse(option.o);
		this.o.id = o.id;
		this.o.ccbh = o.ccbh;
		this.o.djrq = o.djrq;
		this.o.dwmc = o.dwmc;
		this.o.qjmc = o.qjmc;
		this.o.qjmcbm = o.qjmcbm;
		this.o.xhggbm = o.xhggbm;
		this.o.xhggmc = o.xhggmc;
		this.o.zzc = o.zzcnr;
		this.o.jdzt = o.jdzt;
		this.o.surname = o.surname;

		this.o.jbcs.bcjda = '';
		this.o.jbcs.bcjdb = '';
		this.o.jbcs.cjjd = '';
		this.o.jbcs.axles = '';
		this.o.jbcs.bcfw = '';

		await this.getJbcs();
		// 显示计算结果
		this.showRawData();
	},
	onShow: function(e) {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		// if(currPage.data.ccbh==undefined || currPage.data.ccbh==''){
		// setData 传参数 修改出厂编号
		if (currPage.data) {
			if (currPage.data.ccbh) {
				this.o.ccbh = currPage.data.ccbh;
			} else if (currPage.data.data) {
				this.o.jbcs = currPage.data.data;
				if (this.o.jbcs.axles == '1') this.dsz = '单轴补偿';
				else this.dsz = '双轴补偿';
			}
		}
	},
	methods: {
		OpenDoc(bm,id){
			utils.OpenDoc(bm,id);
		},
		OpenXls(bm,id){
			utils.OpenXls(bm,id);
		},
		Hywb() {
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '确认该仪器核验通过？',
				success: function(res) {
					if (res.confirm) {
						_this.SetHywb();
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});
		},
		async SetHywb() {
			const res = await this.$store.dispatch({
				type: 'sjcl/SetHYWB',
				data: this.o.id
			});
			//console.log(res);
			if (res == 1) {
				// 首页数字刷新
				var msg = {
					messageType: 90,
					sendUserId: store.state.userInfo.realname + ' [App]', //消息发送人(登录用户ID)
					messageBody: ''
				};
				this.$signalR.sendMessage(JSON.stringify(msg));
				// 刷新待检列表记录，显示全部记录
				uni.reLaunch({
					url: '/pages/check/check'
				});
			}
		},
		async showRawData() {
			const res = await this.$store.dispatch({
				type: 'sjcl/ShowZshData',
				data: this.o.id
			});
			//console.log(JSON.parse(res));
			if (res) {
				this.res = JSON.parse(res);
			}
		},
		async getJbcs() {
			const res = await this.$store.dispatch({
				type: 'sjmx/GetQzyJbcs',
				data: this.o.xhggbm
			});
			//{"bcjda":2,"bcjdb":2,"cjjd":2,"bcfw":3,"axles":1,"id":745}
			//console.log(res);
			if (res) {
				var jbcs = new JBCS();
				jbcs.bcjda = res.bcjda;
				jbcs.bcjdb = res.bcjdb;
				jbcs.cjjd = res.cjjd;
				jbcs.axles = res.axles;
				jbcs.bcfw = res.bcfw;
				this.o.jbcs = jbcs;
				if (this.o.jbcs.axles == '1') this.dsz = '单轴补偿';
				else this.dsz = '双轴补偿';
			}
		},
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		getImg(zzc) {
			var img = '0';
			if (~zzc.indexOf('徕卡')) img = '1';
			else if (~zzc.indexOf('拓普康')) img = '2';
			else if (~zzc.indexOf('天宝')) img = '3';
			else if (~zzc.indexOf('索佳')) img = '4';
			else if (~zzc.indexOf('南方')) img = '5';
			else if (~zzc.indexOf('尼康')) img = '6';
			return '/static/ins/1000/' + img + '.png';
		}
	}
};
</script>

<style lang="scss">
.wtdw2 {
	font-size: 32upx;
	color: #0088cc;
}
.fab-box {
	position: absolute;
	right: 50upx;
	top: 50upx;
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
	width: 100upx;
	height: 100upx;
	background: whitesmoke;
	//background: #3c3e49;
	/* background: #5989b9; */
	border-radius: 10%;
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
	color: dodgerblue;
	font-size: 65upx;
	transition: all 0.3s;
	font-weight: bold;
}
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.list_items {
	margin: 21upx;
	background-color: #f8f8f8;
	//margin-top:21upx;
	border: 1px #dcdcdc solid;
}
.list-info {
	//height: 210upx;
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
		//border: 2upx solid lightgrey;
		//border-radius: 30%;
		//background-color: #8f8f94;
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
		.wtdw2 {
			font-weight: 400;
			font-size: 26upx;
			color: #8f8f94;
		}
		.notice {
			font-size: 32upx;
			color: #ff0000;
		}
	}
}
.bottom-btn {
	position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 16upx;
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
.fontsize2{
	color: #4c99e6;
	font-size: 60upx;
}
.doc {
	position: fixed;
	left: 180upx;
}
.xls {
	position: fixed;
	right: 180upx;
}
.bottom-icon {
	position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 76upx;
	z-index: 95;
	display: flex;
	width: 690upx;
	height: 120upx;
}
</style>
