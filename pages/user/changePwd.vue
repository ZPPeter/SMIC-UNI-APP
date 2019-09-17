<template>
	<view>
		<form @submit="formSubmit">
			<view class="list">
				<view class="list-call">
					<image class="img" src="/static/img/2.png"></image>
					原密码：
					<input class="biaoti" v-model="opassword" name="opassword" type="text" maxlength="12" placeholder="请输入原密码" :password="!showPassword" />
				</view>
				<view class="list-call">
					<image class="img" src="/static/img/2.png"></image>
					新密码：
					<input class="biaoti" v-model="password1" name="password1" type="text" maxlength="12" placeholder="请输入新密码" :password="!showPassword" />
					<image class="img" :src="showPassword ? '/static/img/op.png' : '/static/img/cl.png'" @tap="display"></image>
				</view>
				<view class="list-call">
					<image class="img" src="/static/img/2.png"></image>
					密码确认：
					<input class="biaoti" v-model="password2" name="password2" type="text" maxlength="12" placeholder="确认新密码" :password="!showPassword" />
				</view>
			</view>
			<button class="confirm-btn" formType="submit" type="primary">确认</button>
			<view style="padding-top: 30upx;"><uni-notice-bar style="padding-left: 70upx;" show-icon="true" text="注意：App密码和PC客户端密码一致。"></uni-notice-bar></view>
		</form>
	</view>
</template>

<script>
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
var graceChecker = require('@/libs/common/graceChecker.js');
export default {
	components: {
		uniNoticeBar
	},
	data() {
		return {
			opassword: '',
			password1: '',
			password2: '',
			showPassword: false
		};
	},
	methods: {
		display() {
			this.showPassword = !this.showPassword;
		},
		async formSubmit(e) {
			//async formSubmit: function (e) {
			var rule = [
				{ name: 'opassword', checkType: 'string', checkRule: '6,12', errorMsg: '密码应为6-12个字符' },
				{ name: 'password1', checkType: 'string', checkRule: '6,12', errorMsg: '密码应为6-12个字符' },
				{ name: 'password2', checkType: 'same', checkRule: this.password1, errorMsg: '两次输入新密码不一致' }
			];
			//进行表单检查
			var formData = e.detail.value;
			//console.log( formData )
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				const data = {
					CurrentPassword: this.opassword,
					newPassword: this.password1
				};
				const res = await this.$store.dispatch({
					type: 'user/changePassword',
					data: data
				});
				//console.log(res);
				if (res) {
					uni.showToast({ title: '密码修改成功！', icon: 'none' });
					uni.navigateBack();
				}
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		}
	}
};
</script>

<style lang="scss">
.tj-item {
	color: #75787d;
	font-size: $font-sm + 2upx;
	margin-left: 4px;
}
.list {
	display: flex;
	flex-direction: column;
	padding-top: 20upx;
	padding-left: 70upx;
	padding-right: 70upx;
}
.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100upx;
	color: #333333;
	border-bottom: 1upx solid rgba(230, 230, 230, 1);
}
.list-call .img {
	width: 40upx;
	height: 40upx;
}
.list-call .biaoti {
	flex: 1;
	text-align: left;
	font-size: 32upx;
	line-height: 100upx;
	margin-left: 16upx;
}
.confirm-btn {
	width: 380upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 70upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
	&:after {
		border-radius: 100px;
	}
}
</style>
