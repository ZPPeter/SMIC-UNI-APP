(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sjcl/1000/1000_hy"],{"0287":function(t,e,n){},"189f":function(t,e,n){"use strict";n.r(e);var a=n("d820"),s=n("e1f2");for(var c in s)"default"!==c&&function(t){n.d(e,t,function(){return s[t]})}(c);n("6648");var r,i=n("f0c5"),u=Object(i["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=u.exports},6648:function(t,e,n){"use strict";var a=n("0287"),s=n.n(a);s.a},"858d":function(t,e,n){"use strict";(function(t){n("d2ee"),n("921b");a(n("66fd"));var e=a(n("189f"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},bb3c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,s=o(n("a34a")),c=n("2f62"),r=o(n("99d4")),i=o(n("723b")),u=o(n("334d"));function o(t){return t&&t.__esModule?t:{default:t}}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e,n,a,s,c,r){try{var i=t[c](r),u=i.value}catch(o){return void n(o)}i.done?e(u):Promise.resolve(u).then(a,s)}function h(t){return function(){var e=this,n=arguments;return new Promise(function(a,s){var c=t.apply(e,n);function r(t){f(c,a,s,r,i,"next",t)}function i(t){f(c,a,s,r,i,"throw",t)}r(void 0)})}}var l=(a={computed:(0,c.mapState)(["userInfo"]),data:function(){return{dsz:"-",o:new i.default,res:""}}},d(a,"computed",(0,c.mapState)(["hasLogin","userInfo"])),d(a,"onNavigationBarButtonTap",function(e){var n=e.index;0===n&&t.switchTab({url:"/pages/main/main"})}),d(a,"onLoad",function(){var t=h(s.default.mark(function t(e){var n;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.parse(e.o),this.o.id=n.id,this.o.ccbh=n.ccbh,this.o.djrq=n.djrq,this.o.dwmc=n.dwmc,this.o.qjmc=n.qjmc,this.o.qjmcbm=n.qjmcbm,this.o.xhggbm=n.xhggbm,this.o.xhggmc=n.xhggmc,this.o.zzc=n.zzcnr,this.o.jdzt=n.jdzt,this.o.surname=n.surname,this.o.jbcs.bcjda="",this.o.jbcs.bcjdb="",this.o.jbcs.cjjd="",this.o.jbcs.axles="",this.o.jbcs.bcfw="",t.next=19,this.getJbcs();case 19:this.showRawData();case 20:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()),d(a,"onShow",function(t){var e=getCurrentPages(),n=e[e.length-1];n.data&&(n.data.ccbh?this.o.ccbh=n.data.ccbh:n.data.data&&(this.o.jbcs=n.data.data,"1"==this.o.jbcs.axles?this.dsz="单轴补偿":this.dsz="双轴补偿"))}),d(a,"methods",{Hywb:function(){var e=this;t.showModal({title:"提示",content:"确认该仪器核验通过？",success:function(t){t.confirm?e.SetHywb():t.cancel}})},SetHywb:function(){var e=h(s.default.mark(function e(){var n,a;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch({type:"sjcl/SetHYWB",data:this.o.id});case 2:n=e.sent,1==n&&(a={messageType:2,sendUserId:r.default.state.userInfo.realname+" [App]",messageBody:"latestData.Data"},this.$signalR.sendMessage(JSON.stringify(a)),t.reLaunch({url:"/pages/check/check"}));case 4:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),showRawData:function(){var t=h(s.default.mark(function t(){var e;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch({type:"sjcl/ShowZshData",data:this.o.id});case 2:e=t.sent,e&&(this.res=JSON.parse(e));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getJbcs:function(){var t=h(s.default.mark(function t(){var e,n;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch({type:"sjmx/GetQzyJbcs",data:this.o.xhggbm});case 2:e=t.sent,e&&(n=new u.default,n.bcjda=e.bcjda,n.bcjdb=e.bcjdb,n.cjjd=e.cjjd,n.axles=e.axles,n.bcfw=e.bcfw,this.o.jbcs=n,"1"==this.o.jbcs.axles?this.dsz="单轴补偿":this.dsz="双轴补偿");case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),format:function(t){return this.$moment(t).format("YYYY.MM.DD HH:mm:ss")},getImg:function(t){var e="0";return~t.indexOf("徕卡")?e="1":~t.indexOf("拓普康")?e="2":~t.indexOf("天宝")?e="3":~t.indexOf("索佳")?e="4":~t.indexOf("南方")?e="5":~t.indexOf("尼康")&&(e="6"),"/static/ins/1000/"+e+".png"}}),a);e.default=l}).call(this,n("6e42")["default"])},d820:function(t,e,n){"use strict";var a,s=function(){var t=this,e=t.$createElement,n=(t._self._c,t.getImg(t.o.zzc));t.$mp.data=Object.assign({},{$root:{m0:n}})},c=[];n.d(e,"b",function(){return s}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return a})},e1f2:function(t,e,n){"use strict";n.r(e);var a=n("bb3c"),s=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=s.a}},[["858d","common/runtime","common/vendor"]]]);