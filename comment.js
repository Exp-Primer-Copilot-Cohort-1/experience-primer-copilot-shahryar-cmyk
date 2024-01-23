//Create a web server that's going to send a response of big image (bigger then 3MB) to any client that sends a request to your specified server:port. Use the best way for performance. (Try to solve this in many different ways and inspect the loading time in the browser and send many requests at the same time to observe performance differences, hint: use the Developer Tools, Network tab)


var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(req, res) {
    var filePath = path.join(__dirname, 'bigFile.txt');
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}).listen(3000); 