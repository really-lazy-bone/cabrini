var express = require('express');
var router = express.Router();
var User = require('../models/User');
var matching = require('../models/matching');

router.post('/signup', function (req, res) {
  var userData = req.body;
  var newUser = User(userData);
  newUser.save(function (err) {
    if (err) throw err;
    delete newUser.password;
    res.send(JSON.stringify(newUser));
  });

});

router.post('/signin', function (req, res) {
  var userData = req.body;
  var userToCheck = User(userData);
  User.findOne({
    email: userToCheck.email
  }, function (err, existingUser) {
      if (existingUser) {
        console.log(existingUser.password);
        console.log(userToCheck.password);
        if (existingUser.password == userToCheck.password) {

          res.send(JSON.stringify(existingUser));
        }
        else {
          res.sendStatus(403);
        }

      }
      else {
        res.sendStatus(403);
      }

    });

});
router.get('/match/:userEmail', function (req, res) {
  var userEmail = req.param("userEmail");
  var matchingOrg = matching.getOrgMatch(userEmail);
  if (matchingOrg) {
    delete matchingOrg.rank;
    matchingOrg.save(function (err) {
      if (err) throw err;
      res.send(JSON.stringify(matchingOrg));
    });

  }
  else {
    res.sendStatus(404);

  }


});
module.exports = router;