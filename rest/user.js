var EventProxy = require('eventproxy');
var data2xml = require('data2xml');
var config = require('../config');
var UserDao = require('../service').UserDao;

/*登入表单*/
exports.restLogin = function(req, res,next){
	
	var result = {
		type:"error",
		content:'这是结果字符串！'
	};

	if (!config.rss) {
	    res.statusCode = 404;
	    result.content = 'Please set `rss` in config.js';
	}

	if(req.body['password'] ==='' || req.body['email'] === ''){
		result.content = '输入不能为空！';
	}

	UserDao.getUserByEmail(req.body['email'],function(err,user){
		
		if(err){
			result.content = 'result','数据库查询失败！';
		}

		if(user){
			if(user.password == req.body['password']){
				//登陆成功
				result.type = 'success';
				result.content = '登陆成功';		
			}else{
				//密码输入错误
				result.content = '密码输入错误';
			}

		}else{
			result.content = '该用户不存在';
		}

		// var rest_content = data2xml('rss', result);
	    // res.contentType('application/xml');
	    res.send(result);
	});

};