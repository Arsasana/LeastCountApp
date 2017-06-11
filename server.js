const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const config = require('./config');
const user   = require('./src/models/User');
const gameDetails   = require('./src/models/GameDetails');

const app = express();

const db = mongoose.connect(config.database);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const routes = express.Router();

routes.get('/test', function (req, res) {
  res.send('Our Sample API is up...');
});

routes.post('/user/register',function(req,res){
	var host = req.body.host;
	// Circles not be created while registration
	var newUser = new user({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		phone : req.body.phone
	});

			newUser.save(function(err){
			 if(err) {
				console.log('Error Inserting New Data');
				if (err.name === 'ValidationError') {
					for (field in err.errors) {
					console.log(err.errors[field].message); 
					}
				}
				if(err.name === 'MongoError' && err.code === 11000){
					console.log("mongo error");
					return res.json({success:false,message:"email already exists"});
				}
			}else{
				res.json({success:true, message : 'User had been registered successfully',resultObj:newUser});
			}
		});
});

// authenticate a user
routes.post('/user/login',function(req,res){
	user.findOne({
	email : req.body.email,
	'isActive':true
	},function(err,user){
		if(err) throw err;
		if(!user){
			res.json({success:false,message : 'Authentication failed! User not found'});
		}else if(user){
			
			 // check if password matches
			 console.log(user);
			 console.log(user.email);
			if(user.password != req.body.password){
			res.json({success:false, message : 'Authentication failed! invalid username and password'});
			}else{
				
				 // if user is found and password is right
				
				
				// return the information including token as JSON
				res.json({
					success:true,
					message : 'user login successfull',
					obj : user
				});
			}
		}
	});
});

// Currently not using
routes.post('/createGame',function(req,res){
	var newGame = new game({
		gameName : req.body.gameName,
		playersCount : req.body.playersCount,
		gameScore : req.body.gameScore,
		players :req.body.players
	});
		
		newGame.save(function(err){
			 if(err) {
				console.log('Error Inserting New Data');
				if (err.name === 'ValidationError') {
					for (field in err.errors) {
					console.log(err.errors[field].message); 
					}
				}
				if(err.name === 'MongoError' && err.code === 11000){
					console.log("mongo error");
					return res.json({success:false,message:"error"});
				}
			}else{
				res.json({success:true, message : 'game created successfully'});
			}
		});
		
});

routes.post('/game/details',function(req,res){
	// var host = req.body.host;
		var playersNames = []
		playersNames = req.body.Names;
		
		return insertGame(req,playersNames,res)
		

	});

	var insertGame = function(req,playerNames,res) {

					 var playerDetailRecs = []
					 for(i=0 ; i < playerNames.length;i++) {
						 
						 playerDetailRecs.push({name:playerNames[i],fullCount:0,showCount:0});
						 
					 }
					 var newGameDetails = new gameDetails ({
							activeFlag : 1,
							gameName : req.body.gameName,
							winningScore : req.body.Score,
							winner : "",
							createdTime :  new Date(),
							playerDetails : playerDetailRecs
						});
							
					 newGameDetails.save(function(err,result){
								 if(err) {
									console.log('Error Inserting New Data');
									if (err.name === 'ValidationError') {
										for (field in err.errors) {
										console.log(err.errors[field].message);
										
										return 	res.json({success:false, message : 'Unable to create game'});
										
										}
									}
									
								return 	res.json({success:false, message : 'Unable to create game'});
								 }else{
									 return res.json({success:true, message : 'Successfully  created game',gameId : result._id});
								 }
								
								 });
					
	};

	routes.post('/game/scorecard',function(req,res){
		// var host = req.body.host;
			var playerDetailScores = req.body.details;
			var gameId = req.body.gameId;
			var winner = req.body.winner;
			
			gameDetails.findOne({_id:gameId},function(err,foundObj){
				
				if(err){
					console.log('Error Inserting New Data');
					if (err.name === 'ValidationError') {
						for (field in err.errors) {
						console.log(err.errors[field].message);
						
						return 	res.json({success:false, message : 'Unable to update score'});
						
						}
					}
					
				return 	res.json({success:false, message : 'Unable to update score'});
				}else{
					foundObj.winner = winner;
					foundObj.playerDetails = playerDetailScores;
					foundObj.save(function(err,updateObj){
						
						if(err){
							console.log('Error Inserting New Data');
							if (err.name === 'ValidationError') {
								for (field in err.errors) {
								console.log(err.errors[field].message);
								
								return 	res.json({success:false, message : 'Unable to update score'});
								
								}
							}
							
						return 	res.json({success:false, message : 'Unable to update score'});
						}else{
							
							return 	res.json({success:true, message : 'Successfully updated score',resultObj :foundObj });
							
							
							
						}
					});
				}
				
				
				
			})
			
		});


	routes.post('/user/create/circle',function(req,res){
		// var host = req.body.host;
			var email = req.body.email;
			var circleDetails = {name: String,members : [String] };
		var	circles = [{name : String,members : [String] ,isActive : {type:Boolean}}];
			circleDetails = req.body.circleDetails;
			
			user.findOne({email:email},function(err,foundObj){
				
				if(err){
					console.log('Error Inserting New Data');
					if (err.name === 'ValidationError') {
						for (field in err.errors) {
						console.log(err.errors[field].message);
						
						return 	res.json({success:false, message : 'Unable to create circle'});
						
						}
					}
					
				return 	res.json({success:false, message : 'Unable to create circle'});
				}else{
					//checking if circle name already exist or not
					circles = foundObj.circles;
					for(i=0;i < circles.length ;i++){
				
					if(circleDetails.name === circles[i].name)
						 {
						
						return 	res.json({success:false, message : 'Circle name already exist'});
						}
						 }
                	  foundObj.circles.push({name:circleDetails.name,members:circleDetails.members,isActive:true});
						 
					 
  
					//foundObj.circles += circleDetails;
					foundObj.save(function(err,updateObj){
						
						if(err){
							console.log('Error Inserting New Data');
							if (err.name === 'ValidationError') {
								for (field in err.errors) {
								console.log(err.errors[field].message);
								
								return 	res.json({success:false, message : 'Unable to create circle'});
								
								}
							}
							
						return 	res.json({success:false, message : 'Unable to create circle'});
						}else{
							
							return 	res.json({success:true, message : 'Successfully created circle',resultObj :foundObj });
							
							
							
						}
					});
				}
				
				
				
			})
			
		});

	
// Set our api routes
app.use('/api/v1.0', routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '5000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));