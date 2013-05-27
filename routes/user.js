var EventProxy = require('eventproxy');

var UserDao = require('../service').UserDao;
var JobDao = require('../service').JobDao;


/*用户主页*/
exports.user = function(req, res){
	
	var id = trim(req.params.id);

	var op = {sort: [ [ 'create_at', 'desc' ] ]};//一般是：{ limit: 5, sort: [ [ 'last_reply_at', 'desc' ] ]};
	var q = {author_id:id};

	JobDao.getJobsByQuery(q,op,function(err,jobs){
		if(err){
			req.flash('error',err);
		}
		
		if(jobs == null ||jobs.length === 0){
			req.flash('error',"您当前还没有发布职位，您可以先登录，然后发布职务！");	
		}

		var fullJobs = [];
		var proxy = new EventProxy();
		proxy.after('jobs_ready', jobs.length, function () {
	      	console.log(fullJobs);
			//===成功！
			res.render('user/index', { 
			  	title: '乐享',
			  	layout:'default',
			  	jobs: fullJobs
			});
	    });
	    proxy.fail(function(){
	    	req.flash('error',err);
	    	return res.redirect('/u/:'+id);
	    });

		
		jobs.forEach(function(job,i){
			JobDao.getJobById(job._id,function(err,jobItem){
				fullJobs[i]=jobItem;
				proxy.emit('jobs_ready');
			});
		});

	});
};



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

	//两次口令一致
	if(req.body['password'] !== req.body['repassword']){
		req.flash('error',"两次口令不一致！");
		return res.redirect('/reg');
	}

	//用户名不能重复
	UserDao.getUserByEmail(req.body['email'],function(err,user){
		
		if(err){
			req.flash('error',err);
			return res.redirect('/reg');
		}

		if(user){
			req.flash('error',"该用户已存在，请换一个邮箱");
			return res.redirect('/reg');
		}else{
			//可以注册
			UserDao.newAndSave(req.body['email'],req.body['password'],function(err,user){
				
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

};

/*登陆页面*/
exports.login = function(req, res){
	//检查是否登录
	checkLogin(req,res);
	res.render('user/login', { 
  		title: '登陆页面-乐享'
  	});

};

/*登入表单*/

exports.doLogin = function(req, res,next){
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
