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
					<p class="wtdw">制造厂家：{{ o.zzc | formatZzcTextLength }}</p>
					<p v-if="o.jdzt == 111" class="wtdw2">
						检定员：
						<text style="font-weight:bold;">{{ o.surname }}</text>						
						<text style="padding-left: 35upx;">核验员：</text>
						<text style="font-weight:bold;">{{ o.hyy }}</text>
					</p>
					<p v-if="o.jdzt == 111 && o.hyyj.length>0" class="wtdw2">						
						<text style="color: #DD514C,font-weight:bold;">{{ o.hyyj }}</text>
					</p>
					<p v-if="o.jdzt == 111 && o.pzyj.length>0" class="wtdw2">
						<text style="color: #DD514C,font-weight:bold;">{{ o.pzyj }}</text>
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

		this.o.zzc = o.zzc;
		this.o.jdzt = o.jdzt;

		this.o.surname = o.surname;
this.o.hyy = o.hyy;
this.o.hyyj = o.hyyj;
this.o.pzyj = o.pzyj;

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
@import './../sjcl.scss';
</style>
<style lang="scss"></style>