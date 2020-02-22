//模块化，让代码解耦
const files = require.context('.', false, /\.js$/)
const modules = []
files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  console.log(item);
  modules.push(item)
})
export default modules

/*
使用:
import Modules from './modulestest';
console.log(JSON.stringify(Modules));

//初始化
const router = new Router({
    routes: [...Modules] //路由表
});

适合常量数组
const notice1 = [{hello:'Hello world 2020'}];
const notice2 = [{hello:'Hello world 2020'}];
const store = [notice1,notice2]
export default store

不适合函数
const addUser = function (userInfo) {
    console.log('I come from a function');
}
export default addUser;  // non-iterable instance

原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
*/