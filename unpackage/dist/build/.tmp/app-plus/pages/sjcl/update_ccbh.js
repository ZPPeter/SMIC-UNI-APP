(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sjcl/update_ccbh"],{"21a5":function(t,e,n){"use strict";n.r(e);var c=n("bf42"),r=n("36b4");for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n("a74b");var u,o=n("f0c5"),i=Object(o["a"])(r["default"],c["b"],c["c"],!1,null,null,null,!1,c["a"],u);e["default"]=i.exports},"36b4":function(t,e,n){"use strict";n.r(e);var c=n("8850"),r=n.n(c);for(var a in c)"default"!==a&&function(t){n.d(e,t,function(){return c[t]})}(a);e["default"]=r.a},8433:function(t,e,n){},8850:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,c,r,a,u){try{var o=t[a](u),i=o.value}catch(s){return void n(s)}o.done?e(i):Promise.resolve(i).then(c,r)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(c,r){var u=t.apply(e,n);function o(t){a(u,c,r,o,i,"next",t)}function i(t){a(u,c,r,o,i,"throw",t)}o(void 0)})}}var o=n("19c6"),i={data:function(){return{id:"",o_ccbh:"",n_ccbh:"",focus:!0}},onBackPress:function(t){plus.key.hideSoftKeybord()},onLoad:function(t){var e=JSON.parse(t.o);this.id=e.id,this.o_ccbh=e.ccbh},methods:{doCopy:function(){this.n_ccbh=this.o_ccbh},formSubmit:function(){var e=u(c.default.mark(function e(n){var r,a,u,i,s,f,h,l;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(r=[{name:"n_ccbh",checkType:"notnull",checkRule:"",errorMsg:"请输入新编号，空用斜杠代替"},{name:"n_ccbh",checkType:"notsame",checkRule:this.o_ccbh,errorMsg:"编号没有修改"}],a=n.detail.value,u=o.check(a,r),!u){e.next=11;break}return i={id:this.id,ccbh:this.n_ccbh},e.next=7,this.$store.dispatch({type:"sjmx/UpdateCcbh",data:i});case 7:s=e.sent,s&&(f=getCurrentPages(),f[f.length-1],h=f[f.length-2],l=f[f.length-3],h.setData({ccbh:this.n_ccbh}),l.setData({ccbh:this.n_ccbh}),t.navigateBack()),e.next=12;break;case 11:t.showToast({title:o.error,icon:"none"});case 12:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}()}};e.default=i}).call(this,n("6e42")["default"])},a74b:function(t,e,n){"use strict";var c=n("8433"),r=n.n(c);r.a},bf42:function(t,e,n){"use strict";var c,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return c})},e788:function(t,e,n){"use strict";(function(t){n("d2ee"),n("921b");c(n("66fd"));var e=c(n("21a5"));function c(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["e788","common/runtime","common/vendor"]]]);