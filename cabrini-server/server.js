var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var ToDoList = require('./models/ToDoList');
var ToDoListItem = require('./models/ToDoListItem');
mongoose.connect('mongodb://localhost/test');
 
 User.remove({}, function(err) { 
   console.log('collection removed') ;
   
   
   
});

var newUser = User({
  name: 'Peter Quill',
  username: 'starlord5ss5',
  password: 'password',
  email: 'test@gmail.com',
  admin: true
});
var newUserTwo = User({
  name: 'Mike chang',
  username: 'starlord553244',
  password: 'password',
  email: 'test2@gmail.com',
  admin: true
});


newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});
newUserTwo.save(function(err) {
  if (err) throw err;

  console.log('User created2!');
});

/*
var toDoList = new ToDoList({ _id: 0, title: 'Test to-do List', age: 100 });
toDoList.save(function (err) {
  if (err) throw err;
  
 var toDoListItem = new ToDoListItem({_todo_list_id: toDoList._id, text: 'Get your birth certificate'});
  
  toDoListItem.save(function (err) {
    if (err) throw err;
  });
  
  toDoList.items.push(toDoListItem);
toDoList.save();
});
*/

var port = process.env.PORT || 1337;

app.use(bodyParser.json());

app.get('/', function (req, res) {
 
/*	
	// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  res.send(users);
});
*/
ToDoList.find({}).populate('items').exec(function (err, toDoList) {
  if (err) throw err;
  res.send(toDoList);
});



});

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);

});
