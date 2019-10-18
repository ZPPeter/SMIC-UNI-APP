const apiDomain = 'http://192.168.1.148:21021';
const avatarImgPath = apiDomain + '/images/logo_'; //.png
const uploadAvatar = apiDomain + '/api/services/app/UploadAvatar/UploadFile';

const Authenticate = '/api/TokenAuth/Authenticate';
const GetUsers = '/api/services/app/User/GetAll';
const ChangePwd = '/api/services/app/User/ChangePassword';
const GetHomeInfos = '/api/services/app/HomeInfo/GetHomeInfos'; // 第一条和未读消息
const GetNotices = '/api/services/app/HomeInfo/GetPaged';
const GetCurrentLoginInformations = '/api/services/app/Session/GetCurrentLoginInformations';

//const GetUserById = '/api/services/app/User/Get?Id=';
// ...  
/*
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
	apiDomain,
	Authenticate,
	GetUsers,
	avatarImgPath,
	ChangePwd,
	uploadAvatar,
	GetHomeInfos,
	GetNotices,
	Settings,
	GetCurrentLoginInformations
}
