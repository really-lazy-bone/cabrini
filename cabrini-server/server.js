var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var Firebase = require('firebase');

var port = process.env.PORT || 1337;

app.use(bodyParser.json());

app.post('/trigger', function (req, res) {
	res.send(200);

	/**
	var ref = new Firebase('augmented-sixth.firebaseIO.com');


	var sensorType = '';

	switch (req.body.stream) {
		case 'ultrasonic-sensor-1':
			sensorType = 'left';
			break;
		case 'ultrasonic-sensor-2':
			sensorType = 'right';
			break;
		case 'ultrasonic-sensor-3':
			sensorType = 'front';
			break;
		case 'potentiometer':
			sensorType = 'back';
			break;
	}

	var random = Math.random() * 100;
	var randomValue = '';

	if (random < 33) {
		randomValue = 'close';
	} else if (random < 66) {
		randomValue = 'middle';
	} else if (random < 100) {
		randomValue = 'far';
	}

	ref.child(sensorType)
		.set(randomValue);
*/		
		
	/**
	 * result:
	 * 	stream = stream name
	 * 	trigger_name
	 * 	trigger_description
	 * 	condition
	 * 	value
	 * 	timestamp
	 */
});

app.get('/', function (req, res) {
  res.send("hello world");
});

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);

});
