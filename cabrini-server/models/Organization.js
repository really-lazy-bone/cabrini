var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var organizationSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  languages: [String],
  country: String,
  immigration_interests : [String],
  address: String,
  website: String,
  phone_number: Number,
  x: Number,
  y: Number,
  created_at: Date,
  updated_at: Date
});


var Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;