var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  languages: [String],
  country: String,
  immigration_interests : [String],
  org_id: String,
  created_at: Date,
  updated_at: Date
});


var User = mongoose.model('User', userSchema);
module.exports = User;