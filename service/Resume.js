var models = require('../models');
var User = models.User;



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
 * 新增用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 用户email
 * @param {String} pwd 用户pwd	
 * @param {Function} callback 回调函数
 */
exports.newAndSave = function (email,pass, callback) {
  var user = new User();
  user.email = email;
  user.password=pass;
  user.save(callback);
};
