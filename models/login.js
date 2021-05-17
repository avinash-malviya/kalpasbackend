var mongoose = require('mongoose');

var LoginSchema = new mongoose.Schema({

	username:{type:String},
	password:{type:String}
})

module.exports = mongoose.model('userlogin',LoginSchema);