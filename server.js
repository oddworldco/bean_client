var Bean = require('ble-bean');
var beanStream = require('ble-bean-stream');
var express = require('express');
var path = require('path');
var app = express();
var json = new require('stream').Transform({objectMode: true});
var WebSocket = require('ws');
var fs = require('fs');

Bean.discover((bean) => {
  // TO DO: ADD TIMESTAMP
	console.log('bean found');
  // Transform stream that formats data as JSON strings
  json._transform = (chunk, encoding, callback) => {
    json.push(JSON.stringify(chunk) + '\r\n');
    callback();
  }

  // Start Bean streaming
  // NOTE: The Readable stream will call bean.connectAndSetup()
  let beanReadable = beanStream.createReadStream(bean, {
    poll: 5000, // Interval in millis
    pollTemp: true
  });

  beanReadable.pipe(json).pipe(process.stdout);

});

// Serve up static files
app.use(express.static(__dirname + '/web'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/index.html'));
});

// Start Server
app.listen(process.env.PORT || 4205, function() {
	console.log('Server: Running on port: 4205');
});
