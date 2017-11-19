var express = require('express');
var path = require('path');
var app = express();

// app.get('/', function(request, response) {
//   response.send('Hello World!');
// });

// Serve up static files
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});