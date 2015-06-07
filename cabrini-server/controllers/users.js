var express = require('express');
var router = express.Router();


// define the about route
router.get('/', function(req, res) {
  res.send('Test');
});

module.exports = router;