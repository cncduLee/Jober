var models = require('../models');
var Message = models.Message;



/**
 * 根据用户ID，获取未读消息的数量
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * - count, 未读消息数量
 * @param {String} id 用户ID
 * @param {Function} callback 获取消息数量
 */
exports.getMessagesCount = function (id, callback) {
  Message.count({master_id: id, has_read: false}, callback);
};

/**
 * 根据用户ID，获取消息列表
 * Callback:
 * - err, 数据库异常
 * - messages, 消息列表
 * @param {String} userId 用户ID
 * @param {boolean} has_read 
 * @param {Function} callback 回调函数
 */
exports.getMessagesByUserId = function (userId,callback) {
  Message.find({master_id: userId}, {}, {sort: [['create_at', 'desc']]}, callback);
};

/**
 * 根据用户ID，获取未读消息列表
 * Callback:
 * - err, 数据库异常
 * - messages, 未读消息列表
 * @param {String} userId 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUnreadMessageByUserId = function (userId, callback) {
  Message.find({master_id: userId, has_read: false}, callback);
};



/**
 * 根据消息Id获取消息
 * Callback:
 * - err, 数据库错误
 * - message, 消息对象
 * @param {String} id 消息ID
 * @param {Function} callback 回调函数
 */
exports.getMessageById = function (id, callback) {
  Message.findOne({_id: id}, callback);
};



exports.read = function(id,callback){
	Message.findOne({_id: id}, function(err,msg){
		msg.has_read = true;
		msg.save(callback);
	});
};

exports.newAndSave = function (userid,masterid,type,content, callback) {
  var msg = new Message();
  msg.author_id = userid;
  msg.master_id = masterid;
  msg.type = type;
  msg.content = content;
  msg.save(callback);
};