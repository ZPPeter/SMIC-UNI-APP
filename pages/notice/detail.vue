<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="imgSrc"></image>
			<view class="banner-title">{{ res.title }}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{ res.user }}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{ getDateStr(res.creationTime) }}</text>
		</view>
		<view class="article-content"><rich-text :nodes="res.description"></rich-text></view>
	</view>
</template>

<script>
import dn from '../../libs/dn_utils.js';
export default {
	data() {
		return {
			res: '',
			imgSrc:'/static/notice/1.jpg'
		};
	},
	onLoad(option) {
		this.imgSrc = '/static/notice/'+dn.numberUtils.RandomNum(1,10)+'.jpg';
		//console.log(this.imgSrc);
		var o = JSON.parse(option.o);
		//console.log(o);
		this.res = o;		
		//uni.setNavigationBarTitle({
		//    title: this.res.title
		//});
	},
	methods: {
		getDateStr(o){
			return dn.dateUtils.format(this.$moment(o).format('YYYY-MM-DD HH:mm:ss'));
		}
	}
};
</script>

<style lang="scss">
view {
	font-size: 28upx;
	line-height: 1.8;
}

.banner {
	height: 360upx;
	overflow: hidden;
	position: relative;
	background-color: #ccc;
}

.banner-img {
	width: 100%;
}

.banner-title {
	max-height: 84upx;
	overflow: hidden;
	position: absolute;
	left: 30upx;
	bottom: 30upx;
	width: 90%;
	font-size: 48upx;
	font-weight: 600;
	line-height: 42upx;
	color: #181818;
	z-index: 11;
}

.article-meta {
	padding: 20upx 30upx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	color: gray;
	font-size: 30upx;
	.article-text {		
		line-height: 50upx;
		margin-left: 5upx;
		margin-right: 5upx;
	}
	.article-author,
	.article-time {
		font-size: 26upx;
		font-style: italic;
	}
}

.article-content {
	padding: 0 30upx;
	overflow: hidden;
	font-size: 32upx;
	margin-bottom: 30upx;
}
</style>
