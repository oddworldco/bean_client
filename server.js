var express = require('express');
var path = require('path');
var app = express();
const PORT = process.env.PORT || 5000

// Serve up static files
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start Server
app.listen(PORT);