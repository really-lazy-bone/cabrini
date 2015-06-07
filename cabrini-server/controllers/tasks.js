var express = require('express');
var router = express.Router();
var Task = require('../models/Task');
var Step = require('../models/Step');
var ToDoItem = require('../models/ToDoItem');

router.post('/create', function (req, res) {
  var TaskData = req.body;
 
 console.log(TaskData);
  // var task = {
  //     category: TaskData.category,  
  //   };
 
 
 
 
  // var newOrganization = Organization(organizationData);
  // newOrganization.save(function (err) {
  //   if (err) throw err;
  //   delete newOrganization.password;
  //   res.send(JSON.stringify(newOrganization));
  // });

});
module.exports = router;