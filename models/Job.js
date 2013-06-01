var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var JobSchema = new Schema({
	title: { type: String, index: true },//标题信息
	author_id:{type: ObjectId},

	position: { type: String},//职位名称
	company:{type:String},//公司名称
	requirements:{type:String},//岗位需求
	
	number:{ type: Number, default: 0 },//招收人数
	click_count:{ type: Number, default: 0 },//点击数
	ask_count:{ type: Number, default: 0 },//申请数量
	coment_count:{ type: Number, default: 0 },//申请数量

	create_at: { type: Date, default: Date.now },
  	update_at: { type: Date, default: Date.now }

});

mongoose.model('Job', JobSchema);