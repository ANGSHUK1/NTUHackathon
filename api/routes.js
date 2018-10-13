var express = require('express');
var router = express.Router();

var users = [{"username": "peter", "password": "mypass"}]
var petAccomodations = [
  {"address": "A street 1", "description": "this is my house and i take care of your pet as good as i can"},
  {"address": "B street 2", "description": "this is my house and i take care of your pet as good as i can"},
  {"address": "C street 3", "description": "this is my house and i take care of your pet as good as i can"},
  {"address": "D street 4", "description": "this is my house and i take care of your pet as good as i can"},
  {"address": "E street 5", "description": "this is my house and i take care of your pet as good as i can"}
]

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

//REGISTER
router.post("/register", function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;


  if(!isValidUsernamePass(username, password)){
    res.json({"status": "invalid username or password"});
    return;
  }

  var new_user = {"username": username, "password": password}

  users.push(new_user);

  res.setHeader('Content-Type', 'application/json');
  res.json({"status": "register success", "username": username});
});


//CREATE NEW ACCOMODATION
router.post("/create", function(req, res){
  const address = req.body.address;
  const description = req.body.description;
  const image = req.files.image;


  if(address == undefined || description == undefined){
    res.json({"status": "invaid input"});
    return;
  }

  image.mv(__dirname + "/../images/" + image.name, function(err){
    if(err){
      return res.status(500).send(err);
    }
    petAccomodations.push({"address": address, "description": description, "url": "http://localhost;3000/images/" + image.name});
    res.setHeader("Location", "http://localhost:3000");
    res.status(302);
    res.json({"status": "status success"});
  });
});


//BOOK AN ACCOMODATION FOR YOUR PET
router.post("/book", function(req, res){

});


//FETCH ALL POSSIBLE ACCOMODATIONS
router.post("/fetch", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({"data": petAccomodations});
});

function isValidUsernamePass(username, password){
  return username != undefined && password != undefined;
}
module.exports = router;
