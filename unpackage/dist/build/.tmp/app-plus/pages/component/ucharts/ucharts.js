(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/component/ucharts/ucharts"],{"01fa":function(t,e,a){"use strict";a.r(e);var n=a("5e4e"),i=a("333f");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("db78"),a("0a6a");var u=a("2877"),r=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"0a6a":function(t,e,a){"use strict";var n=a("8fbf"),i=a.n(n);i.a},"333f":function(t,e,a){"use strict";a.r(e);var n=a("e693"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a},"5e4e":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"8fbf":function(t,e,a){},db78:function(t,e,a){"use strict";var n=a("db9a"),i=a.n(n);i.a},db9a:function(t,e,a){},e693:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,i=o(a("3d7e"));function o(t){return t&&t.__esModule?t:{default:t}}var u={name:"ucharts",data:function(){return{cWidth:"",cHeight:"",pixelRatio:1}},created:function(){n=this,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500),this.getServerData()},methods:{getServerData:function(){t.request({url:"https://www.ucharts.cn/data.json",data:{},success:function(t){var e={categories:[],series:[]};e.categories=t.data.data.ColumnB.categories,e.series=t.data.data.ColumnB.series,n.showColumn("canvasColumn",e)},fail:function(){n.tips="网络错误"}})},showColumn:function(t,e){new i.default({$this:n,canvasId:t,type:"column",padding:[15,5,0,15],legend:{show:!0,padding:5,lineHeight:11,margin:0},fontSize:11,background:"#FFFFFF",pixelRatio:n.pixelRatio,animation:!0,categories:e.categories,series:e.series,xAxis:{disableGrid:!0},yAxis:{data:[{position:"right",axisLine:!1,format:function(t){return t.toFixed(0)+"元"}}]},dataLabel:!0,width:n.cWidth*n.pixelRatio,height:n.cHeight*n.pixelRatio,extra:{column:{type:"group",width:n.cWidth*n.pixelRatio*.45/e.categories.length}}})}}};e.default=u}).call(this,a("6e42")["default"])}},[["d475","common/runtime","common/vendor"]]]);