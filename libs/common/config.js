const apiDomain     = 'http://192.168.1.148:21021';
const avatarImgPath = apiDomain + '/images/logo_'; //.png
const Authenticate  = '/api/TokenAuth/Authenticate';
const GetUsers      = '/api/services/app/User/GetAll';
const ChangePwd     = '/api/services/app/User/ChangePassword';
const uploadAvatar  = '/api/services/app/UploadAvatar/UploadFile';
//const GetUserById = '/api/services/app/User/Get?Id=';
// ...  

export default{
	apiDomain,
    Authenticate,
	GetUsers,
	avatarImgPath,
	ChangePwd,
	uploadAvatar
}