const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const config = require('./config');
const user   = require('./src/models/User');
const game   = require('./src/models/Game');
const circle   = require('./src/models/Circle');
const multer = require('multer');


const app = express();

const db = mongoose.connect(config.database);

let filename ;
let src;
let destDir; 

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const routes = express.Router();

 let storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './src/assets/profilePictures/');
        },
        filename: function (req, file, cb) {
            let datetimestamp = Date.now();
			let fileName = file.originalname.substring(0,file.originalname.lastIndexOf('.'));
            cb(null, fileName + '_' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

let upload = multer({ //multer settings
                    storage: storage
                }).single('file');

				
function copyFile(src, dest) {

  let readStream = fs.createReadStream(src);

  readStream.once('error', (err) => {
    console.log(err);
  });

  readStream.once('end', () => {
    console.log('done copying');
  });

  readStream.pipe(fs.createWriteStream(dest));
}
				
routes.get('/test', function (req, res) {
  res.send('Our Sample API is up...');
});

routes.post('/user/register',function(req,res){
  var host = req.body.host;
  var newUser = new user({
    firstName : req.body.user.firstname,
    lastName : req.body.user.lastname,
    email : req.body.user.email,
    password : req.body.user.password,
    phone : req.body.user.phone,
	profilePic : req.body.user.profilePic
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
      res.json({success:true, message : 'User had been registered successfully. Please wait while we redirect you to login'});
    }
  });
});

//authenticate a user
routes.post('/user/login',function(req,res){
  console.log(req.body.user);
  user.findOne({
    email : req.body.user.email,
    'isActive':true
  },function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success:false,message : 'Authentication failed! User not found'});
    }else if(user){

      // check if password matches
      console.log(user);
      console.log(user.email);
      if(user.password != req.body.user.password){
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

routes.post('/user/updateUser/:userId',function(req,res){
  console.log(req.body.user.profilePic);
  user.findOneAndUpdate(
    {_id : req.params.userId},
    {$set:{profilePic : req.body.user.profilePic}, updatedTime : Date.now()},
    {upsert:false, new:true},
    function(err,obj) {
      if(err) {
        throw err;
      }else{
        res.json({success:true,message : 'Game successfully saved',obj:obj});
      }
    });
});

routes.post('/upload', function(req, res) {
        upload(req,res,function(err){
            console.log(req.file);
			this.filename = req.file.filename;
			
			this.src = path.join(__dirname, 'src/assets/profilePictures/'+this.filename);
			this.destDir = path.join(__dirname, 'dist/assets/profilePictures');
			let destination = path.join(__dirname, 'dist/assets/profilePictures/'+this.filename);
			console.log(this.src);
			console.log(this.destDir);
			fs.access(this.destDir, (err) => {
				  if(err)
					fs.mkdirSync(this.destDir);

				  copyFile(this.src, destination);
			});
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
				 res.json({success:true,message:"image uploaded successfully", file : req.file});
			
             
        });
    });


routes.post('/game/createGame',function(req,res){

  var newGame = new game({
    gameName : req.body.game.gamename,
    playersCount : req.body.game.playersCount,
    gameScore : req.body.game.gamescore,
    gameOwner :  req.body.game.gameOwner,
    circle :  req.body.game.circle,
    players :req.body.game.players,
    //createdTime : new Timestamp()
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
      res.json({success:true, message : 'game created successfully', obj:newGame});
    }
  });

});

//to save a game
routes.post('/game/saveGame/:gameId',function(req,res){
  console.log(req.body.game.players);
  game.findOneAndUpdate(
    {_id : req.params.gameId},
    {$set:{winner : req.body.game.winner, players: req.body.game.players}},
    {upsert:false, new:true},
    function(err,game) {
      if(err) {
        throw err;
      }else{
        res.json({success:true,message : 'Game successfully saved',obj:game});
      }
    });
});

//to create circle
routes.post('/user/create/circle',function(req,res){
  // var host = req.body.host;
  console.log(req.body);
  var email = req.body.user.email;
  //var circle = {name: String,members : [],isActive : {type:Boolean, default: true},membersCount: Number };
  //var	circles = [{name : String,members : [] ,isActive : {type:Boolean}}];
  var circle = req.body.user.circle;

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
      var circles = foundObj.circles;
      for(i=0;i < circles.length ;i++){

        if(circle.name === circles[i].name)
        {

          return 	res.json({success:false, message : 'Circle name already exist'});
        }
      }
      foundObj.circles.push(circle);
      //foundObj.circles.push({name:circle.name,members:circle.members,membersCount:circle.membersCount,isActive:true});

      //foundObj.circles += circle;
      foundObj.save(function(err,updateObj){

        if(err){
          console.log('Error Inserting New Data while saving object');
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

//to edit a circle
routes.post('/user/edit/circle/:email',function(req,res){
  user.find({"email":req.params.email},function(err,userDoc){
    if(err) throw err;
    if(!userDoc){
      res.json({success:false,message:'User with email : '+req.params.email+' could not be found'});
    }else{
      console.log(userDoc);
      console.log(req.body.user.circle);
      user.findOneAndUpdate(
        {"email":req.params.email,"circles._id":req.body.user.circle._id},
        {$set : {"circles.$" : req.body.user.circle},
          updatedTime : Date.now()},
        {upsert:false,new:true},
        function(err,doc){
          if(err) throw err;
          return res.json({success:true,message:'circle updated successfully',doc:doc});
        }
      );
    }
  });
});

//to delete a circle
routes.post('/user/delete/circle/:email',function(req,res){
  user.find({"email":req.params.email},function(err,userDoc){
    if(err) throw err;
    if(!userDoc){
      res.json({success:false,message:'User with email : '+req.params.email+' could not be found'});
    }else{
      console.log(userDoc);
      console.log(req.body.user.circle);
      user.findOneAndUpdate(
        {"email":req.params.email,"circles._id":req.body.user.circle._id},
        {$pull : {circles : {_id:req.body.user.circle._id}},
          updatedTime : Date.now()},
        {upsert:false,new:true},
        function(err,doc){
          if(err) throw err;
          return res.json({success:true,message:'circle updated successfully',doc:doc});
        }
      );
    }
  });
});



//to update showGameRulesMsg field in user object
routes.post('/user/updateGameMsgOption/:userId',function(req,res){
	console.log(req.body);
  user.findOneAndUpdate(
    {_id : req.params.userId},
    {$set:{showGameRulesMsg : req.body.value.value}},
    {upsert:false, new:true},
    function(err,user) {
      if(err) {
        throw err;
      }else{
        res.json({success:true,message : 'user showGameRulesMsg udpated successfully',obj:user});
      }
    });
});


//to update user stats such as no of games, total full counts till date, total show counts till date only for registered users.
routes.post('/user/updateUserStats',function(req,res){
  var playersStats = req.body.playersStats;
  console.log(playersStats);
  var playerIds = [];
  var count = 0;
  var updatedObj;
  for(let i = 0; i < playersStats.length; i++ ){
    user.findOne({'_id':playersStats[i].playerId},function(err,Obj){
      if(err)
        throw err;
      if(Obj){
        Obj.stats.games = Obj.stats.games + 1;
        Obj.stats.fullCount = Obj.stats.fullCount + playersStats[i].fullCount;
        Obj.stats.showCount = Obj.stats.showCount + playersStats[i].showCount;
      }

      Obj.save(function(err,updateObj){

        if(err){
          console.log('Error Inserting New Data');
          if (err.name === 'ValidationError') {
            for (field in err.errors) {
              console.log(err.errors[field].message);
              return 	res.json({success:false, message : 'Unable to create User'});
            }
          }
          return 	res.json({success:false, message : 'Unable to update user Stats'});
        }else{
          if ( playersStats[i].gameOwner !== 0 ){
            console.log("inside the playerstats yupdated email game owner");
            updatedObj = updateObj;
          }

          count++;
          console.log(count);
          playerIds.push(playersStats[i].playerId);
          if(count === playersStats.length){
            return 	res.json({success:true, message : 'Successfully updated '+playerIds+' stats', obj: updatedObj });
          }
        }
      });

    });
  }
});


// to search users based on the search term, its will match from the beginning of the email field.
routes.get('/user/search/:term',function(req,res){

  user.find({email: new RegExp('^' + req.params.term )},function(err,obj){
    if(err)
      throw err;
    if(obj){
      console.log(obj);
      let objArr = [];
      for(let i = 0 ; i < obj.length; i++){
        let user = {};
        user.email = obj[i].email;
        user.name = obj[i].firstName+" "+obj[i].lastName;
        user.playerId = obj[i]._id;
		user.profilePic = obj[i].profilePic;
        objArr.push(user);
      }

      return 	res.send(objArr);
    }
  });
});

//to get the user history based on emailId
routes.get('/user/getHistory/:emailId',function(req,res){

  var emailId = req.params.emailId;


  game.find({gameOwner:emailId}).sort({createdTime : -1}).find(function(err,foundObj){

    if(err){
      console.log('Error Inserting New Data');
      if (err.name === 'ValidationError') {
        for (field in err.errors) {
          console.log(err.errors[field].message);

          return 	res.json({success:false, message : 'Unable to get history'});

        }
      }

      return 	res.json({success:false, message : 'Unable to get history'});
    }else{
      if(!foundObj || foundObj.length === 0){
        return 	res.json({success:false, message : 'History not available for this user'});
      }
      return 	res.json({success:true, message : 'History available',resultObj:foundObj});
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
