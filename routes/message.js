var EventProxy = require('eventproxy');
var MessageDao = require('../service').MessageDao;
var UserDao = require('../service').UserDao;
var Util = require('../service/util');

exports.sendto_s = function(req,res,next){
	
	var uid = trim(req.params.userid);
	
	if(!req.session.user){
		req.flash('error','发私信必须先登录！');
		return res.redirect('/login');
	}
	res.render('message/mess',{
		title: '私信',
		layout:'default',
		sendtoid:uid
	});
};	

exports.sendto = function(req,res,next){
	
	var sendto = req.body['sendto_id'];
	var content = req.body['content'];
	var result = {
		type:'error',
		message:'出错了...'
	};
	
	if(!req.session.user){
		req.flash('error','发私信必须先登录！');
		return res.redirect('/login');
	}

	MessageDao.newAndSave(req.session.user._id , sendto , "user",content,function(err,msg){
		
		if(err)
			console.log(err);

		if(!err && msg){
			result.type = 'success';
			result.message = '消息已发送！';
		}
		
		console.log(result);
		res.jsonp(result);

	});
};

exports.unread = function(req,res,next){
	if(!req.session.user){
		req.flash('error','先登录,才能看到未读消息！');
		return res.redirect('/login');
	}

	MessageDao.getMessagesCount(req.session.user._id,function(err,count){
		res.jsonp({count:count});	
	});
	
};

exports.msglist = function(req,res,next){
	
	if(!req.session.user){
		req.flash('error','先登录,才能看到消息列表！');
		return res.redirect('/login');
	}
	
	
	var proxy = new EventProxy();
	proxy.fail(next);
	
	var render = function(messages){
			var hasread_messages = [];
			var unread_messages = [];
			
			for (var i = 0; i < messages.length; i++) {
				if (messages[i].has_read) {
		            hasread_messages.push(messages[i]);
		        } else {
		            unread_messages.push(messages[i]);
		        }
			}

			//===成功！
			res.render('message/list',{
				title:'消息列表',
				layout:'default',
				hasread_messages:hasread_messages,
				unread_messages:unread_messages
			});
			return;
	};

	MessageDao.getMessagesByUserId(req.session.user._id,function(err,messages){
		
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

exports.mark_all_read = function(req,res,next){
	if(!req.session.user){
		req.flash('error','先登录,才能看到消息列表！');
		return res.redirect('/login');
	}

	var proxy = new EventProxy();
	proxy.fail(next);

	MessageDao.getUnreadMessageByUserId(req.session.user._id,function(err,msgs){
		
		proxy.after('read_message',msgs.length,function(messages){
			res.redirect('/msg/list');
		});	

		msgs.forEach(function(msg,a){
			MessageDao.read(msg._id,function(err,rmsg){
				proxy.emit('read_message',rmsg);
			});
			
		});
		
	});
};



/***删除左右两端的空格**/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}