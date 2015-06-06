var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImmigrationInterestSchema = new Schema({
  interest: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var ImmigrationInterest = mongoose.model('ImmigrationInterest', ImmigrationInterestSchema);
module.exports = ImmigrationInterest;