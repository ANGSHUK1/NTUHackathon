var express = require('express');
var router = express.Router();

var users = [{"username": "peter", "password": "mypass"}]
var petAccomodations = [
  {"address": "A street 1", "description": "this is my house and i take care of your pet as good as i can", "lat": "1.343170", "lng": "103.854549"},
  {"address": "B street 2", "description": "this is my house and i take care of your pet as good as i can", "lat": "1.345341", "lng": "103.900033"},
  {"address": "C street 3", "description": "this is my house and i take care of your pet as good as i can", "lat": "1.330583", "lng": "103.875650"},
  {"address": "D street 4", "description": "this is my house and i take care of your pet as good as i can", "lat": "1.368687", "lng": "103.830324"},
  {"address": "E street 5", "description": "this is my house and i take care of your pet as good as i can", "lat": "1.337454", "lng": "103.774018"}
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
      res.setHeader('Set-Cookie', 'auth=yes; Path=/');
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

  console.log("endpoint hit")
  const address = req.body.address;
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const image = req.files.image;

  console.log("add "+address)
  console.log("lat "+lat)
  console.log("lng "+lng)

  if(address == undefined || description == undefined || image == undefined){
    res.json({"status": "invaid input"});
    return;
  }

  var image_name = Math.floor((Math.random() * 99999999) + 1) + image.name;
  image.mv(__dirname + "/../images/" + image_name, function(err){
    if(err){
      return res.status(500).send(err);
    }
    petAccomodations.push({"address": address, "description": description, "url": "http://localhost;3000/images/" + image_name, "lat": lat, "lng": lng});
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
