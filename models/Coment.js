var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ComentSchema = new Schema({
	content: { type: String },
	job_id: { type: ObjectId, index: true },

	author_id: { type: ObjectId },//评论人
	reply_id : { type: ObjectId },//评论会复ID

	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now },
	content_is_html: { type: Boolean }//是否是html
});

mongoose.model('Coment', ComentSchema);