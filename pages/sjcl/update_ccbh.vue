<template>
	<view>
		<form @submit="formSubmit">
			<view class="list">
				<view class="list-call" @click="doCopy()">当前编号：{{ o_ccbh }}</view>
				<view class="list-call">
					出厂编号：
					<input class="biaoti" v-model="n_ccbh" :focus="focus" name="n_ccbh" type="text" maxlength="18" placeholder="请输入新编号" />
				</view>
			</view>
			<button class="confirm-btn" formType="submit" type="primary">确认</button>
		</form>
	</view>
</template>

<script>
var graceChecker = require('@/libs/common/graceChecker.js');
export default {
	data() {
		return {
			id: '',
			o_ccbh: '',
			n_ccbh: '',
			focus: true
		};
	},
	onBackPress(options) {
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord(); //强制隐藏
		// #endif
		//uni.hideKeyboard(); //无效?
		//return true;
	},
	onLoad(option) {
		var o = JSON.parse(option.o);
		this.id = o.id;
		this.o_ccbh = o.ccbh;
	},
	methods: {
		doCopy(){
			this.n_ccbh = this.o_ccbh;
		},
		async formSubmit(e) {
			//判断：非空等
			var rule = [
				{ name: 'n_ccbh', checkType: "notnull", checkRule: "", errorMsg: "请输入新编号，空用斜杠代替" },
				{ name: 'n_ccbh', checkType: 'notsame', checkRule: this.o_ccbh, errorMsg: '编号没有修改' }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				const data = {
					id: this.id,
					ccbh: this.n_ccbh,
					occbh: this.o_ccbh,
					bzsm: 'App'
				};
				const res = await this.$store.dispatch({
					type: 'sjmx/UpdateCcbh',
					data: data
				});
				//console.log(res);
				if (res) {
					//uni.showToast({ title: '编号修改成功！', icon: 'none',duration: 30000 }); // duration 在此无效？
					var pages = getCurrentPages();
					var currPage = pages[pages.length - 1];   //当前页面
					var prevPage = pages[pages.length - 2];  //上一个页面
					var prevPage2 = pages[pages.length - 3]; //再上一个页面
					prevPage.setData({ccbh:this.n_ccbh});
					prevPage2.setData({ccbh:this.n_ccbh});
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
	font-size: 64upx;
}
.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100upx;
	color: #333333;
	font-size: 32upx;
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
	margin-left: 2upx;
}
.confirm-btn {
	width: 500upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 10px;
	margin-top: 70upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
	&:after {
		border-radius: 100px;
	}
}
</style>
