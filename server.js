var express = require('express');
var path = require('path');
var app = express();
var axios = require('axios');
// var Bean = require('ble-bean');
// var WebSocket = require('ws');

// Serve up static files
app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res) {
	const index = path.join(__dirname, 'dist', 'index.html');
	res.sendFile(index);
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
