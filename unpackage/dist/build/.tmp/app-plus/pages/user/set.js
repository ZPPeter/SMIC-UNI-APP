(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/set"],{"015c":function(e,t,n){"use strict";var o=n("4b78"),a=n.n(o);a.a},"3ce3":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,u=s(n("a34a")),r=n("2f62"),i=s(n("7e11")),c=s(n("3d6d"));function s(e){return e&&e.__esModule?e:{default:e}}function f(e,t,n,o,a,u,r){try{var i=e[u](r),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(o,a)}function l(e){return function(){var t=this,n=arguments;return new Promise(function(o,a){var u=e.apply(t,n);function r(e){f(u,o,a,r,i,"next",e)}function i(e){f(u,o,a,r,i,"throw",e)}r(void 0)})}}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){p(e,t,n[t])})}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h={data:function(){return{version:"1.01",useMockData:!1}},onLoad:function(){this.hasLogin||this.$Router.push("/pages/login/login"),"android"===e.getSystemInfoSync().platform&&(this.version=plus.runtime.version),this.useMockData=i.default.Settings.useMockData()},computed:d({},(0,r.mapState)(["hasLogin","userInfo"])),methods:d({},(0,r.mapMutations)(["logout"]),{navTo:function(e){e&&this.$Router.push(e)},toLogout:function(){var t=this;e.showModal({title:"系统提示",content:"确定要退出登录吗？",success:function(n){n.confirm&&(t.logout(),setTimeout(function(){e.switchTab({url:"/pages/main/main"})},200))}})},switchChange:function(e){var t=e.detail.value?"打开":"关闭";c.default.showToast("".concat(t,"消息推送"))},switchChangeMk:function(t){e.setStorage({key:"useMkData",data:t.detail.value})},clearStorage:function(){var t=this;e.removeStorage({key:"useMkData",success:function(){t.useMockData=!1}}),e.removeStorage({key:"ChartsData"})},uploadFile:function(t){a=this;var n="",o=e.uploadFile({url:i.default.uploadAvatar,filePath:t,name:"file",header:{Authorization:"Bearer "+e.getStorageSync("token")},formData:{},success:function(o){e.saveFile({tempFilePath:t,success:function(e){n=e.savedFilePath,a.userInfo.portrait=n}})},fail:function(t){e.showToast({icon:"none",title:t}),reject(t)}});o.onProgressUpdate(function(e){})},compressImage:function(e,t){a=this;var n="_doc/logo/"+t;plus.zip.compressImage({src:e,dst:n,width:"270px",quality:20,overwrite:!0},function(){var e=l(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a.uploadFile(t.target);case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),function(e){console.log(o("Compress error!"+e.message," at pages\\user\\set.vue:189"))})},upload:function(){a=this,e.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(){var e=l(u.default.mark(function e(t){var n;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.tempFilePaths[0],t.tempFiles[0].size/1e3>20?a.compressImage(n,"logo.png"):a.uploadFile(n);case 2:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),fail:function(t){e.showToast({icon:"none",title:t}),reject(t)}})}}),onShow:function(){this.hasLogin||this.$Router.push("/pages/login/login"),e.hideKeyboard()}};t.default=h}).call(this,n("6e42")["default"],n("0de9")["default"])},"4b78":function(e,t,n){},"584d":function(e,t,n){"use strict";(function(e){n("d2ee"),n("921b");o(n("66fd"));var t=o(n("9e3d"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},9383:function(e,t,n){"use strict";n.r(t);var o=n("3ce3"),a=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=a.a},"9e3d":function(e,t,n){"use strict";n.r(t);var o=n("c1f5"),a=n("9383");for(var u in a)"default"!==u&&function(e){n.d(t,e,function(){return a[e]})}(u);n("015c");var r,i=n("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=c.exports},c1f5:function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return o})}},[["584d","common/runtime","common/vendor"]]]);