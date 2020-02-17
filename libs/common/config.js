const isDebugRequest = false; //false 不显示request信息
const isDevelopment = process.env.NODE_ENV === 'development'; //是否发布到正式环境 production
const serverIP = '10.168.1.146:21021';
const apiDomain = 'http://'+serverIP;
const SignalR = 'ws://'+serverIP+'/signalr-myChatHub';

const avatarImgPath = apiDomain + '/images/logo_'; //.png
const uploadAvatar = apiDomain + '/api/services/app/UploadAvatar/UploadFile';

const Authenticate = '/api/TokenAuth/Authenticate';
const GetCurrentLoginInformations = '/api/services/app/Session/GetCurrentLoginInformations';
//const GetCacheUserData = '/api/services/app/SJCLAppServices/GetCacheUserData';// 缓存用户信息
const GetUsers = '/api/services/app/User/GetAll';
const ChangePwd = '/api/services/app/User/ChangePassword';
const AddtoCZRZ = '/api/services/app/CZRZAppServices/AddtoCZRZ';

const GetHomeInfos = '/api/services/app/HomeInfo/GetHomeInfos'; // 第一条和未读消息
const GetNotices = '/api/services/app/HomeInfo/GetPaged';

const GetQzyStatsData = '/api/services/app/StatsAppServices/getStatsDataBy?ID=1000';
const GetHomeDatas = '/api/services/app/StatsAppServices/GetHomeCountData';
const GetDashboardDatas = '/api/services/app/SJCLAppServices/GetHomeCountData';

const GetAllTasks = '/api/services/app/SJCLAppServices/GetPagedTasks';
const ListCzrzs = '/api/services/app/CZRZAppServices/GetPagedCzrzs';
const GetLastSjmxDatas = '/api/services/app/SJMXAppServices/GetLastSJMX';
const ListSjmxs = '/api/services/app/SJMXAppServices/GetPagedSjmxs'; //综合查询
const ListDjmxs = '/api/services/app/SJCLAppServices/GetPagedDjmxs'; //待检在检列表      JDZT<122 100 111
const ListDhymxs = '/api/services/app/SJCLAppServices/GetPagedDhymxs'; //待核验仪器列表  JDZT=122
const ListDpzmxs = '/api/services/app/SJCLAppServices/GetPagedDpzmxs'; //待批准仪器列表  JDZT=200
const UpdateCcbh = '/api/services/app/SJMXAppServices/UpdateCcbh'; //修改出厂编号
const GetQzyJbcs = '/api/services/app/JBCSAppServices/GetJbcs'; //获取全站仪基本参数
const AddQzyJbcs = '/api/services/app/JBCSAppServices/AddJbcs'; //新增全站仪基本参数

const MakeCert = '/api/services/app/CertAppServices/MakeCert'; //MakeCert
const MakeXlsCert = '/api/services/app/CertAppServices/MakeXlsCert'; //MakeXlsCert
const SignerCert = '/api/services/app/CertAppServices/SignerCert'; //MakeXlsCert

const ShowZshData = '/api/services/app/CertAppServices/ShowResults'; //显示检定结果
const SetJDWB = '/api/services/app/CertAppServices/SetJDWB'; //检定完毕
const SetHYWB = '/api/services/app/CertAppServices/SetHYWB'; //核验完毕
const SetPZWB = '/api/services/app/CertAppServices/SetPZWB'; //批准完毕
const SetQBWB = '/api/services/app/CertAppServices/SetQBWB'; //全部批准
const ListWtd   = '/api/services/app/SJMXAppServices/GetSjmxBySjdid'; // sjdid
const ListWtds  = '/api/services/app/WTDAppServices/GetPagedWtds';

const ResetJdzt = '/api/services/app/SJMXAppServices/ResetJdzt';
const getStatsData = '/api/services/app/StatsAppServices/getStatsData';

/** 
 * 任务类型
 */
var TaskType = {    
    Verifiedby: { // 检定
        value: 'Verifiedby',
        name: 'Verifiedby'
    },
    Checkedby: {
        value: 'Checkedby',
        name: 'Checkedby'
    },
    Approvedby: {
        value: 'Approvedby',
        name: 'Approvedby'
    }
}

// 天气类型
var WeatherType = {
	InOut:0, // 室内外 全站仪
	In:1,    // 室内   水准仪
	Out:2    // 室外   GPS
}

/*
M01  1030  GPS接收机
M02  1000  全站仪
M05  1040  手持激光测距仪
M03  1010  经纬仪
M06  1100  电子经纬仪
M04  1020  水准仪
*/
// 模板名称
var TemplateType = {
	MB1030:'M01',
	MB1000:'M02',
	MB1010:'M03',
	MB1020:'M04',
	MB1040:'M05',
	MB1100:'M06',
}

/*
// 离线存储数据表
var smp_tb = {
    repair_tb: 'tb_wtd', //委托单表
    img_tb: 'tb_img_order', //图片表
    signin_tb: 'tb_signin', //签名表
    over_tb: 'tb_over',//完工表
    fault_type_tb: 'tb_faultType', //错误类型
}
const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}
const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const findUserName = function () {
	let ret = '';
	ret = uni.getStorageSync('userData');
	if (!ret) {
	    ret = '[]';
	}
	console.log(JSON.stringify(ret));
	return JSON.parse(ret);
}
*/

const Settings = {
	useMockData() {
		let isUseMockData = false;
		uni.getStorage({
			key: 'useMkData',
			success: res => {
				//console.log(res.data);
				isUseMockData = res.data;
			}
		});
		return isUseMockData;
	}
}

export default {
	//smp_tb,
	//TaskType,
	TemplateType,
	WeatherType,
	isDebugRequest,
	isDevelopment,
	apiDomain,
	Authenticate,
	GetUsers,
	GetQzyStatsData,
	avatarImgPath,
	ChangePwd,
	uploadAvatar,
	GetHomeInfos,
	GetNotices,
	Settings,
	GetCurrentLoginInformations,
	//GetCacheUserData,
	SignalR,
	GetHomeDatas,
	GetLastSjmxDatas,
	ListSjmxs,
	ListDjmxs,
	ListDhymxs,
	ListDpzmxs,
	GetDashboardDatas,
	UpdateCcbh,
	GetQzyJbcs,
	AddQzyJbcs,
	MakeCert,
	MakeXlsCert,
	SignerCert,
	ShowZshData,
	SetJDWB,
	SetHYWB,
	SetPZWB,
	SetQBWB,
	ListWtds,
	ListWtd,
	ResetJdzt,
	ListCzrzs,
	getStatsData,
	GetAllTasks,
	AddtoCZRZ
}