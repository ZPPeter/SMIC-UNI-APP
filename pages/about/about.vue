<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="/static/img/uni_app.png" @longpress="save"></image>
				<text class="tip">扫码体验uni-app</text>
			</view>
			<view class="desc">
				<text class="code">smic-app</text>
				是使用
				<text class="code">uni-app</text>
				前端跨平台应用框架技术开发的测绘仪器智慧检定系统软件平台，服务端采用了
				<text class="code">C#</text>
				语言和
				<text class="code">ABP</text>
				框架进行开发。
			</view>
			<view class="source">
				<view class="title">uni-app源码获取方式：</view>
				<view class="source-list">
					<view class="source-cell">
						<text space="nbsp"></text>
						<u-link class="link" :href="'https://github.com/dcloudio/hello-uniapp'" :text="'https://github.com/dcloudio/hello-uniapp'"></u-link>
					</view>
				</view>				
				<view class="title p">ABP源码获取方式：</view>
				<view class="source-list">
					<view class="source-cell">
						<text space="nbsp"></text>
						<u-link class="link" :href="'https://github.com/aspnetboilerplate'" :text="'https://github.com/aspnetboilerplate'"></u-link>
					</view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<button type="primary" @click="share">分享</button>
			<!-- #endif -->
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="version">当前版本：{{ version }}</view>
		<!-- #endif -->
	</view>
</template>
<script>
import uLink from '@/components/uLink.vue';
export default {
	components: {
		uLink
	},
	data() {
		return {
			providerList: [],
			version: ''
		};
	},
	onShow() {
		/* 隐藏凸起图标 */
		/*
		if (uni.getSystemInfoSync().platform === 'android') {			
			var icon = plus.nativeObj.View.getViewById('icon');
			if (icon) {
				setTimeout(function() {					
					icon.hide();
				}, 100);
			}			
		}*/
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.version = plus.runtime.version;
		uni.getProvider({
			service: 'share',
			success: result => {
				const data = [];
				for (let i = 0; i < result.provider.length; i++) {
					switch (result.provider[i]) {
						case 'weixin':
							data.push({
								name: '分享到微信好友',
								id: 'weixin'
							});
							data.push({
								name: '分享到微信朋友圈',
								id: 'weixin',
								type: 'WXSenceTimeline'
							});
							break;
						case 'qq':
							data.push({
								name: '分享到QQ',
								id: 'qq'
							});
							break;
						default:
							break;
					}
				}
				this.providerList = data;
			},
			fail: error => {
				console.log('获取分享通道失败' + JSON.stringify(error));
			}
		});
		// #endif
	},
	methods: {
		// #ifdef APP-PLUS
		save() {
			uni.showActionSheet({
				itemList: ['保存图片到相册'],
				success: () => {
					plus.gallery.save(
						'/static/img/uni_app.png',
						function(res) {
							//console.log(JSON.stringify(res));
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						},
						function() {
							uni.showToast({
								title: '保存失败，请重试！',
								icon: 'none'
							});
						}
					);
				}
			});
		},
		share(e) {
			if (this.providerList.length === 0) {
				uni.showModal({
					title: '当前环境无分享渠道!',
					showCancel: false
				});
				return;
			}
			let itemList = this.providerList.map(function(value) {
				return value.name;
			});
			uni.showActionSheet({
				itemList: itemList,
				success: res => {
					let provider = this.providerList[res.tapIndex].id;
					uni.share({
						provider: provider,
						scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession',
						type: provider === 'qq' ? 1 : 0,
						title: '欢迎体验 uni-app',
						summary: 'uni-app 是一个使用 Vue.js 开发的跨平台应用的前端框架，简单高效前途广阔。',
						imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/nav_menu/8.jpg',
						href: 'https://m3w.cn/uniapp',
						success: res => {
							console.log('success:' + JSON.stringify(res));
						},
						fail: e => {
							uni.showModal({
								content: e.errMsg,
								showCancel: false
							});
						}
					});
				}
			});
		}
		// #endif
	}
};
</script>

<style>
page,
view {
	display: flex;
	font-size: 25upx;
	color: #303133;	
}

page {
	min-height: 100%;
	background-color: #ffffff;
}
image {
	width: 360upx;
	height: 360upx;
}

.about {
	flex-direction: column;
	flex: 1;
}

.content {
	flex: 1;
	padding: 30upx;
	flex-direction: column;	
}

.qrcode {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 45upx;
}

.qrcode .tip {
	margin-top: 20upx;
}

.desc {
	margin-top: 30upx;
	display: block;
}
.p{
	margin-top: 21upx;
}
.code {
	color: #e96900;
	background-color: #f8f8f8;
}

button {
	width: 100%;
	margin-top: 40upx;
}

.version {
	height: 80upx;
	line-height: 80upx;
	justify-content: center;
	color: #ccc;
}

.source {
	margin-top: 30upx;
	flex-direction: column;
}

.source-list {
	flex-direction: column;
}

.link {
	color: #007aff;
}
</style>
