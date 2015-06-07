var express = require('express');
var router = express.Router();


// define the about route
router.post('/', function(req, res) {
  var userData = JSON.stringify(req.body);
  console.log(userData);   

});

module.exports = router;