var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var ResumeSchema = new Schema({

	
	title: { type: String, index: true },//简历名称
	content:{type:String},//正文
	author_from:{type:ObjectId},//求职者
	author_to:{type:ObjectId},//职位提供者
	job_id:{type:ObjectId},//职位
	type:{type:String,default:'on'},//类型，离线(off)|或者|在线(on)

	//========离线========//
	resume_file:{type:String},//简历文件

	//========在线========//
	name:{type:String},//姓名
	email:{type:String},//邮箱
	phoneNo:{type:String},//电话号码
	work_years:{type:Number,default:0},//工作年限
	work_history:{type:String},//工作经历
	edu_backend:{type:String},//学历
	
	//....
	create_at: { type: Date, default: Date.now },
  	update_at: { type: Date, default: Date.now },
});

mongoose.model('Resume', ResumeSchema);