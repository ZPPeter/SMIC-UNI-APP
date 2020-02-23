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
					<p class="wtdw">制造厂家：{{ o.zzc | formatZzcTextLength }}</p>
					<p class="wtdw">精度指标：{{ o.jbcs.cjjd }}″，{{ dsz }}，{{ o.jbcs.bcjda }}+{{ o.jbcs.bcjdb }}</p>
					<p class="wtdw2">
						检定员：
						<text style="font-weight:bold;">{{ o.surname }}</text>
					</p>
				</view>
			</view>
			<result-data v-if="res" :res="res"></result-data>
		</view>
		<view class="fab-box fab">
			<view class="fab-circle" @click="doReject()"><text class="iconfont icon-sey-Reject-a fontsize3"></text></view>
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
			<view><button :disabled="o.surname == userInfo.realname" class="bottom-btn" @click="Hywb()">核验通过</button></view>
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
import ResultData from './result.vue';
export default {
	computed: mapState(['userInfo']),
	components: {
		ResultData
	},
	data() {
		return {
			dsz: '-',
			o: new JDJLFM(),
			res: '',
			urgent: false,
			rejectInfo:''
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
		this.o.zzc = o.zzc;
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
		doReject() {
			var _this = this;
			this.vusui.prompt(
				{
					title: '请输入驳回原因', //设置标题
					formType: 2 //多行文本 textarea
				},
				value => {
					_this.rejectInfo = value;					
					_this.Reject();
				}
			);
		},
		async Reject(){
			const data = {
				id: this.o.id,
				info: this.rejectInfo
			};
			const res = await this.$store.dispatch({
				type: 'sjcl/SetReject',
				data: data
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
				// 刷新待核验列表记录，显示全部记录
				uni.reLaunch({
					url: '/pages/check/check'
				});
			}					
		},
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
		Hywb() {
			var _this = this;
			this.vusui.confirm(
				'确认该仪器核验通过？',
				function() {
					_this.SetHywb();
				},
				function() {
					//console.log('取消操作');
				}
			);
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
				// 微信通知
				if (this.urgent) {
					utils.shareMessage(this.o);
				}
				// 刷新待核验列表记录，显示全部记录
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
			return '/static/ins/' + this.o.qjmcbm + '/' + img + '.png';
		}
	}
};
</script>
<style lang="scss">
@import './../sjcl.scss';
</style>
<style lang="scss"></style>
