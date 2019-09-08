<template>
	<view>
		<view style="display: flex; width:90%;text-align: left; margin-left: 6px;align-items: center;">
			<div style="background-color: red;width:4px;height:12px;vertical-align: bottom;"></div>
			<view class="tj-item">送检记录列表：显示0条记录。</view>
		</view>
		
		<uni-card title="标题文字" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="额外信息" note="Tips">
			内容主体，可自定义内容及样式
		</uni-card>				
		
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image v-if="showImg" :src="value.img"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{value.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
					</view>
				</view>
			</view>
		</view>		
		
		<view class="list_items" v-for="items in list_items" :key="items.id">						
							<view class="user-info-box">
								<view>
									<image class="portrait" :src="'/static/ins/0.png'"></image>
								</view>
								<view class="username">
									<view class="mui-clearfix">
										<h4 class="oa-contact-name">{{ items.xhgg }} /{{ items.ccbh }}</h4>
									</view>
									<p class="oa-contact-email mui-h6">送检单位：{{ items.wtdw }}</p>
									<p class="oa-contact-email mui-h6">检定期限：{{ items.yqjcrq }}</p>
									<p class="oa-contact-email mui-h6">检定人员：{{ items.jdy }}</p>
								</view>
							</view>
		</view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
export default {
	components: {
		uniCard
	},
	data() {
		return {
			lstlength: 0,
			showImg: true,
			list: [{
						title: "幸福",
						content: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						title: "木屋",
						content: "想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖。",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						title: "CBD",
						content: "烤炉模式的城，到黄昏，如同打翻的调色盘一般。",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90"
					}
			],			
			list_items: [
				{
					id: 0,
					img:1,
					xhgg:'SET2B',
					ccbh:'10056',
					wtdw:'山东省地质测绘院',
					yqjcrq:'2019-09-21',
					jdy:'王大年'
				},
				{
					id: 1,
					img:0,
					xhgg:'GTS-201N',
					ccbh:'23345',
					wtdw:'青岛市莱西地图测绘院',
					yqjcrq:'2019-09-21',
					jdy:'王大年'
				}				
			]
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		// console.log(index);
		if (index === 0) {
			this.$Router.push('/pages/wtd/wtd');
		} else if (index === 1) {
			
		}
	},	
	methods: {},
	onShow() {
		if (uni.getSystemInfoSync().platform === 'android') {
			var icon = plus.nativeObj.View.getViewById('icon');
			if (icon) {
				setTimeout(function() {
					icon.show();
				}, 100);
			}
		}
	}
};
</script>

<style type="text/css">
.font-seal0 {
	font-size: 12px;
	z-index: 2;
	position: absolute;
	right: -6px;
	top: 20px;
	border: 0px;
	transform: rotate(45deg);
	width: 53px;
	line-height: 20px;
	text-align: center;
	color: white;
	font-weight: bold;
}
.font-seal {
	font-size: 12px;
	z-index: 2;
	position: absolute;
	right: 14px;
	top: 42px;
	border: 1px solid #f73a3c;
	transform: rotate(45deg);
	width: 53px;
	line-height: 20px;
	text-align: center;
	color: #f73a3c;
	font-weight: bold;
}
.triangle-topright {
	position: absolute;
	right: 5px;
	top: 15px;
	width: 0;
	height: 0;
	border-top: 44px solid #fd9d2d;
	border-left: 2rem solid transparent;
}
.triangle-topright.add_wtd {
	border-top: 44px solid #56cf87;
}
.triangle-topright.working_wtd {
	border-top: 44px solid skyblue;
}
.triangle-topright.over_wtd {
	border-top-color: #cccccc;
}
.rectangle2 {
	width: 3px;
	height: 16px;
	margin-top: 7px;
	background-color: #45a6fc;
	margin-right: 5px;
	display: inline;
}
.div-inline {
	display: inline;
}
</style>
<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.user-info-box {
	height: 210upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		font-size: $font-base;
		color: $font-color-dark;
		margin-left: 20upx;
	}
	.list_items{
		margin-top:21upx;
		border: 2px #0A98D5 solid;
	}
}	
</style>