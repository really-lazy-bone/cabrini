var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('./models/Task');


app.use(bodyParser.json());
app.use('/users', require('./controllers/users'));
app.use('/organizations', require('./controllers/organizations'));
app.use('/tasks', require('./controllers/tasks'));

mongoose.connect('mongodb://localhost/test');
 /*
 User.remove({}, function(err) { 
   console.log('collection removed') ;
       
});
*/

// var task = new Task({category: 'i20'});
// var steps = [{name: "Step 1: Create an Applicaiton", comment: "hahahha"}, 
// var steps = new Step({name: "Step 1: Create an Applicaiton", comment: "hahahha"});
// var toDoItems = new ToDoItem({name: "photocopy your passport"});
   
// toDoItem.save(function (err) {
//     if (err) throw err;
//        step.to_do_items.push(toDoItem);
//        step.save(function (err) {
//     if (err) throw err;
//              task.steps.push(step);
//              task.save();
      
//       });
// });  

// toDoItem.save(function (err) {
//     if (err) throw err;
//        step.to_do_items.push(toDoItem);
//        step.save(function (err) {
//     if (err) throw err;
//              task.steps.push(step);
//              task.save();
      
//       });
// });  


var port = process.env.PORT || 1337;



app.get('/', function (req, res) {
 
/*	
	// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  res.send(users);
});
*/
// Task.find({}).populate('steps').exec(function (err, tasks) {
//   if (err) throw err;
  
//   res.send(tasks);
// });

//res.sendfile("maptest.html");

});




var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
