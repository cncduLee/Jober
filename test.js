var UserDao = require('./service').UserDao;
var JobDao = require('./service').JobDao;
var EventProxy = require('eventProxy');

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


var events = ['a','b'];
var proxy = new EventProxy();


// EventProxy.create(events, function (list) {
//   console.log('result=+++++++++++++'+list);
// });

UserDao.getUsersByQuery({},{},function(err,users){
 	
 	proxy.after('a',users.length,function(list){
 		for(var a=0;a<list.length;a++)
 			console.log(a+':'+list[a].jobs);
	});

 	var op = {sort: [ [ 'create_at', 'desc' ] ]};//一般是：{ limit: 5, sort: [ [ 'last_reply_at', 'desc' ] ]};
 	users.forEach(function(user,i){
		var q = {author_id:user._id};
		JobDao.getJobsByQuery(q,op,function(err,jobs){
			if(err)
				console.log('err');
			
			var muser = user;
			muser.jobs = jobs;
			proxy.emit('a',muser);

			// var ids = [];
			// for(var a=0;a<jobs.length;a++){
			// 	ids.push(jobs[a]._id);
			// }
			// var q2 = {author_id:user._id,_id:{'$in':ids}};
			// JobDao.getJobsByQuery(q2,op,function(err,jjj){
			// 	user.jjj = jjj;
			// 	proxy.done('a',user);
			// });
		});
 	});

 });

// JobDao.remove('51a0b8b2d7886a8c1d000002',function(err,result){
// 	console.log('err:'+err+"result:"+result);
// });

// JobDao.getJobsByQuery({author_id:'51a08d799437412c12000001'},{sort: [ [ 'create_at', 'desc' ] ],limit: 5},function(err,jobs){
// 	console.log(jobs);
// });

// console.log('---!\n');


