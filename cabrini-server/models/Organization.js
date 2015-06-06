var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var organizationSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  languages: [String],
  countries: [String],
  immigration_interests : [{ type: Schema.Types.ObjectId, ref: 'ImmigrationInterest' }],
  x: Number,
  y: Number,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});


var Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;