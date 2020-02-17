<template>
	<view>
		<form @submit="formSubmit">
			<view class="uni-title uni-common-mt uni-common-pl">测距标准差Amm±Bppm：</view>
			<view class="list">
				<view class="list-call">
					A：
					<input class="biaoti" v-model="bcjda" name="bcjda" type="text" maxlength="3" placeholder="测距标准差A" />
				</view>
				<view class="list-call">
					B：
					<input class="biaoti" v-model="bcjdb" name="bcjdb" type="text" maxlength="3" placeholder="测距标准差B" />
				</view>
			</view>
			<view class="uni-title uni-common-mt uni-common-pl">测角精度：</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view><radio style="transform:scale(0.7)" :value="item.value" :checked="index === current" /></view>
						<view style="margin-left: 8upx;">{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
			<view class="uni-title uni-common-mt uni-common-pl">补偿方式：</view>
			<view class="uni-list">
				<radio-group @change="radioChange1">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items1" :key="item.value">
						<view><radio style="transform:scale(0.7)" :value="item.value" :checked="index === current1" /></view>
						<view style="margin-left: 8upx;">{{ item.name }}</view>
					</label>
				</radio-group>
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
			isNew: false,
			bcjda: '',
			bcjdb: '',
			items: [
				{
					value: '1',
					name: '1″ 【2″之内】'
				},
				{
					value: '2',
					name: '2″',
					checked: 'true'
				},
				{
					value: '5',
					name: '5″ 【2″以上】'
				}
			],
			cjjd: 1,
			items1: [
				{
					value: '1',
					name: '单轴补偿'
				},
				{
					value: '2',
					name: '双轴补偿',
					checked: 'true'
				}
			],
			axles: 1,
			current:1,
			current1:1
		};
	},
	onBackPress(options) {
		plus.key.hideSoftKeybord(); //强制隐藏
	},
	onLoad(option) {
		var o = JSON.parse(option.o);
		this.id = o.id;
		//console.log(o.jbcs);
		if (o.jbcs) {
			this.bcjda = o.jbcs.bcjda;
			this.bcjdb = o.jbcs.bcjdb;
			this.cjjd = o.jbcs.cjjd;
			this.axles = o.jbcs.axles;
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value == this.cjjd) {
					this.current = i;
					break;
				}
			}
			for (let i = 0; i < this.items1.length; i++) {
				if (this.items1[i].value == this.axles) {
					this.current1 = i;
					break;
				}
			}
		} else this.isNew = true;
	},
	methods: {
		radioChange(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.cjjd = this.items[i].value;
					break;
				}
			}
		},
		radioChange1(evt) {
			for (let i = 0; i < this.items1.length; i++) {
				if (this.items1[i].value === evt.target.value) {
					this.axles = this.items[i].value;
					break;
				}
			}
		},
		async formSubmit(e) {
			//判断：非空等
			var rule = [
				{ name: 'bcjda', checkType: 'reg', checkRule: '^[0-9]+([.]{1}[0-9]+){0,1}$', errorMsg: 'A请输入正确数字' },
				{ name: 'bcjdb', checkType: 'reg', checkRule: '^[0-9]+([.]{1}[0-9]+){0,1}$', errorMsg: 'B请输入正确数字' }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				const data = {
					id: this.id,
					bcjda: this.bcjda,
					bcjdb: this.bcjdb,
					cjjd: this.cjjd,
					bcfw: 3,
					axles: this.axles
				};
				var res = 1;
				if (this.isNew) {
					const res = await this.$store.dispatch({
						type: 'sjmx/AddQzyJbcs',
						data: data
					});
				}
				//console.log(data);
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				var prevPage2 = pages[pages.length - 3]; //再上一个页面
				prevPage.setData({ data: data });
				prevPage2.setData({ data: data });
				uni.navigateBack();
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		}
	}
};
</script>

<style lang="scss">
.uni-list-cell {
	justify-content: flex-start;
}
.list {
	display: flex;
	flex-direction: column;
	padding-left: 30upx;
	background-color: #ffffff;
}
.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 90upx;
	color: #333333;
	font-size: 32upx;
	border-bottom: 1upx solid rgba(230, 230, 230, 1);
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
