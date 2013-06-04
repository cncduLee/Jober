 var index = require('./routes/index');
 var job = require('./routes/job');
 var user = require('./routes/user');
 var resume = require('./routes/resume');
 var upload = require('./routes/upload');
 var message = require('./routes/message');

var rest_user = require('./rest/user');
var rest_job = require('./rest/job');
var rest_msg = require('./rest/message');
var rest_resume = require('./rest/resume');


module.exports = function(app){

	app.get('/', index.index);
	app.get('/about', index.about);
	
	app.get('/job', job.post);
	app.post('/job/post', job.doPost);
	app.get('/job/:id', job.detail);
	app.get('/job/edit/:id', job.edite);
	app.post('/job/edit/:id', job.update);
	app.get('/job/remove/:id', job.remove);

	app.get('/users', user.users);
	app.get('/u/:id', user.user);

	app.get('/pwd', user.pwd_s);
	app.get('/avatar', user.avatar_s);
	app.post('/pwd', user.pwd);//json
	app.post('/avatar', user.avatar);//json

	app.get('/u/follow/:id', user.follow);
	app.get('/u/unfollow/:id', user.unfollow);

	app.get('/reg', user.reg);
	app.post('/reg', user.doReg);
	app.get('/login', user.login);
	app.post('/login', user.doLogin);
	app.post('/login/a', user.ajaxLogin);
	
	app.get('/logout', user.logout);

	app.get('/resume/post/:jobid',resume.post);
	app.post('/resume/post/on',resume.online);
	app.post('/resume/post/off',resume.offline);

	app.get('/msg/sendto/:userid',message.sendto_s);
	app.post('/msg/sendto/post',message.sendto);
	app.get('/msg/list',message.msglist);
	app.post('/msg/unread',message.unread);
	app.get('/msg/mark_all_read',message.mark_all_read);
	

	// upload
  	app.post('/upload/file', upload.uploadDoc);

  	//过滤器所有get请求
	// app.get('/*',function(req,res,next){ 
	//     if( req.header('Referrer') )
	//       req.session.lastRequestUrl = req.header('Referrer');
	//     next();
	// });



	//====================================//
	//==============rest api =============//
	//====================================//

	app.get('/rest/user/login',rest_user.restLogin);

	app.get('/rest/jobs',rest_job.getJobsByType);
	app.get('/rest/jobsearch',rest_job.searchJobs);
	app.get('/rest/job/:id',rest_job.getDetail);
	// app.get('/rest/jobs/provide/:uid',rest_job.getSelfJobs);
	// app.get('/rest/jobs/ask/:uid',rest_job.getAskJobs);

	app.get('/rest/msgs/:uid',rest_msg.msglist);

	app.get('/rest/resume/:uid',rest_resume.getResume);	
};