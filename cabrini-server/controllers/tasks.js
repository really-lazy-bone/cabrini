var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

router.post('/create', function (req, res) {
  var TaskData = req.body;
  var newTask = Task(TaskData);
   newTask.save(function (err) {
    if (err) throw err;
    res.send(JSON.stringify(newTask));
  });
 
 console.log(TaskData);
});
module.exports = router;