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
					<p class="wtdw">制造厂家：{{ o.zzc }}</p>
					<p class="wtdw" v-show="o.jbcs">精度指标：{{ o.jbcs.cjjd }}″，{{ dsz }}，{{ o.jbcs.bcjda }}+{{ o.jbcs.bcjdb }}</p>
					<p class="notice" v-show="!o.jbcs">请设置精度指标!!!</p>
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
import JBCS from '@/store/entities/jbcs';
import utils from '@/libs/common/utils.js';
import config from '@/libs/common/config.js';
import ResultData from './result.vue';
export default {
	/*
			id: 0
			qjmc: "全站仪"
			qjmcbm: "1000"
			jdyid: 0
			surname: null
			sjdid: "1000027631"
			xhggbm: "102598"
			djrq: "2019-04-24T08:46:44"
			yqjchrq: "2019-05-08T08:46:44"
			dwmc: "中建筑港集团有限公司"
			xhggmc: "TS09plus"
			zzcnr: "瑞士徕卡"
			ccbh: "1401505"
			jdzt: 100
			bzsm: ""
			//jwrq: "0001-01-01T00:00:00"
			//jdrq: "0001-01-01T00:00:00"
		*/
	computed: mapState(['userInfo']),
	components: {
		ResultData
	},
	data() {
		return {
			dsz: '-',
			o: new JDJLFM(),
			btnJDWB: '检完确认',
			res: '',
			urgent: false
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			uni.switchTab({
				url: '/pages/main/main'
			});
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

		this.o.jbcs.bcjda = '';
		this.o.jbcs.bcjdb = '';
		this.o.jbcs.cjjd = '';
		this.o.jbcs.axles = '';
		this.o.jbcs.bcfw = '';

		await this.getJbcs();
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
			} else if (currPage.data.data) {
				this.o.jbcs = currPage.data.data;
				if (this.o.jbcs.axles == '1') this.dsz = '单轴补偿';
				else this.dsz = '双轴补偿';
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
			/*
			uni.showModal({
				title: '提示',
				content: '确认该仪器已经检定完毕？',
				success: function(res) {
					if (res.confirm) {
						_this.SetJdwb();
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});*/
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
				/*
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				var prevPage2 = pages[pages.length - 3]; //再上一个页面
				prevPage.setData({ ccbh: this.n_ccbh });
				prevPage2.setData({ ccbh: this.n_ccbh });
				uni.navigateBack();
				*/
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
			if (this.o.jbcs && this.o.jbcs.cjjd != '') {
				/*
				jdjlfm.QT05 = new Random().Next(990, 1030).ToString();   // 气压
			    jdjlfm.JJWD = wd.GetTemperature(ETemperature.InOutRoom); // 全站仪 室内外温度
			    */
				var WQ = this.$abp.utils.getWQ(0);
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
					qT05: WQ[1],
					cjjd: this.o.jbcs.cjjd,
					qT01: this.o.jbcs.bcfw, // 3
					qT02: this.o.jbcs.bcjda,
					qT03: this.o.jbcs.bcjdb,
					qT04: this.o.jbcs.axles
				};
				const rawTemplate = {
					qjmcbm: this.o.qjmcbm,
					qjmc: this.o.qjmc,
					mbmc: 'M02'
				};
				//const signer = [370340, 370540, 370440];
				const CertDto = {
					jdjlfm: jdjlfm,
					rawTemplate: rawTemplate
					//signer: signer
				};
				const res = await this.$store.dispatch({
					type: 'sjcl/MakeXlsCert',
					data: CertDto
				});
				//console.log(res);
				if (res) {
					this.res = res;
					//console.log(store.state.userInfo.realname + ' [App]');
					// 首页数字刷新
					var msg = {
						messageType: 90,
						sendUserId: store.state.userInfo.realname + ' [App]', //消息发送人(登录用户ID)
						messageBody: ''
					};
					this.$signalR.sendMessage(JSON.stringify(msg));
				}
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
		},
		doSetting(o) {
			//console.log(JSON.stringify(o));
			uni.navigateTo({
				url: '/pages/sjcl/1000/set?o=' + JSON.stringify(o)
			});
		}
}
};
</script>

<style lang="scss">
@import './../sjcl.scss';
</style>
<style lang="scss"></style>
