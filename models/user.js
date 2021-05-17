var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName : { type : String ,required : true},
	lastName : { type : String ,required : true},
	address : { type : String ,required : true},
	contact : {type : Number ,required : true},
	dateOfBirth : { type : Date ,required : true}

}) 

module.exports = mongoose.model('user',UserSchema);