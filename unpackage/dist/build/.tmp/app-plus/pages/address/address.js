(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"4cd2":function(e,a,t){"use strict";t.r(a);var n=t("bd30"),s=t("7789");for(var d in s)"default"!==d&&function(e){t.d(a,e,function(){return s[e]})}(d);t("f1d1");var r=t("2877"),u=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);a["default"]=u.exports},7789:function(e,a,t){"use strict";t.r(a);var n=t("e1c1"),s=t.n(n);for(var d in n)"default"!==d&&function(e){t.d(a,e,function(){return n[e]})}(d);a["default"]=s.a},aa11:function(e,a,t){},bd30:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement;e._self._c},s=[];t.d(a,"a",function(){return n}),t.d(a,"b",function(){return s})},e1c1:function(e,a,t){"use strict";(function(e,t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{source:0,addressList:[{name:"刘晓晓",mobile:"18666666666",addressName:"贵族皇仕牛排(东城店)",address:"北京市东城区",area:"B区",default:!0},{name:"刘大大",mobile:"18667766666",addressName:"龙回1区12号楼",address:"山东省济南市历城区",area:"西单元302",default:!1}]}},onLoad:function(e){this.source=e.source},methods:{checkAddress:function(a){1==this.source&&(this.$api.prePage().addressData=a,e.navigateBack())},addAddress:function(a,t){e.navigateTo({url:"/pages/address/addressManage?type=".concat(a,"&data=").concat(JSON.stringify(t))})},refreshList:function(e,a){this.addressList.unshift(e),console.log(t(e,a," at pages\\address\\address.vue:71"))}}};a.default=n}).call(this,t("6e42")["default"],t("0de9")["default"])},f1d1:function(e,a,t){"use strict";var n=t("aa11"),s=t.n(n);s.a}},[["39a2","common/runtime","common/vendor"]]]);