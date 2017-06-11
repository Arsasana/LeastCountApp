var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameDetails = mongoose.model('gameDetails', new Schema({
	gameName : String,
	winner : String,
	winningScore : {type:Number},
	createdTime : String,
	activeFlag :  {type:Number},
	playerDetails : [{name : String,fullCount : {type:Number},showCount : {type:Number}}]
	
}));

module.exports = GameDetails;