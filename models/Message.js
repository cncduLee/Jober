var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
	  
	  type: { type: String ,default:'user'},//用户消息'user'，系统消息--'sys'
	  master_id: { type: ObjectId, index: true },//处理人消息的人
	  author_id: { type: ObjectId },//发送消息的人
	  content:{type:String},

	  has_read: { type: Boolean, default: false },//是否已经处理
	  create_at: { type: Date, default: Date.now }
});

mongoose.model('Message', MessageSchema);