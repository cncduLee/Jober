var EventProxy = require('eventproxy');
var UserDao = require('../service').UserDao;
var JobDao = require('../service').JobDao;


/*首页*/
exports.index = function(req, res,next){

var proxy = new EventProxy();
proxy.fail(next);

JobDao.getJobs(function(err,jobs){

  jobs.forEach(function(job,a){
    UserDao.getUserById(job.author_id,function(err,user){
        //如果找不到创建者，说明该职位已作废
        if(user){
          job.author = user;
          proxy.emit('jobs',job);
        }
    });
  });

  proxy.after('jobs',jobs.length,function(list){
      //===成功！
      res.render('index', { 
        title: '用户列表——乐享',
        layout:'default',
        jobs: list
      });     
  });
});

};

exports.about = function(req,res,next){
  res.send('not implements!');
};
