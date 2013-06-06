var EventProxy = require('eventproxy');
var UserDao = require('../service/').UserDao;
var JobDao = require('../service/').JobDao;
var ResumeDao = require('../service/').ResumeDao;

var models = require('../models');
var Resume = models.Resume;



exports.post = function(req,res,next){
	//1、用户是否登录
	if(!req.session.user){
		req.flash('error','您还未登录！');
		return res.redirect('/login');
	}
	var id = trim(req.params.jobid);
	var render = function(job,author_to){
		res.render("resume/postResume",{
			title:"投递简历",
			layout:'default',
			job:job,
			author_to:author_to
		});
	};

	var proxy = new EventProxy();
    proxy.assign('job','author_to', render);
    proxy.fail(next);

	JobDao.getJobById(id,function(err,job){
		
		proxy.emit('job',job);
		
		UserDao.getUserById(job.author_id,function(err,user){
			user.email = dim(user.email);
			
			proxy.emit('author_to',user);

		});
	});
};

exports.online = function(req,res,next){
	//1、用户是否登录
	if(!req.session.user){
		req.flash('error','您还未登录！');
		return res.redirect('/login');
	}
	//2、验证
	//....
	//3、添加数据
	var resume = getResume(req,'on');
	//1、用户是否登录
	if(!req.session.user){
		req.flash('error','您还未登录！');
		return res.redirect('/login');
	}else{
		resume.author_from = req.session.user._id;
	}

	var proxy = new EventProxy();
    proxy.assign('job_update','resume_add', function(job){
    	req.flash('success','职位申请成功！');
		return res.redirect('job/'+job._id);
    });
    proxy.fail(next);


	ResumeDao.newAndSave(resume,function(err,resume){
		if(!err && resume){
			proxy.emit('resume_add');
			var job_id = resume.job_id;
			JobDao.updateAsk(job_id,function(err,job){
				proxy.emit('job_update',job);
			});
		}else{
			req.flash('error','职位申请失败！');
			return res.redirect('/');
		}
	});
};


exports.offline = function(req,res,next){
	var resume = getResume(req,'off');
	//1、用户是否登录
	if(!req.session.user){
		req.flash('error','您还未登录！');
		return res.redirect('/login');
	}else{
		resume.author_from = req.session.user._id;
	}
	
	var proxy = new EventProxy();
	proxy.assign('job_update','resume_add', function(job){
    	req.flash('success','职位申请成功！');
		return res.redirect('job/'+job._id);
    });
    proxy.fail(next);


	ResumeDao.newAndSave(resume,function(err,resume){
		if(!err && resume){
			proxy.emit('resume_add');
			var job_id = resume.job_id;
			JobDao.updateAsk(job_id,function(err,job){
				proxy.emit('job_update',job);
			});
		}else{
			req.flash('error','职位申请失败！');
			return res.redirect('/');
		}
	});	
};




/*获取表单*/
function getResume(req,type){
	var resume = new Resume();

	resume.title = req.body['title'];
	resume.content = req.body['content'];
	resume.author_to = req.body['author_to'];
	resume.job_id = req.body['job_id'];

	//========离线========//
	if(type == 'off'){
		resume.type = 'off';
		resume.resume_file = req.body['resume_file'];
	}

	//========在线========//
	if(type == 'on'){
		resume.type = 'on';
		resume.name = req.body['name'];
		resume.email = req.body['email'];
		resume.phoneNo = req.body['phoneNo'];
		resume.work_years = req.body['work_years'];
		resume.work_history = req.body['work_history'];
		resume.edu_backend = req.body['edu_backend'];
	}


	return resume;	
}

/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**模糊化处理**/
function dim(str){
	return str.substring(0,2).concat('****',str.substring(str.indexOf('@'),str.length).substring(0,4));
}
