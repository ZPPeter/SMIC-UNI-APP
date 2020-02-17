import moment from 'moment';

// 时间戳转时分秒
function getformatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours() - 8,
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
};

// 左侧补齐 0
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

// 时间过滤
export function formatDateFilter(time) {
  return getformatDate(new Date(time), "yyyy-MM-dd HH:mm:ss");
}

export function formatDateFilter2(time) {	
	return moment(time).format('YYYY.MM.DD HH:mm:ss');       
}

// 空值过滤
export function formatTextFilter(obj) {
  if (typeof(obj) == "undefined" || obj == null || obj == "null") {
          return "";
  }
  else
  return obj;
}

// 使用
// <text class="title">{{ testDate | formatDateFilter}}</text>	