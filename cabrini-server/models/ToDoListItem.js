var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDoListItemSchema = new Schema({
  _todo_list_id: Number,
  text: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var ToDoListItem = mongoose.model('ToDoListItem', ToDoListItemSchema);
module.exports = ToDoListItem;