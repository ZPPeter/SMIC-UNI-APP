<template>
	<view>
		<view class="list_items">
			<view class="list-info">
				<view class="content">
					<view>
						<h4 class="wtdw">器具名称：{{ o.qjmc }}</h4>
					</view>
					<view style="display: flex;" class="wtdw">
						型号规格：
						<view style="font-weight:bold;">{{ o.xhggmc }}</view>
					</view>
					<view style="display: flex;" class="wtdw">
						出厂编号：
						<view style="font-weight:bold;">{{ o.ccbh }}</view>
					</view>
					<p class="wtdw">制造厂家：{{ o.zzcnr }}</p>
					<p class="wtdw">送检单位：{{ o.dwmc }}</p>
					<p class="wtdw">检定期限：{{ format(o.yqjchrq) }}</p>
					<p v-if="o.jdzt == 111" class="wtdw">检定员:{{ o.surname }}</p>
				</view>
			</view>
		</view>
		<view style="margin-left: 10px;">SORRY，目前暂不支持此类仪器！</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
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
		data() {
			return {
				o: ''
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.switchTab({
					url:'/pages/main/main'
				})
			} else if (index === 1) {
			}
		},
		onLoad(option) {			
			this.o = JSON.parse(option.o);
			//console.log(this.o.ccbh);
			//this.showDetail(option.id);
			//this.wtdh = option.wtdh;
			//this.wtdw = option.wtdw;
			//this.wtrq = this.format2(option.wtrq);
		},
		methods: {
			format(item) {
				//return new Date(item).Format('yyyy.MM.dd hh:mm:ss');
				return this.$moment(item).format('YYYY.MM.DD HH:mm:ss');
			}
		}
	}
</script>

<style lang="scss">
.tj-item {	
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.list_items{
	margin: 21upx;
	background-color:#F8F8F8;
	//margin-top:21upx;
	border: 1px #DCDCDC solid;
}
.list-info{
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
	.content{
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
	}
}
</style>
