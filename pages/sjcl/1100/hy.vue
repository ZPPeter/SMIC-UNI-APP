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
					<p class="wtdw">精度指标：{{ o.jdzb }}″</p>
					<p class="wtdw">制造厂家：{{ o.zzc | formatZzcTextLength }}</p>					
					<p class="wtdw2">检定员：<text style="font-weight:bold;">{{ o.surname }}</text></p>
				</view>
			</view>
			<result-data :res="res"></result-data>
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
import utils from '@/libs/common/utils.js';
import ResultData from './result.vue';
export default {
	computed: mapState(['userInfo']),
	components: {
		ResultData
	},
	data() {
		return {			
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
		// 显示计算结果
		this.showRawData();
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
		OpenDoc(bm,id){
			utils.OpenDoc(bm,id);
		},
		OpenXls(bm,id){
			utils.OpenXls(bm,id);
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
				this.o.jdzb = this.res[14];
			}
		},		
		format(item) {
			//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
			return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
		},
		getImg(zzc) {
			return '/static/ins/' + this.o.qjmcbm + '/default.jpg';
		}
	}
};
</script>
<style lang="scss">
@import './../sjcl.scss';
</style>
<style lang="scss"></style>