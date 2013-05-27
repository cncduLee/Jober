var UserDao = require('../service').UserDao;
var JobDao = require('../service').JobDao;


/*首页*/
exports.index = function(req, res){

JobDao.getJobs(function(err,jobs){
  	
  	if(err){
  		req.flash("error",err);
  		
  		res.render('index', { 
		  	title: '乐享',
		  	layout:'default',
		  	jobs:null
		});

  	}else{
  		res.render('index', { 
		  	title: '乐享',
		  	layout:'default',
		  	jobs:jobs
		});
  	}

  });

};
