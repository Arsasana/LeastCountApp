var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = mongoose.model('game', new Schema({
	gameName : String,
	playersCount : {type:Number},
	gameScore : {type:Number},
	isActive : {type:Boolean , default:true},
	winner : {type:String, default:null},
	players :[],
	gameOwner : String,
	circle : String
	
}));

module.exports = Game;