var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

router.get('/organizaton/list/:id', function (req, res) {

  var orgID = Number(req.param("id"));
  Task.find({ org_id: orgID }, function (err, tasks) {
    if (err) throw err;
    res.send(JSON.stringify(tasks));
  });

});

router.get('/user/list:id', function (req, res) {

 var userID = Number(req.param("id"));
  Task.find({ user_id: userID }, function (err, tasks) {
    if (err) throw err;
    res.send(JSON.stringify(tasks));
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

router.post('/assign:taskID/:userID', function (req, res) {
  var userID = Number(req.param("userID"));
  var taskID = Number(req.param("taskID"));
  Task.findOne({
    _id: taskID
  }, function (err, taskTemplate) {
      if (taskTemplate) {
        var duplicatedTask = objectIdDel(JSON.parse(JSON.stringify(taskTemplate)));
        duplicatedTask.user_id = userID;
        duplicatedTask.save(function (err) {
          if (err) throw err;
          res.send(JSON.stringify(duplicatedTask));
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
    if (typeof (copiedObjectWithId.length) == 'undefined') {
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
}
module.exports = router;