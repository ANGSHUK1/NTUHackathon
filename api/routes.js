var express = require('express');
var router = express.Router();

var users = [{"username": "peter", "password": "mypass"}]
var petAccomodations = [
  {"name": "Bob", "address": "A street 1", "description": "Hi this is Bobs Family, we want to go on vacation somewhere around 01. July to 01. August. Our Dog is nice. Please Contact", "lat": "1.343170", "lng": "103.854549", "url": "http://localhost:3000/images/photo.jpg"},
  {"name": "Charles", "address": "B street 2", "description": "Hi this is Charles Family, we want to go on vacation somewhere around 01. July to 01. August. Our Dog is nice. Please Contact", "lat": "1.345341", "lng": "103.900033", "url": "http://localhost:3000/images/photo2.jpg"},
  {"name": "Trumpy", "address": "C street 3", "description": "Hi this is Trumpys Family, we want to go on vacation somewhere around 01. July to 01. August. Our Dog is nice. Please Contact", "lat": "1.330583", "lng": "103.875650", "url": "http://localhost:3000/images/photo3.jpg"},
  {"name": "Baly", "address": "D street 4", "description": "Hi this is Balys Family, we want to go on vacation somewhere around 01. July to 01. August. Our Dog is nice. Please Contact", "lat": "1.368687", "lng": "103.830324", "url": "http://localhost:3000/images/photo4.jpg"},
  {"name": "Doggi", "address": "E street 5", "description": "Hi this is Doggi Family, we want to go on vacation somewhere around 01. July to 01. August. Our Dog is nice. Please Contact", "lat": "1.337454", "lng": "103.774018", "url": "http://localhost:3000/images/photo2.jpg"}
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


  if(!isValidUsernamePass(username, password)){
    res.json({"status": "invalid username or password"});
    return;
  }

  var new_user = {"username": username, "password": password}

  users.push(new_user);
  res.setHeader('Set-Cookie', 'auth=yes; Path=/');
  res.setHeader('Content-Type', 'application/json');
  res.json({"status": "register success", "username": username});
});


//CREATE NEW ACCOMODATION
router.post("/create", function(req, res){

  console.log("endpoint hit")
  const address = req.body.address;
  const description = req.body.description;
  const name = req.body.name;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const image = req.files.image;

  console.log("add "+address)
  console.log("lat "+lat)
  console.log("lng "+lng)
  console.log("name " + name)

  if(address == undefined || description == undefined || image == undefined){
    res.json({"status": "invaid input"});
    return;
  }

  var image_name = Math.floor((Math.random() * 99999999) + 1) + image.name;
  image.mv(__dirname + "/../images/" + image_name, function(err){
    if(err){
      return res.status(500).send(err);
    }
    petAccomodations.push({"name": name, "address": address, "description": description, "url": "http://localhost:3000/images/" + image_name, "lat": lat, "lng": lng});
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
