import moment from 'moment';

// 左侧补齐 0
function padLeftZero(str) {
	return ('00' + str).substr(str.length);
};

// 时间过滤
export function formatDateFilter(time) {
	return moment(time).format('YYYY.MM.DD HH:mm:ss');
}

// 空值过滤
export function formatTextNullFilter(obj) {
	if (typeof(obj) == "undefined" || obj == null || obj == "null") {
		return "";
	} else
		return obj;
}

// 截断字符串
export function formatZzcTextLength(obj) {
	if (!obj) return '';
	else if (obj.length < 13)
		return obj;
	else
		return obj.substring(0, 12) + '...';
}

// 使用
// <text class="title">{{ testDate | formatDateFilter}}</text>
