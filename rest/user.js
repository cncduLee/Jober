var EventProxy = require('eventproxy');
var data2xml = require('data2xml');
var config = require('../config');
var UserDao = require('../service').UserDao;

/*登入表单*/
exports.restLogin = function(req, res,next){
	
	var result = {
		type:"error",
		content:'这是结果字符串！',
		id:"",
		name:"",
		pwd:"",
		email:""
	};

	var email = req.query['email'];//trim(req.body['email']);
	var password = req.query['password'];//trim(req.body['password']);

	console.log(password + '=====' + email);

	if(email==null || password==null || email =='' ||  password == ''){
		result.content = '输入不能为空！';
		return res.jsonp(result);
	}

	UserDao.getUserByEmail(email,function(err,user){
		
		if(err){
			result.content = '数据库维护中！';
			return res.jsonp(result);
		}

		if(user){
			if(user.password == password){
				//登陆成功
				result.type = 'success';
				result.content = '登陆成功';
				
				result.name = user.name;
				result.pwd = user.password;
				result.email = user.email;
				result.id = user._id;

				//注册到session
				req.session.user = user;

			}else{
				//密码输入错误
				result.content = '密码输入错误';
			}

		}else{
			result.content = '该用户不存在';
		}

		return res.jsonp(result);
	});

};

/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}