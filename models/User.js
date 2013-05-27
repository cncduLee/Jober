var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	email: { type: String, unique: true,index: true },
	password:{type:String}
});

mongoose.model('User', UserSchema);