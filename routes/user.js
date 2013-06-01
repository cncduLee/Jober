var EventProxy = require('eventproxy');

var UserDao = require('../service').UserDao;
var JobDao = require('../service').JobDao;
var RelationDao = require('../service').RelationDao;
var Util = require('../service/util');

exports.users = function(req, res , next){
	
	
	var proxy = new EventProxy();
    proxy.fail(next);

	UserDao.getUsersByQuery({},{limit:10},function(err,users){

		for(var a = 0 ; a < users.length ; a++){
			
			UserDao.getUserById(users[a]._id,function(err,user){
				
				user.friend_create_at = Util.format_date(user.create_at, true);
				proxy.emit('users',user);
			});
		}

		proxy.after('users', users.length, function (list) {
			//===成功！
			res.render('user/list', { 
				title: '用户列表——乐享',
				layout:'default',
				users: list
			});	  			  
		});

	});
};
/*用户主页*/
exports.user = function(req, res , next){

	var user_id = trim(req.params.id);

	var render = function(currentUser,jobs,follows,relation){
		
		//===成功！
		res.render('user/index', { 
			title: '乐享',
			layout:'default',
			currentUser:currentUser,
			jobs: jobs,
			follows:follows,
			relation:relation
		});	  		
	}

	var proxy = new EventProxy();

    proxy.assign('currentUser', 'jobs','follows','relation', render);
    proxy.fail(next);

	UserDao.getUserById(user_id,proxy.done('currentUser'));

	var op = {limit: 5,sort: [ [ 'create_at', 'desc' ] ]};//一般是：{ limit: 5, sort: [ [ 'last_reply_at', 'desc' ] ]};
	var q = {
		author_id:user_id
	};
	JobDao.getJobsByQuery(q,op,proxy.done('jobs'));		

	RelationDao.getFollowings(user_id,proxy.done('follows'));

	if (!req.session.user) {
      proxy.emit('relation', null);
    } else {
      RelationDao.getRelation(user_id,req.session.user._id, proxy.done('relation'));
    }
};

exports.follow = function(req,res,next){
	if(!req.session){
		req.flash('error','必须先登录才能，关注其他好友哦！')
		return res.redirect('/login');
	}
	var follow_id = req.session.user._id;//被关注的人
	var user_id = req.params.id;//关注的人
	RelationDao.newAndSave(user_id,follow_id,function(err,relation){
		if(err)
			req.flash('error','关注失败！');
		else
			req.flash('success','关注成功啦！');
		return res.redirect('/u/'+user_id);
	});

}

exports.unfollow = function(req,res,next){
	if(!req.session){
		req.flash('error','必须先登录才能，关注其他好友哦！')
		return res.redirect('/login');
	}
	var follow_id = req.session.user._id;//被关注的人
	var user_id = req.params.id;//关注的人
	RelationDao.remove(user_id,follow_id,function(err,relation){
		if(err)
			req.flash('error','取消关注失败！');
		else
			req.flash('success','取消关注成功啦！');
		return res.redirect('/u/'+user_id);
	});

}


/*注册页面*/
exports.reg = function(req, res){
	res.render('user/reg', {
		title: '注册页面-乐享'
	});
};

/*注册表单*/
exports.doReg = function(req, res, next){
	//非空检查
	if(req.body['password'] =='' || req.body['email'] ==''){
		req.flash('error',"必填项不能为空！");
		return res.redirect('/reg');
	}
	
	if(req.body['name'] =='' || req.body['name'] ==''){
		req.flash('error',"必填项不能为空！");
		return res.redirect('/reg');
	}

	//两次口令一致
	if(req.body['password'] !== req.body['repassword']){
		req.flash('error',"两次口令不一致！");
		return res.redirect('/reg');
	}

	//email不能重复
	UserDao.getUserByEmail(req.body['email'],function(err,user){
		if(err){
			req.flash('error',err);
			return res.redirect('/reg');
		}
		if(user){
			req.flash('error',"该用户已存在，请换一个邮箱");
			return res.redirect('/reg');
		}else{
			//用户名不能重复
			UserDao.getUserByName(req.body['name'],function(err,user){
				if(err){
					req.flash('error',err);
					return res.redirect('/reg');
				}
				if(user){
					req.flash('error',"该昵称已存在，请换一个昵称");
					return res.redirect('/reg');
				}else{
					//可以注册
					UserDao.newAndSave(req.body['name'],req.body['email'],req.body['password'],function(err,user){
						if(err)	{
							req.flash('error',err);					
							return res.redirect('/reg');
						}
						//添加到session
						req.session.user = user;
						req.flash('success','注册成功');
						res.redirect('/');	
					});
				}
			});
		}
	});
	

};

/*登陆页面*/
exports.login = function(req, res){
	//console.log(req.session.lastRequestUrl);
	//检查是否登录
	checkLogin(req,res);
	res.render('user/login', { 
  		title: '登陆页面-乐享'
  	});

};

/*登入表单*/

exports.doLogin = function(req, res,next){
	//console.log(req.session.lastRequestUrl);
	//检查是否登录
	checkLogin(req,res);
    //非空检查
	if(req.body['password'] ==='' || req.body['email'] === ''){
		req.flash('error','输入不能为空！');
		return res.redirect('/login');
	}
	UserDao.getUserByEmail(req.body['email'],function(err,user){
		if(err){
			req.flash('error','数据库查询失败！');
			return res.redirect('/login');
		}

		if(user){
			if(user.password == req.body['password']){
				//登陆成功
				req.session.user = user;
				return res.redirect('/');			
			}else{
				//密码输入错误
				req.flash('error','密码输入错误！');
				return res.redirect('/login');	
			}

		}else{
			req.flash('error','用户不存在！');
			return res.redirect('/login');
		}

	});
};

exports.ajaxLogin = function(req, res,next){
	var result = {
		type:'failed',
		message:'失败'
	};
	//检查是否登录
	if(req.session.user)
		result.message = '已经登录';

    //非空检查
	if(req.body['password'] ==='' || req.body['email'] === ''){
		result.message = '验证失败,存在未填项！';
		res.send(result);
	}

	UserDao.getUserByEmail(req.body['email'],function(err,user){
		if(user){
			if(user.password == req.body['password']){
				req.session.user = user;
				result.type = 'success';
				result.message = '登录成功！';
			}else{
				//密码输入错误
				result.message = '密码输入错误！';
			}
		}else{
			result.message = '用户不存在！';
		}
		res.send(result);
	});
};

/*登出*/
exports.logout = function(req, res){
	req.session.user = null;
	req.flash('success','登出成功！');		
    res.redirect('/');
};

//+++++++++++++++++++++++++++
//工具方法
//+++++++++++++++++++++++++++

/**如果已经登入了,就转到首页**/
function checkLogin(req,res){
	if(req.session.user)
		return res.redirect('/');
}

/**如果已经登入了,就转到首页**/
function mustLogined(req,res){
	if(!req.session.user)
		return res.redirect('/login');
}

/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
