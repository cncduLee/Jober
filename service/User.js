var models = require('../models');
var EventProxy = require('eventproxy');
var User = models.User;
var crypto = require('crypto');


/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (id, callback) {
  User.findOne({_id: id}, callback);
};

/**
 * 根据用户email，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserByEmail = function(email,callback){
	 User.findOne({'email': email}, callback);
}

/**
 * 根据用户name，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserByName = function(name,callback){
	 User.findOne({'name': name}, callback);
}


/**
 * 根据用户ID列表，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} ids 用户ID列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByIds = function (ids, callback) {
  User.find({'_id': {'$in': ids}}, callback);
};
/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query,{}, opt, callback);
};

/**
 * 新增用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 用户email
 * @param {String} pwd 用户pwd	
 * @param {Function} callback 回调函数
 */
exports.newAndSave = function (name,email,pass, callback) {
	// create gavatar
   var avatar_url = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase()) + '?size=48';	

  var user = new User();
  user.name = name;
  user.email = email;
  user.password = pass;
  user.avatar_url = avatar_url;
  user.save(callback);
};

/***private****/
function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}
