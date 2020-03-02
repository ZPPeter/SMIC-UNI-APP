// 首页消息通知和最近送检

import store from '@/store';
const Show = (function() {
	return {
		showData: async function() { // 首页数字刷新

			// 数据刷新			
			//setTimeout(async () => {
			// notice - 首页第一条和未读消息
			const res = await store.dispatch({
				type: 'app/GetHomeInfos'
			});
			//console.log(JSON.stringify(res));
			if (res != '') {
				store.state.isConnected = true;
				store.state.latestData.List.length = 0;
				store.state.latestData.List.push(' 已经连接到服务器.');
				// 0 -> 欢迎使用本系统			
				//console.log(res);
				//[{"title":"欢迎使用本系统","description":"在使用过程中如有什么问题，请联系管理员，谢谢!","creationTime":"2019-10-12T10:04:03","id":1}]
				let firstTime = uni.getStorageSync('firstTime');
				//console.log(firstTime);				
				let firstReadTime = new Date(res[0].creationTime).Format('yyyy-MM-dd');
				//console.log(firstReadTime);
				if(firstReadTime>firstTime || !firstTime )
				store.state.latestData.HomeInfo = res[0].description.replace('<br>', '');
				//plus.nativeUI.toast(res[0].description.replace('<br>', ''));//第一条消息
				uni.setStorage({
					key: 'firstTime',
					data: new Date().Format('yyyy-MM-dd')
				})				
				if (res.length > 1) { //有新消息
					store.state.user.newNotices = res.length - 1;
					uni.showTabBarRedDot({
						index: 4
					});
				}
				//for (var i = 1; i < res.length; i++) {
				//	store.state.latestData.List.push(' ' + res[i].description.replace('<br>', ''));
				//}
			}
			//}, 5000);

			// dashboard 统计 - start
			const res1 = await store.dispatch({
				type: 'sjmx/GetDashboardDatas'
			});
			//console.log(JSON.stringify(res1));
			if (res1 != '') {
				//console.log(res1[0]);
				store.state.latestData.Data = res1;
				store.state.latestData.stats = Math.round((res1[5] / res1[6]) * 1000) / 10; //近两年月工作量统计%
				/*
				if (Number(res1[1] + res1[2]) > 0) { // 检定
					uni.setTabBarBadge({
						index: 1,
						text: (Number(res1[1]) + Number(res1[2])).toString()
					});
				}*/
				if (res1[7] > 0) { // 我的待检
					uni.setTabBarBadge({
						index: 1,
						text: res1[7].toString()
					});
				} else {
					uni.hideTabBarRedDot({
						index: 1
					});
				}

				if (res1[8] > 0) { // 我的核验
					uni.setTabBarBadge({
						index: 2,
						text: res1[8].toString()
					});
				} else {
					uni.hideTabBarRedDot({
						index: 2
					});
				}

				if (res1[4] > 0 && store.state.userInfo.roles.includes('批准')) { // 批准
					uni.setTabBarBadge({
						index: 3,
						text: res1[4].toString()
					});
				} else {
					uni.hideTabBarRedDot({
						index: 3
					});
				}
			}
			// dashboard 统计 - end

			const res2 = await store.dispatch({
				type: 'sjmx/GetLastSjmxDatas'
			});
			//console.log(JSON.stringify(res2));
			//setTimeout(async () => {
			if (res2 != '') {
				let desc = '';
				store.state.latestData.List.length = 0;
				//console.log(res2);
				for (let i in res2) { //用for in遍历数组
					desc = "[" + res2[i].送检日期 + "]" + res2[i].送检单位 + " " + res2[i].仪器件数 + " 台。"
					store.state.latestData.List.push(desc);
					//console.log(store.state.latestData.List);
					if (i == res2.length - 1) break; // for in 不可少
				}
			}
			//}, 5000);
		}
	}
});
module.exports = {
	ShowHomeData: Show
}
