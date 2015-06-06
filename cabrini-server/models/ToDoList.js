var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDoListSchema = new Schema({
  _id : Number,
  title: String,
  items : [{ type: Schema.Types.ObjectId, ref: 'ToDoListItem' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var ToDoList = mongoose.model('ToDoList', ToDoListSchema);
module.exports = ToDoList;