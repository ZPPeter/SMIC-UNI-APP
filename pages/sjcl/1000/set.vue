<template>
	<view class="container" style="padding-top: 20upx;background: #fff;">
		<view class="list-cell1 b-b">
			<text class="cell-tit">型号规格：{{ o.xhggmc }}</text>
		</view>
		<view class="list-cell b-b">
			<text class="cell-tit">制造厂家：{{ o.zzc }}</text>
		</view>

		<view class="list-cell b-b" @click="navTo('/pages/sjcl/update_ccbh')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">出厂编号：{{ o.ccbh }}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo2('/pages/sjcl/1000/update_jbcs')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit" v-show="o.jbcs">精度指标：{{ o.jbcs.cjjd }}″，{{dsz}}，{{ o.jbcs.bcjda }}+{{ o.jbcs.bcjdb }}</text>
			<text class="cell-tit2" v-show="!o.jbcs">请设置精度指标!!!</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view style="padding-top: 20upx;padding-left: 40upx;padding-right: 40upx;color:#EE9900;">
			<p>提示：</p>
			<p>1、出厂编号可以修改。</p>
			<p>2、精度指标只能新增，修改在PC系统进行。</p>
		</view>
	</view>
</template>

<script>
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import { mapState } from 'vuex';
export default {
	components: {
		uniNoticeBar
	},
	data() {
		return {
			dsz: '-',
			o: ''
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	onLoad(option) {
		if (option) {
			this.o = JSON.parse(option.o);
			if (this.o.jbcs.axles == '1') this.dsz = '单轴补偿';
			else this.dsz = '双轴补偿';
		}
	},
	onShow: function(e) {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		// if(currPage.data.ccbh==undefined || currPage.data.ccbh==''){
		// setData 传参数
		if (currPage.data.ccbh) {
			this.o.ccbh = currPage.data.ccbh;
		}
		else if (currPage.data.data) {
			this.o.jbcs = currPage.data.data;
			//console.log(currPage.data.data);
			if (this.o.jbcs.axles == '1') this.dsz = '单轴补偿';
			else this.dsz = '双轴补偿';
		}
	},
	methods: {
		navTo(url) {
			const data = {
				id: this.o.id,
				ccbh: this.o.ccbh
			};
			//console.log(data);
			if (url)
				uni.navigateTo({
					url: url + '?o=' + JSON.stringify(data)
				});
		},
		navTo2(url) {
			const data = {
				id: this.o.id,
				jbcs: this.o.jbcs
			};
			//console.log(data);
			if (url)
				uni.navigateTo({
					url: url + '?o=' + JSON.stringify(data)
				});
		}
	}
};
</script>

<style lang="scss">
.list-cell1 {
	padding: 5upx $page-row-spacing;
	line-height: 35upx;
	background: #fff;
	&.b-b:after {
		left: 30upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base - 0upx;
		color: #8f8f94;
		margin-right: 10upx;
	}
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 10upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base - 0upx;
		color: #8f8f94; //$font-color-dark
		margin-right: 10upx;
	}
	.cell-tit2 {
		flex: 1;
		font-size: $font-base - 0upx;
		color: #ff0000;
		margin-right: 10upx;
	}
	.cell-tip {
		font-size: $font-base;
		color: $font-color-light;
	}
	switch {
		transform: translateX(16upx) scale(0.84);
	}
}
</style>
