var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

//Only get unassigned todo List of Org
router.get('/organization/list/:id', function (req, res) {
  var orgID = req.param("id");
  Task.find({
    $and: [
      { org_id: orgID },
      { user_id: { $exists: false } }
    ]
  }, function (err, tasks) {
      if (err) throw err;
      res.send(JSON.stringify(tasks));
    });

});

router.get('/user/list/:id', function (req, res) {

  var userID = req.param("id");
  Task.find({ user_id: userID }, function (err, tasks) {
    if (err) throw err;
    res.send(JSON.stringify(tasks));
  });


});

router.post('/:taskID/step/:stepID/todo/:todoID/:completed', function (req, res) {
  var taskID = req.param("taskID");
  var stepID = req.param("stepID");
  var todoID = req.param("todoID");
  var completed = req.param("completed");

  Task.findOne({ _id: taskID }, function (err, task) {
    if (err) throw err;
    var steps = task.steps.id(stepID);
    var todoItem = steps.to_do_items.id(todoID);
    todoItem.completed = completed;
    task.save(function (err) {
      if (err) throw err;
      res.sendStatus(200);
    });

  });

});


router.post('/create', function (req, res) {
  var TaskData = req.body;
  var newTask = Task(TaskData);
  newTask.save(function (err) {
    if (err) throw err;
    res.send(JSON.stringify(newTask));
  });

  console.log(TaskData);
});

router.post('/assign/:taskID/:userID', function (req, res) {
  var userID = req.param("userID");
  var taskID = req.param("taskID");
  Task.findOne({
    _id: taskID
  }, function (err, taskTemplate) {
      if (taskTemplate) {
        var copyTemplate = Task(objectIdDel(JSON.parse(JSON.stringify(taskTemplate))));
        copyTemplate.user_id = userID;
        copyTemplate.save(function (err) {
          if (err) throw err;
          res.send(JSON.stringify(copyTemplate));
        });

      }
      else {
        res.sendStatus(404);
      }

    });
});


var objectIdDel = function (copiedObjectWithId) {
  if (copiedObjectWithId != null && typeof (copiedObjectWithId) != 'string' &&
    typeof (copiedObjectWithId) != 'number' && typeof (copiedObjectWithId) != 'boolean') {
    //for array length is defined however for objects length is undefined
    if (!copiedObjectWithId.length) {
      delete copiedObjectWithId._id;
      for (var key in copiedObjectWithId) {
        objectIdDel(copiedObjectWithId[key]); //recursive del calls on object elements
      }
    }
    else {
      for (var i = 0; i < copiedObjectWithId.length; i++) {
        objectIdDel(copiedObjectWithId[i]);  //recursive del calls on array elements
      }
    }
  }
  return copiedObjectWithId;
}
module.exports = router;
