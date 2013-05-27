var EventProxy = require('eventproxy');
var UserDao = require('../service/user');
var ResumeDao = require('../service/resume');


exports.post = function(req,res,next){
	var id = trim(req.params.jobid);
	
	console.log(id);

	res.render("resume/postResume",{
		title:"投递简历-乐享",
		layout:false,
		jobid:id
	});
};
exports.doPost = function(req,res,next){};


/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}