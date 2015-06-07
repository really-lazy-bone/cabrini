var express = require('express');
var router = express.Router();
var User = require('../models/User');


// define the about route
router.post('/', function(req, res) {
  var userData = req.body;
  var newUser = User(userData);
newUser.save(function(err) {
  if (err) throw err;
    delete newUser.password;
     res.send(JSON.stringify(newUser));
});
/*

  name: String,
  username: { type: String, required: true},
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  languages: [String],
  countries: [String],
  immigration_interests : [{ type: Schema.Types.ObjectId, ref: 'ImmigrationInterest' }],
  meta: {
    age: Number,
    website: String
  },

*/ 



});

module.exports = router;