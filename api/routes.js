var express = require('express');
var router = express.Router();


router.get("/", function(req, res) {
  res.send("api / endponts works");
});

module.exports = router;
