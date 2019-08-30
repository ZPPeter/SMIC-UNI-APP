<template>
    <view class="content">

		<view style="padding-top: 5px;">			
			<view style="display: flex; width:90%;text-align: left; margin-left: 6px;align-items: center;">
				<div style="background-color: red;width:4px;height:18px;vertical-align: bottom;"></div>
				<view style="font-size: 18px;margin-left: 2px;">信息如下：</view>
			</view>
		</view>
				<view class="uni-common-mt">			
			<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in lists" :key="index">
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">{{item.userName}}</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="item.emailAddress"></input>
					</view>
				</view>		
				</view>
				</view>
			</view>
        <view class="btn-row">
            <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
        </view>		
    </view>
</template>

<script>
	import request from '@/libs/ajax/request.js';
	import utils from '@/libs/common/utils.js';
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
	data() {
		return {
			lists: []			
		};
	},		
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
			...mapMutations(['login']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        },
		onLoad: function() {
			if(uni.getStorageSync('userName') != null  && uni.getStorageSync('token') !=null ){
				this.login(uni.getStorageSync('userName'));
			}
			request.GetUsers().then(res => {
				if(!utils.isNullOrEmpty(res)) //&&res.items!=undefined
					this.lists = res.items;
			})
		},
    }
</script>

<style>

</style>
