var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

//Only get unassigned todo List of Org
router.get('/organization/list/:id', function (req, res) {
  var orgID = req.param("id");
  Task.find({
    $and: [
      { org_id: orgID },
      { user_id: {$exists: false} }
    ]
  }, function (err, tasks) {
      if (err) throw err;
      res.send(JSON.stringify(tasks));
    });

});

router.get('/user/list:id', function (req, res) {

  var userID = req.param("id");
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

router.post('/assign/:taskID/:userID', function (req, res) {
  var userID =  req.param("userID");
  var taskID = req.param("taskID");
  Task.findOne({
    _id: taskID
  }, function (err, taskTemplate) {
      if (taskTemplate) {
        objectIdDel(JSON.parse(JSON.stringify(taskTemplate)));
        taskTemplate.user_id = userID;
        taskTemplate.save(function (err) {
          if (err) throw err;
          res.send(JSON.stringify(taskTemplate));
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