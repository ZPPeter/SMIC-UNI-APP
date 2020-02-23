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
					<p class="wtdw" v-show="o.jbcs">精度指标：{{ o.jbcs.cjjd }}″，{{ dsz }}，{{ o.jbcs.bcjda }}+{{ o.jbcs.bcjdb }}</p>					
				</view>
			</view>
			<result-data v-if="res" :res="res"></result-data>
		</view>
		<view class="fab-box fab" @click="Reset()">
			<view class="fab-circle">
			<text :class="[hasRight?'fontcolor1':'fontcolor2']" class="iconfont icon-zhongxinpingjuan fontsize"></text>
			</view>	
		</view>		
		<view v-show="res" class="bottom-icon2">
			<view class="doc2" @click="OpenDoc(o.qjmcbm,o.id)"><text class="iconfont icon-Word fontsize2"></text></view>			
			<view class="xls2" @click="OpenXls(o.qjmcbm,o.id)"><text class="iconfont icon-Excel1 fontsize2"></text></view>
		</view>
		<vus-layer></vus-layer>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';
import JDJLFM from '@/store/entities/jdjlfm';
import JBCS from '@/store/entities/jbcs';
import ResultData from './result.vue';
import utils from '@/libs/common/utils.js';
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
			zzc: "瑞士徕卡"
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
			hasRight:false
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

		this.o.jbcs.bcjda = '';
		this.o.jbcs.bcjdb = '';
		this.o.jbcs.cjjd = '';
		this.o.jbcs.axles = '';
		this.o.jbcs.bcfw = '';

		await this.getJbcs();
		if (this.o.jdzt> 100) {
			// 显示计算结果
			this.showRawData();
		}
		// 开始检定一个月之内可以重新检定
		this.hasRight = this.$moment().isBefore(this.$moment(o.jdrq).add(1, 'M')) && this.userInfo.roles.includes(this.o.qjmcbm);
	},
	methods: {
		OpenDoc(bm,id){
			utils.OpenDoc(bm,id);
		},
		OpenXls(bm,id){
			utils.OpenXls(bm,id);
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
		Reset() {
			if(!this.hasRight) return;
			var _this = this;
			this.vusui.confirm(
				'确认重新检定该仪器？',
				function() {
					_this.DoReset();
				},
				function() {
					//console.log('取消操作');
				}
			);
		},
		async DoReset() {
			const res = await this.$store.dispatch({
				type: 'sjcl/ResetJdzt',
				data: this.o.id
			});			
			if (res == 1) {
				// 首页数字刷新
				var msg = {
					messageType: 90,
					sendUserId: store.state.userInfo.realname + ' [App]', //消息发送人(登录用户ID)
					messageBody: ''
				};
				this.$signalR.sendMessage(JSON.stringify(msg));
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面				    
				//console.log(prevPage); // 此处报 toJSON 错			
				//prevPage.$vm.nick_name='aaaaa'
				// 按照打印结构这样赋值虽然成功但页面数据不会修改
				// prevPage.data.$root[0].address = this.addressLists[index].address
				// prevPage.data.$root[0].address_id = this.addressLists[index].id
				prevPage.setData({
					doReset:1
				});
				uni.navigateBack();
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