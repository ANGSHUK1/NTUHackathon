const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const api = require('./api/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

app.get("*", function(req, res){
  console.log("todo: send index html");
  res.send("soon you get tour page");
  //res.sendFile()
});

app.listen(port, function () {
    console.log("listening on port", port);
});
