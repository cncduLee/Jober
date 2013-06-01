var models = require('../models');
var Resume = models.Resume;



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

