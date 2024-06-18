import jwt_decode from "jwt-decode";
// import 'jwt-decode';
// 临时用saveSession表示用户登录后存储用户登录状态
function saveSession(key, str){
	sessionStorage.setItem(key, str);
}
// 临时用getSession表示获取前端session中的用户登录状态
function getSession(key){
	return sessionStorage.getItem(key)
}
// 将json转化为函数对象，从令牌中解析出手机对象
function parseToken(){
	let mobile=null;
	
	let token=getSession('token');
    if(token){
		// 把令牌从字符串形式解析成对象形式
		let decoded=jwt_decode(token);
		console.log(decoded); // 输出令牌中的数据，例如用户ID、用户角色等
		// 取出对象中mobileJson的属性值，该属性值为mobile对象的json字符串
		mobile=JSON.parse(decoded.mobileJson); 

	
	}
	return mobile; 
}

function removeSession(key){
	sessionStorage.removeItem(key);
}

function dealError(error,router){
	let response=error.response;
	if(response){
		let responBean=response.data;
	    router.push({
			path:'/failure',
	        query:{
	            msg:responBean.msg
	        }
	    })
	}
}
	
export default {saveSession, getSession, parseToken, removeSession, dealError};
	
