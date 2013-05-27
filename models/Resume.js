var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var ResumeSchema = new Schema({
	name: { type: String, index: true },//简历名称
	author_id:{type:ObjectId},

	type:{type:String},//类型
	introduce:{type:String},//简介
	doc_url:{type:String},//简历文件
	
	//...
	realname:{type:String},
	email:{type:String},
	//....
	create_at: { type: Date, default: Date.now },
  	update_at: { type: Date, default: Date.now },
});

mongoose.model('Resume', ResumeSchema);