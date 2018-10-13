const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./api/routes");
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.static(path.join(__dirname, "images")));

app.use(fileUpload());
app.use("/api", api);

app.get("*", function(req, res){
  res.sendFile(path.join(__dirname + "/frontend/home.html"));
});

app.listen(port, function () {
    console.log("listening on port", port);
});
