 var index = require('./routes/index');
 var job = require('./routes/job');
 var user = require('./routes/user');
 var resume = require('./routes/resume');



module.exports = function(app){

	app.get('/', index.index);
	
	app.get('/job', job.post);
	app.post('/job', job.doPost);
	app.get('/job/:id', job.detail);
	app.get('/job/edit/:id', job.edite);
	app.post('/job/edit/:id', job.update);
	app.get('/job/remove/:id', job.remove);

	app.get('/u/:id', user.user);
	app.get('/reg', user.reg);
	app.post('/reg', user.doReg);
	app.get('/login', user.login);
	app.post('/login', user.doLogin);
	app.get('/logout', user.logout);

	app.get('/resume/post/:jobid',resume.post);
	app.post('/resume/post',resume.doPost);

	// upload
  	app.post('/upload/file', upload.uploadImage);
};