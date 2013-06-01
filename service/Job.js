var models = require('../models');
var Job = models.Job;



/**
 * 根据JobID，查找Job
 * Callback:
 * - err, 数据库异常
 * - user, Job
 * @param {String} id JobID
 * @param {Function} callback 回调函数
 */
exports.getJobById = function (id, callback) {
  Job.findOne({_id: id}, callback);
};

/**
 * 查找所有Job
 * Callback:
 * - err, 数据库异常
 * - jobs, Job
 * @param {Function} callback 回调函数
 */
exports.getJobs = function(callback){
	Job.find({}, callback);
};

/**
 * 根据关键词，获取job列表
 * Callback:
 * - err, 数据库错误
 * - jobs, 主题列表
 * @param {String} query 搜索关键词
 * @param {Object} opt 搜索选项
 * @param {Function} callback 回调函数
 */
exports.getJobsByQuery = function (query, opt, callback){
	Job.find(query,{}, opt, callback);
};




/**
 * 获取关键词能搜索到的主题数量
 * Callback:
 * - err, 数据库错误
 * - count, 主题数量
 * @param {String} query 搜索关键词
 * @param {Function} callback 回调函数
 */
exports.getCountByQuery = function (query, callback) {
  Job.count(query, callback);
};


/**
 * 点击数加 1
 * Callback:
 * - err, 数据库异常
 * - job, Job
 * @param {String} id JobID
 * @param {Function} callback 回调函数
 */
exports.updateClick = function(id,callback){
	Job.findOne({_id: id}, function(err,job){
		
		if(err)
			return callback(err);
		if(!job)
			return callback(new Error('该职位已经不存在！！'));
		
		job.click_count += 1;
		job.save(callback);

	});
};

/**
 * 点击数加 投递简历加 1
 * Callback:
 * - err, 数据库异常
 * - job, Job
 * @param {String} id JobID
 * @param {Function} callback 回调函数
 */
exports.updateAsk = function(id,callback){
	Job.findOne({_id: id}, function(err,job){
		
		if(err)
			return callback(err);
		if(!job)
			return callback(new Error('该职位已经不存在！！'));
		
		job.ask_count += 1;
		job.save(callback);

	});
};

/**
 * 新增Job
 * Callback:
 * - err, 数据库异常
 * - user, Job
 * @param {String} email Jobemail
 * @param {String} pwd Jobpwd	
 * @param {Function} callback 回调函数
 */
exports.newAndSave = function (author_id,title,company,position,requirements,number, callback) {
  var job = new Job();
  job.author_id = author_id;
  job.title=title;
  job.company=company;
  job.position=position;
  job.requirements=requirements;
  job.number=number;

  job.save(callback);
};

/**
 * 删除Job
 * Callback:
 * - err, 数据库异常
 * - result(string), 结果字符串
 * @param {String} id
 * @param {Function} callback 回调函数
 */
exports.remove = function(id,callback){
	Job.findOne({_id: id}, function(err,job){
		if(err)
			return callback(err);
		if(!job)
			return callback(new Error('该职位已经不存在！！'));
		
		job.remove();
		callback(null,"删除成功！");

	});
}