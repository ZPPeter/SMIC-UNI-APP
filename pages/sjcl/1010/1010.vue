<template>
	<view>
		<view class="list_items">
			<view class="list-info">
				<view @click="getRawData()"><image class="portrait" :src="getImg(o.zzc)" mode="widthFix"></image></view>
				<view class="content">
					<view style="display: flex;" class="wtdw">
						型号规格：
						<view style="font-weight:bold;">{{ o.xhggmc }}</view>
					</view>
					<view style="display: flex;" class="wtdw">
						出厂编号：
						<view style="font-weight:bold;">{{ o.ccbh }}</view>
					</view>
					<p class="wtdw">精度指标：J{{ jdzb2 }}</p>
					<p class="wtdw">制造厂家：{{ o.zzc }}</p>
					<p v-if="o.jdzt == 111" class="wtdw2">
						检定员：
						<text style="font-weight:bold;">{{ o.surname }}</text>
					</p>
				</view>
			</view>
			<result-data v-if="res" :res="res"></result-data>
		</view>
		<view class="fab-box fab">
			<view class="fab-circle" @click="doSetting(o)"><text class="iconfont icon-Setting fontsize"></text></view>
		</view>
		<view v-show="res" class="bottom-icon">
			<view class="doc" @click="OpenDoc(o.qjmcbm, o.id)"><text class="iconfont icon-Word fontsize2"></text></view>
			<view class="xls" @click="OpenXls(o.qjmcbm, o.id)"><text class="iconfont icon-Excel1 fontsize2"></text></view>
		</view>
		<view v-show="res" class="bottom-view">
			<view>
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox value="urgent" :checked="urgent" color="#FFCC33" style="transform:scale(0.9)" />
						加急
					</label>
				</checkbox-group>
			</view>
			<view>
				<button :disabled="o.surname != userInfo.realname" class="bottom-btn" @click="Jdwb()">{{ btnJDWB }}</button>
			</view>
		</view>
		<vus-layer></vus-layer>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import store from '@/store';
import JDJLFM from '@/store/entities/jdjlfm';
import utils from '@/libs/common/utils.js';
import ResultData from './result.vue';
import config from '@/libs/common/config.js';
export default {
	computed: mapState(['userInfo']),
	components: {
		ResultData
	},
	data() {
		return {
			MBMC: config.TemplateType.MB1010,
			WEATHER: config.WeatherType.In,
			o: new JDJLFM(),
			btnJDWB: '检完确认',
			res: '',
			jdzb2: '',
			urgent: false
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
		//console.log(o);
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

		this.jdzb2 = '2'; // 2 6
		this.o.jdzb = this.jdzb2;

		if (this.o.jdzt == 111 || this.o.jdzt == 122) {
			// 显示计算结果
			this.showRawData();
		}
	},
	onShow: function(e) {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		// if(currPage.data.ccbh==undefined || currPage.data.ccbh==''){
		// setData 传参数 修改出厂编号
		if (currPage.data) {
			if (currPage.data.ccbh) {
				this.o.ccbh = currPage.data.ccbh;
			}
			if (currPage.data.jdzb) {
				this.jdzb2 = currPage.data.jdzb;
				this.o.jdzb = this.jdzb2;
			}
		}
	},
	methods: {
		checkboxChange: function(e) {
			var val = e.detail.value;
			if (val == 'urgent') this.urgent = true;
			else this.urgent = false;
			//console.log(this.urgent);
		},
		OpenDoc(bm, id) {
			utils.OpenDoc(bm, id);
		},
		OpenXls(bm, id) {
			utils.OpenXls(bm, id);
		},
		Jdwb() {
			var _this = this;
			this.vusui.confirm(
				'确认该仪器已经检定完毕？',
				function() {
					_this.SetJdwb();
				},
				function() {
					//console.log('取消操作');
				}
			);
		},
		async SetJdwb() {
			const res = await this.$store.dispatch({
				type: 'sjcl/SetJDWB',
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
				
				// 微信通知
				if (this.urgent) {
					utils.shareMessage(this.o);
				}
				
				// 刷新待检列表记录，显示全部记录
				uni.reLaunch({
					url: '/pages/verification/verification'
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
				this.jdzb2 = this.res[10];
				this.o.jdzb = this.jdzb2;
			}
		},
		async getRawData() {
			// 读取 xls
			//console.log((this.o.jdzt==111 && this.o.surname!=this.userInfo.realname));
			if (this.o.jdzt == 111 && this.o.surname != this.userInfo.realname) {
				this.btnJDWB = '检定员: ' + this.o.surname;
				uni.showToast({
					title: '该仪器检定员是: ' + this.o.surname,
					icon: 'none',
					duration: 2800
				});
				return;
			}
			this.btnJDWB = '检完确认';
			this.o.surname = this.userInfo.realname;

			var WQ = this.$abp.utils.getWQ(this.WEATHER); // 0InOut 1In 2Out
			//console.log(WQ);
			const jdjlfm = {
				id: this.o.id,
				dwmc: this.o.dwmc,
				jdrq: this.o.djrq,
				dwdz: '/',
				qjmc: this.o.qjmc,
				xhgg: this.o.xhggmc,
				zzc: this.o.zzc,
				ccbh: this.o.ccbh,
				jjwd: WQ[0],
				cjjd: this.jdzb2, //经纬仪 2 6
				qt01: '',
				qt02: '',
				qt03: '',
				qt04: '',
				qt05: ''
			};
			const rawTemplate = {
				qjmcbm: this.o.qjmcbm,
				qjmc: this.o.qjmc,
				mbmc: this.MBMC
			};
			const CertDto = {
				jdjlfm: jdjlfm,
				rawTemplate: rawTemplate
			};
			//console.log(CertDto);
			const res = await this.$store.dispatch({
				type: 'sjcl/MakeXlsCert',
				data: CertDto
			});
			//console.log(res);
			if (res) {
				this.res = res;
				// 首页数字刷新
				var msg = {
					messageType: 90,
					sendUserId: store.state.userInfo.realname + ' [App]', //消息发送人(登录用户ID)
					messageBody: ''
				};
				this.$signalR.sendMessage(JSON.stringify(msg));
			}
		},
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		getImg(zzc) {
			return '/static/ins/' + this.o.qjmcbm + '/default.jpg';
		},
		doSetting(o) {
			//console.log(JSON.stringify(o));
			uni.navigateTo({
				url: '/pages/sjcl/' + o.qjmcbm + '/set?o=' + JSON.stringify(o)
			});
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
.fontsize2 {
	color: #4c99e6;
	font-size: 60upx;
}
.bottom-view {
	position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 16upx;
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
}
.bottom-btn {
	width: 500upx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
.doc {
	position: fixed;
	right: 180upx;
}
.xls {
	position: fixed;
	right: 70upx;
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
