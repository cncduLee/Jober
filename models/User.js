var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	
	email: { type: String, unique: true,index: true },
	password:{type:String},

	name:{type: String, unique: true,index: true },
	
	avatar_url:{type: String},//自定义头像,缺省使用email头像
	is_avatar:{type:Boolean, default:false},//判断是否自定义头像
	
	create_at: { type: Date, default: Date.now },
  	update_at: { type: Date, default: Date.now },

  	following_count:{type:Number,default:0},//粉丝数
  	followed_count:{type:Number,default:0}//偶像数
  	
});

mongoose.model('User', UserSchema);