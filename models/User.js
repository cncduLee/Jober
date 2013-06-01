var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	
	email: { type: String, unique: true,index: true },
	password:{type:String},

	name:{type: String, unique: true,index: true },
	avatar_url:{type: String, unique: true},
	
	create_at: { type: Date, default: Date.now },
  	update_at: { type: Date, default: Date.now },
});

mongoose.model('User', UserSchema);