var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
var $ = require('jquery');
var path = require('path');
app.get('/',function(req,res){
  //res.sendfile(path.resolve(__dirname, 'public/idea.html'));
   res.render("idea");
  //__dirname : It will resolve to your project folder.
});
app.get('/to-do-list',function(req,res){
   res.render("toDo");
  //res.sendfile(path.resolve(__dirname, 'public/toDo.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/rgb-game',function(req,res){
  res.render("RGBGame");
  
  //res.sendfile(path.resolve(__dirname, 'public/RGBGame.html'));
  
});
app.get('/about',function(req,res){
  res.render("bibliography");
  
  //res.sendfile(path.resolve(__dirname, 'public/RGBGame.html'));
  
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server ready!");
});