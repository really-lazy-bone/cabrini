var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ToDoItemSchema = new Schema({
  name: String,
  completed: {type: Boolean, default: false},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var StepSchema = new Schema({
  name: String,
  to_do_items: [ToDoItemSchema],
  comment: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var TaskSchema = new Schema({
  category: String,
  steps: [StepSchema],
  org_id: Number,
  user_id: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});





var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;