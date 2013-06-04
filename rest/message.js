var EventProxy = require('eventproxy');
var MessageDao = require('../service').MessageDao;
var UserDao = require('../service').UserDao;
var Util = require('../service/util');

exports.msglist = function(req,res,next){

	var uid = req.params.uid;
	
	var result = {
		type:'sys',
		author:'',
		authorid:'',
		content:'',
		at:Date.now,
		hasread:false
	};
	
	
	var proxy = new EventProxy();
	proxy.fail(next);
	
	var render = function(messages){
		var rest_msg = [];
			for (var i = 0; i < messages.length; i++) {
				rest_msg.push({
					author:messages[i].author.name,
					authorid:messages[i].author_id,
					content:messages[i].content,
					type:messages[i].type,
					at:messages[i].at,
					hasread:messages[i].has_read
				});
			}

			//===成功！
			res.jsonp(rest_msg);
	};

	MessageDao.getMessagesByUserId(uid,function(err,messages){
		
		proxy.after('gotmessages',messages.length,render);

		messages.forEach(function(message,a){
			message.at = Util.format_date(message.create_at, true);
			UserDao.getUserById(message.author_id,function(err,user){
				message.author = user;
				proxy.emit('gotmessages',message);
			});
		});
	});
};