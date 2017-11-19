var express = require('express');
var path = require('path');
var app = express();

// Serve up static files
app.use(express.static(__dirname + '../dist'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '../dist/index.html'));
});

// Start Server
app.listen(process.env.PORT || 4205, function() {
	console.log('Server: Running on port: 4205');
});