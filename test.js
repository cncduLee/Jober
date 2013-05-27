var UserDao = require('./service').UserDao;
var JobDao = require('./service').JobDao;

console.log('user test---!\n');

//++++++++++++++++++++++++++++++
//==userdao测试
//++++++++++++++++++++++++++++++

// UserDao.newAndSave('aaaa1','ccc',function(err,user){
// 	if (err) {
// 		console.log(err);
// 	}else{
// 		console.log("insert----"+user);
// 	}

// });
//  UserDao.getUserByEmail('aaaa1',function(err,user){
// 	if (err) {
// 		console.log(err);
// 	}else{
// 		console.log("find---"+user+"==id:"+user._id + "===type："+typeof(user._id));



// 	}
// });

//++++++++++++++++++++++++++++++
//==jobdao测试
//++++++++++++++++++++++++++++++

/*
var query = {};
JobDao.getCountByQuery(query,function(err,count){
	if(err)
		console.log('errr');
	console.log('count:'+count);
});
*/



UserDao.getUsersByQuery({},{},function(err,users){
 	if(err)
 		console.log('err!');

 	users.forEach(function(user,i){
		/**
		 * 根据关键词，获取job列表
		 * Callback:
		 * - err, 数据库错误
		 * - jobs, 主题列表
		 * @param {String} query 搜索关键词
		 * @param {Object} opt 搜索选项
		 * @param {Function} callback 回调函数
		 */
		var op = {sort: [ [ 'create_at', 'desc' ] ]};//一般是：{ limit: 5, sort: [ [ 'last_reply_at', 'desc' ] ]};
		var q = {author_id:user._id};
		JobDao.getJobsByQuery(q,op,function(err,jobs){
			
			if(err)
				console.log('err');

			if(jobs.length===0)
				console.log('null collection!');
			
			console.log(jobs);

			// var jobids = [];
			// jobs.forEach(function( job , j ){
			// 	console.log('j:'+job);
			// 	jobids.push(job._id);
			// });

			// jobids.forEach(function(id,k){
			// 	JobDao.getJobById(id,function(err,job){
			// 		if(err)
			// 			console.log('errr');
			// 		console.log('@@----------job:'+job.title);
			// 	});
			// });
		});

 	});

 });

JobDao.remove('51a0b8b2d7886a8c1d000002',function(err,result){
	console.log('err:'+err+"result:"+result);
});

console.log('---!\n');


