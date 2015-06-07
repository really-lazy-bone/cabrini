var express = require('express');
var router = express.Router();
var Organization = require('../models/Organization');




router.post('/signup', function (req, res) {
  var organizationData = req.body;
  var newOrganization = Organization(organizationData);
  newOrganization.save(function (err) {
    if (err) throw err;
    delete newOrganization.password;
    res.send(JSON.stringify(newOrganization));
  });

});

router.post('/signin', function (req, res) {
  var organizationData = req.body;
  var organizationToCheck = Organization(organizationData);
  Organization.findOne({
    email: organizationToCheck.email
  }, function (err, existingOrganization) {
      if (existingOrganization) {
        console.log(existingOrganization.password);
        console.log(organizationToCheck.password);
        if (existingOrganization.password == organizationToCheck.password) {

          res.send(JSON.stringify(existingOrganization));
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

module.exports = router;