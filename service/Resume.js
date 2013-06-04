var models = require('../models');
var Resume = models.Resume;
var EventProxy = require('eventproxy');


/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - Resume, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getResumeById = function (id, callback) {
  Resume.findOne({_id: id}, callback);
};

/**
 * 根据职位提供者ID，查找
 * Callback:
 * - err, 数据库异常
 * - Resume, 用户
 * @param {String} author_to 用户ID
 * @param {Function} callback 回调函数
 */
exports.getResumesByAuthor = function (author_id, callback) {
  Resume.find({author_from: author_id},callback);
};

/**
 * 根据职位提供者ID，查找
 * Callback:
 * - err, 数据库异常
 * - Resume, 用户
 * @param {String} author_to 用户ID
 * @param {Function} callback 回调函数
 */
exports.getResumesByprovider = function (author_id, callback) {
  Resume.find({author_to: author_id},callback);
};


/**
 * 求职者ID，查找
 * Callback:
 * - err, 数据库异常
 * - Resume, 用户
 * @param {String} author_to 用户ID
 * @param {Function} callback 回调函数
 */
exports.getOnlineResumeByAuthor = function (author_id, callback) {
  Resume.find({author_from: author_id,type:'on'},callback);
};

/**
 * 新增用户
 * Callback:
 * - err, 数据库异常
 * - Resume, 简历
 * @param {Resume} Resume 简历
 * @param {Function} callback 回调函数
 */
exports.newAndSave = function (resume, callback) {
  resume.save(callback);
};

/**删除全部的*/
exports.removeAll = function (resumes, callback) {
  
  	var proxy = new EventProxy();
    proxy.fail(next);
    proxy.after('del_all',resumes.length,function(ids){
    	Resume.remove({"_id":{"$in":ids}},callback);	
    });

	resumes.forEach(function(res,i){
	  	proxy.emit('del_all',res._id);
	});

};
