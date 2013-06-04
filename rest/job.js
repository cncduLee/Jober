var UserDao = require('../service').UserDao;
var JobDao = require('../service').JobDao;
var config = require('../config');
var EventProxy = require('eventProxy');

var data2xml = require('data2xml');



exports.searchJobs = function(req,res,next){
	//判断类型
	var type = trim(req.query.type);
	var condition = trim(req.query.condition);  
	var query = {};
    var opt = {limit: 20, sort: [['create_at', 'desc']]};
	
	//如果有搜索请求就增加查询条件
	//用正则表达式得到的pattern对title属性进行模糊查询
	//这里是搜集合里title属性包含str串的所有结果
	var pattern = new RegExp("^.*"+condition+".*$");

    if(type === 'company'){
    	//按公司
		query.company = pattern;	
	}
	else if(type === 'position'){
		//按职位搜索
		query.position = pattern;	
	}
	else{
		return res.jsonp({
			type:'error',
			message:'请求参数没有选择类型'
		});
	}

	JobDao.getJobsByQuery(query,opt,function(err,jobs){
		var rest_jobs = [];
		jobs.forEach(function(job){
			rest_jobs.push({
				title:job.title,
				clickCount:job.click_count,
				requirements:job.position
			});
		});
		res.jsonp(rest_jobs);
	});

};

exports.getJobsByType = function(req,res,next){
	
	//判断类型
	var type = trim(req.query.type);
	var page = Number(req.query.page) || 1;
	var limit = Number(config.page_size) || 10;

	var query = {};
    var opt = {};

	if(type === 'news'){
		opt = {skip: (page - 1) * limit, limit: limit, sort: [['create_at', 'desc']]};	
	}
	else if(type === 'ask'){
		opt = {skip: (page - 1) * limit, limit: limit, sort: [['ask_count', 'desc']]};
	}
	else if(type === 'click'){
		opt = {skip: (page - 1) * limit, limit: limit, sort: [['click_count', 'desc']]};
	}
	else{
		return res.jsonp({
			type:'error',
			message:'请求参数没有选择类型'
		});
	}
	
	JobDao.getJobsByQuery(query,opt,function(err,jobs){
		var rest_jobs = [];
		jobs.forEach(function(job){
			rest_jobs.push({
				title:job.title,
				clickCount:job.click_count,
				requirements:job.position
			});
		});
		res.jsonp(rest_jobs);
	});

};

exports.getSelfJobs =function(req,res,next){
	var uid = req.params.uid;
	console.log("-----------" + uid);

	var op = {limit: 5,sort: [ [ 'create_at', 'desc' ] ]};//一般是：{ limit: 5, sort: [ [ 'last_reply_at', 'desc' ] ]};
	var q = {
		author_id:user_id
	};
	JobDao.getJobsByQuery(query,opt,function(err,jobs){
		var rest_jobs = [];
		jobs.forEach(function(job){
			rest_jobs.push({
				title:job.title,
				clickCount:job.click_count,
				requirements:job.position
			});
		});
		res.jsonp(rest_jobs);
	});

};

exports.getDetail=function(req,res,next){
	
	var id = trim(req.params.id);

	JobDao.getJobById(id,function(err,job){
		if(err || job === null){
			res.send({});
		}
		//点击数++
		JobDao.updateClick(id,function(err,job){
			//装配数据到页面
			res.send(job);
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


/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
