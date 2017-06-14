var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = mongoose.model('game', new Schema({
	gameName : String,
	playersCount : {type:Number},
	gameScore : {type:Number},
	isActive : {type:Boolean , default:true},
	players :[{
				name : String,
				fullCount: {type: Number, default: 0},
				showCount: {type: Number, default: 0}
			}]
	
}));

module.exports = Game;