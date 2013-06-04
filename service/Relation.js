var models = require('../models');
var Relation = models.Relation;
var UserDao = require('./User');

/**
 * 查找关注关系
 * @param {ID} userId 被关注人的id
 * @param {ID} followId 关注人的id
 */
exports.getRelation = function (userId, followId, callback) {
  Relation.findOne({user_id: userId, follow_id: followId}, callback);
};

/**
 * 根据用户查找用户的偶像们【用户是follow】
 * @param {ID} followId 关注人的id
 */
exports.getRelationsByUserId = function (followId, callback) {
  Relation.find({follow_id: followId}, callback);
};

/**
 * 根据用户查找粉丝们【用户是user,被follow】
 * @param {ID} userId 被关注人的id
 */
exports.getFollowings = function (userId, callback) {
  Relation.find({user_id: userId}, callback);
};


/**
 * 根据用户查找粉丝数量,,,,我是被关注的人
 * @param {ID} userId 被关注人的id
 */
exports.getFollowingsCount = function(userId,callback){
	Relation.count({user_id: userId}, callback);	
};

/**
 * 根据用户查找偶像数量，，，我是关注的人
 * @param {ID} userId 被关注人的id
 */
exports.getFollowedCount = function(followId,callback){
	Relation.count({follow_id: followId}, callback);	
};



/**
 * 创建新的关注关系
 * @param {ID} userId 被关注人的id
 * @param {ID} followId 关注人的id
 */
exports.newAndSave = function (userId, followId, callback) {
  var relation = new Relation();
  relation.user_id = userId;
  relation.follow_id = followId;
  //relation.save(callback);
  //跟新用户数据
  UserDao.updateFollowingCount(userId,function(err,user){
  	if(!err){
  		UserDao.updateFollowedCount( followId, function(err,user){
  			if(!err){
  				relation.save(callback);
  			}
  		});
  	}
  });
};

/**
 * 删除的关注关系
 * @param {ID} userId 被关注人的id
 * @param {ID} followId 关注人的id
 */
exports.remove = function (userId, followId, callback) {
  UserDao.descFollowingCount(userId,function(err,user){
    if(!err){
      UserDao.descFollowedCount( followId, function(err,user){
        if(!err){
          Relation.remove({user_id: userId, follow_id: followId}, callback);
        }
      });
    }
  });
};
