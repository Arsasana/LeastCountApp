const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const config = require('./config');
const user   = require('./src/models/User');
console.log(user);

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

routes.post('/register',function(req,res){
	var host = req.body.host;
	var token = uuidV1();
	var newUser = new User({
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
				res.json({success:true, message : 'User had been registered successfully'});
			}
		});
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