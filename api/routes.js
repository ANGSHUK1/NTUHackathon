var express = require('express');
var router = express.Router();

var users = [{"username": "peter", "password": "mypass"}]
var petAccomodations = []

// LOGIN FUNCTIONALITY
router.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if(!isValidUsernamePass(username, password)){
    res.status(404);
    res.json({"status": "invalid username or password"});
    return;
  }

  for(var i = 0; i <= users.length; i++){
    if(users[i] != undefined && users[i].username == username && users[i].password == password){
      console.log("successfull login");
      res.json({"username": username})
      return;
    }
  }
  console.log("login failed")
  res.status(404);
  res.end();
});

//REGIS
router.post("/register", function(req, res){
  const username = req.body.username;
  const password = req.body.password;


  if(!isValidUsernamePass(username, password)){
    res.json({"status": "invalid username or password"});
    return;
  }

  var new_user = {"username": username, "password": password}

  users.push(new_user);

  res.setHeader('Content-Type', 'application/json');
  res.json({"status": "register success", "username": username});
});

router.post("/create", function(req, res){
  const address = req.body.address;
  const description = req.body.description;

  if(address == undefined || description == undefined){
    res.json({"status": "invaid input"});
    return;
  }

  petAccomodations.push({"address": address, "description": description});
  res.json({"status": "status success"});
});

router.post("/book", function(req, res){

});

router.post("/fetch", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({"data": petAccomodations});
});

function isValidUsernamePass(username, password){
  return username != undefined && password != undefined;
}
module.exports = router;
