var express = require('express');
var router = express.Router();
var User = require('../models/User');
var matching = require('../models/matching');
var Organization = require('../models/Organization');

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
router.get('/match/:userID', function (req, res) {
  var userID = req.param("userID");
  User.findOne({
      _id: userID
    }, function (err, existingUser) {
        if (existingUser) {
          //User already has match
          if (existingUser.org_id) {
            Organization.findOne({
              _id: existingUser.org_id
            }, function (err, existingOrganization) {
                if (existingOrganization) {
                  delete existingOrganization.rank;

                  existingOrganization.save(function (err) {
                    if (err) throw err;
                    res.send(JSON.stringify(existingOrganization));
                  });
                }
              });
          }
          else {
            //Found user, but no match yet. Loop through all orgs, and find best match,
            Organization.find({}, function (err, allOrgs) {
              for (var i = 0; i < allOrgs.length; i++) {
                allOrgs[i].rank = matching.computeDistances(existingUser, allOrgs[i]);
              }
              allOrgs.sort(function (a, b) {
                a.rank - b.rank;
              });
              var matchedOrgnization = allOrgs[allOrgs.length - 1];
              matchedOrgnization.users.push(existingUser._id);
              existingUser.org_id = matchedOrgnization._id;
              existingUser.save(function (err) {
                if (err) throw err;

                delete matchedOrgnization.rank;
                matchedOrgnization.save(function (err) {
                  if (err) throw err;
                  res.send(JSON.stringify(matchedOrgnization));
                });
              });

            });

          }


        }

      });

});
module.exports = router;
