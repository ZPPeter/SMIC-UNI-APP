(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/about/about"],{"0603":function(n,e,t){},"11f5":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return t.e("components/uLink").then(t.bind(null,"4c17"))},o={components:{uLink:i},data:function(){return{providerList:[],version:""}},onShow:function(){},onLoad:function(){var e=this;this.version=plus.runtime.version,n.getProvider({service:"share",success:function(n){for(var t=[],i=0;i<n.provider.length;i++)switch(n.provider[i]){case"weixin":t.push({name:"分享到微信好友",id:"weixin"}),t.push({name:"分享到微信朋友圈",id:"weixin",type:"WXSenceTimeline"});break;case"qq":t.push({name:"分享到QQ",id:"qq"});break;default:break}e.providerList=t},fail:function(n){console.log("获取分享通道失败"+JSON.stringify(n)," at pages\\about\\about.vue:90")}})},methods:{save:function(){n.showActionSheet({itemList:["保存图片到相册"],success:function(){plus.gallery.save("/static/img/uni_app.png",function(e){n.showToast({title:"保存成功",icon:"none"})},function(){n.showToast({title:"保存失败，请重试！",icon:"none"})})}})},share:function(e){var t=this;if(0!==this.providerList.length){var i=this.providerList.map(function(n){return n.name});n.showActionSheet({itemList:i,success:function(e){var i=t.providerList[e.tapIndex].id;n.share({provider:i,scene:t.providerList[e.tapIndex].type&&"WXSenceTimeline"===t.providerList[e.tapIndex].type?"WXSenceTimeline":"WXSceneSession",type:"qq"===i?1:0,title:"欢迎体验 uni-app",summary:"uni-app 是一个使用 Vue.js 开发的跨平台应用的前端框架，简单高效前途广阔。",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uploads/nav_menu/8.jpg",href:"https://m3w.cn/uniapp",success:function(n){console.log("success:"+JSON.stringify(n)," at pages\\about\\about.vue:144")},fail:function(e){n.showModal({content:e.errMsg,showCancel:!1})}})}})}else n.showModal({title:"当前环境无分享渠道!",showCancel:!1})}}};e.default=o}).call(this,t("6e42")["default"])},"22ba":function(n,e,t){"use strict";t.r(e);var i=t("9492"),o=t("b465");for(var s in o)"default"!==s&&function(n){t.d(e,n,function(){return o[n]})}(s);t("7972");var u=t("2877"),a=Object(u["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=a.exports},7972:function(n,e,t){"use strict";var i=t("0603"),o=t.n(i);o.a},9492:function(n,e,t){"use strict";var i=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"a",function(){return i}),t.d(e,"b",function(){return o})},b465:function(n,e,t){"use strict";t.r(e);var i=t("11f5"),o=t.n(i);for(var s in i)"default"!==s&&function(n){t.d(e,n,function(){return i[n]})}(s);e["default"]=o.a}},[["1a7d","common/runtime","common/vendor"]]]);