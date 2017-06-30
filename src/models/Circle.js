var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Circle = mongoose.model('circle', new Schema({
	
  	name : String, 
	desc: String,
	members : [],
	isActive : {type:Boolean , default:true}, 
	membersCount: {type: Number}
	
}));

module.exports = Circle;
