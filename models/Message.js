var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
	type: { type: String },
	  master_id: { type: ObjectId, index: true },//处理人
	  author_id: { type: ObjectId },//发送者

	  job_id: { type: ObjectId },//工作
	  has_read: { type: Boolean, default: false },
	  create_at: { type: Date, default: Date.now }
});

mongoose.model('Message', MessageSchema);