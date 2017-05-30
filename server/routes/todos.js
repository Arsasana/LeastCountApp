var express = require('express');
var router = express.Router();
var http = require('http');
var requestify = require('requestify');


 var mysql = require("mysql");
 var con = mysql.createConnection({
 // host: "http://172.16.101.186:3306",
  host:"localhost",
  user: "root",
  password: "root",
  database :"users"
});
/* GET All Todos */
router.get('/todos', function(req, res, next) {
   con.query('SELECT * FROM users_usr',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
  res.send(rows);

});

});
 
/* GET One Todo with the provided ID */
/*router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});*/
 
 //creating a table 
 router.post('/tableCreate',function(req,res,next){
     var tableName = req.body.tableName;
     var query = "CREATE TABLE users(users_id INT NOT NULL AUTO_INCREMENT,users_name VARCHAR(100) NOT NULL,users_role VARCHAR(40) NOT NULL,PRIMARY KEY (users_id)";

      con.connect(function(err){
                 if(err){
                             console.log('Error connecting to Db',err);
                             return;
                          }else{
                 console.log('Connection established');

    con.query(query, function(err,res){
  if(err) throw err;

  console.log('Table Created');
});
  
  }
 
});
 });
/* POST/SAVE a Todo */
router.post('/todo', function(req, res, next) {
    
    var todo = req.body;
    var user = req.body.name;
    var role = req.body.role;
           console.log('user***********',user);
    console.log('role___________',role);
    console.log('whole objet',todo);
   // console.log('requst isssssssssssss',req);
    if(!todo.name){
        res.status(400);
        res.json({"error":"Bad Request"})
    }else{
   
   // var id= req.body.id;
    var usrInfo = {
        usr_name:user,
        usr_role:role
       // id:id
    }

    con.query('INSERT INTO users_usr SET ?', usrInfo, function(err,result){
  if(err) throw err;

  console.log('Last insert ID:', result.insertId);
  res.send('Row Inserted');
});
  
    }
  
  
 


    
});
 

 //sample url testing code
/* var externalServerOptions = {
     host:"https://jsonplaceholder.typicode.com",
     path:"/posts",
     method:"GET"
 }*/
 router.get('/timeZone',function(req,res){
/*http.request(externalServerOptions,function(result){
      result.setEncoding('utf8');
        result.on('data', function (data) {
            emp = JSON.parse(data);
           
        });
 
    }).end();*/

requestify.get('https://jsonplaceholder.typicode.com/posts').then(function(response) {
    // Get the response body
    response.getBody();
    res.send(response.body);
});
 });

 
module.exports = router;    