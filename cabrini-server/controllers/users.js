var express = require('express');
var router = express.Router();
var User = require('../models/User');

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
  var user;
  User.findOne({
    email: userToCheck
  }, function (err, existingUser) {
      if (existingUser.password === userToCheck.password) {
        user = existingUser;
      }

    });
  if (user) {
    res.send(JSON.stringify(user));

  }
  else {
    res.sendStatus(403);

  }
});
module.exports = router;