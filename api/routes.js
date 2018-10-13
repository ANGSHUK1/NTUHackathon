var express = require('express');
var router = express.Router();


var users = [{"username": "peter", "password": "mypass"}]
var petAccomodations = []

router.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  for(var i = 0; i <= users.length; i++){
    if(users[i] != undefined && users[i].username == username && users[i].password == password){
      console.log("successfull login");
      res.json({"username": username})
    }
  }
  console.log("login failed")
  res.send("kk");
});

router.post("/register", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  var new_user = {"username": username, "password": password}

  users.push(new_user);

  res.setHeader('Content-Type', 'application/json');
  res.json({"username": username});
});

router.post("/create", function(req, res){

});

router.post("/book", function(req, res){

});

router.post("/fetch", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send("{name: user1, address: myadress}");
});


module.exports = router;
