var UserDao = require('../service').UserDao;
var JobDao = require('../service').JobDao;

/*发表信息*/
exports.post = function(req, res){
	//必须先登录
	mustLogined(req,res);
	
	//发布新职位
	  res.render('job/post', {
	  	title: '发布职位-乐享',
	  	layout:'default'
	  });
};
/*发表信息表单*/
exports.doPost = function(req, res,next){
	
	console.log('-----------');
	//必须先登录
	mustLogined(req,res);
	var author_id = req.session.user._id;

	JobDao.newAndSave(
		author_id,
		req.body['title'],
		req.body['company'],
		req.body['position'],
		req.body['requirements'],
		req.body['number'],
		function(err,job){
			if(err){
				req.flash("error",err);
				return res.redirect('/job');
			}
			req.flash("success","职位发布成功！");
			return res.redirect('/');
	});
};

exports.detail=function(req,res,next){
	
	var id = trim(req.params.id);

	JobDao.getJobById(id,function(err,job){
		
		if(err){
			req.flash('error',err);
			return res.redirect('/');
		}
		if(job === null){
			req.flash('error','该职位已被删除！');
			return res.redirect('/');	
		}

		//点击数++
		JobDao.updateClick(id,function(err,job){
			if(err){
				req.flash('error',err);
				return res.redirect('/');
			}
			//装配数据到页面
			res.render('job/detail',{
				title:"job详情-乐享",
				layout:'default',
				job:job
			});
		});
	});
};


exports.edite = function(req,res,next){
	var id = trim(req.params.id);
	JobDao.getJobById(id,function(err,job){
		
		if(err){
			req.flash('error',err);
			return res.redirect('/');
		}
		if(job === null){
			req.flash('error','该职位已被删除！');
			return res.redirect('/');	
		}

		//装配数据到页面
			res.render('job/edit',{
				title:"job更新-乐享",
				job:job
			});
	});
};

exports.update = function(req,res,next){
	//TODO 处理表单请求，更新数据！！！！
}

exports.remove = function(req,res,next){
	var id = trim(req.params.id);
	JobDao.remove(id,function(err,result){

		if(err){
			req.flash('error','删除失败，出错了！');
			return res.redirect('/');
		}
		req.flash('success','删除成功！');
		return res.redirect('/');
	});
};




//+++++++++++++++++++++++++++
//工具方法
//+++++++++++++++++++++++++++


/**为登陆，强制转到登陆页**/
function mustLogined(req,res){
	if(!req.session.user)
		return res.redirect('/login');
}

/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
