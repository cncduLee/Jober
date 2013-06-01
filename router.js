 var index = require('./routes/index');
 var job = require('./routes/job');
 var user = require('./routes/user');
 var resume = require('./routes/resume');
 var upload = require('./routes/upload');

var rest_user = require('./rest/user');


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

	app.all('/rest/user/login',rest_user.restLogin);

};