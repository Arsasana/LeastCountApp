var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('user', new Schema({
  firstName : String,
  lastName : String,
  email : {type:String, unique : true},
  password : String,
  phone : {type:Number},
  profilePic:{type:String},
  stats : {
	  games: {type:Number, default:0},
	  showCount : {type:Number, default:0},
	  fullCount : {type:Number, default:0}
  },
  showGameRulesMsg : {type:Boolean , default: true},
  isActive : {type:Boolean , default:true},
  circles : [
				{ 
					name : String, 
					desc: String,
					members : [],
					isActive : {type:Boolean , default:true}, 
					membersCount: {type: Number}
				}
			],
  createdTime :  { type : Date, default: Date.now },
  updatedTime :  { type : Date, default: Date.now }
}));

module.exports = User;
