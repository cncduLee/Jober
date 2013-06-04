var EventProxy = require('eventproxy');
var ResumeDao = require('../service').ResumeDao;
var UserDao = require('../service').UserDao;
var Util = require('../service/util');

exports.getResume = function(req,res,next){
	
	var uid = req.params.uid;;

	var result = {
		name:{type:String},//姓名
		email:{type:String},//邮箱
		phoneNo:{type:String},//电话号码
		workyears:{type:Number,default:0},//工作年限
		workhistory:{type:String},//工作经历
		edubackend:{type:String},//学历
	};
	
	var proxy = new EventProxy();
	proxy.fail(next);

	ResumeDao.getOnlineResumeByAuthor(uid,function(err,resumes){
		
		proxy.after('gotresumes',resumes.length,function(rest_resumes){
			//===成功！
			res.jsonp(rest_resumes);
		});

		resumes.forEach(function(resume,a){
				var rest_resume = {
					name:resume.name,//姓名
					email:resume.email,//邮箱
					phoneNo:resume.phoneNo,//电话号码
					workyears:resume.work_years,//工作年限
					workhistory:resume.work_history,//工作经历
					edubackend:resume.edu_backend//学历
				};
				proxy.emit('gotresumes',rest_resume);
		});

	});
};