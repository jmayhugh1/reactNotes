http = require('http');
// with the http Node.js Module you can develop an app that listens to HTP requests on a given port
// and responds with a message to the client
// use the http.createServer function to create an instance of a web sever application
let server = http.createServer(function (request, response) {
  //optional call back function to handle the incoming
  // request message and to send back a response message
  let body = "Hello World";
  // this handles the http requests
  response.writeHead(200, {
    "Content-Length": body.length,
    "Content-Type": "text/plain",
  });
  response.end(body);
});
//this line makes the server listen on port 8080
server.listen(8080);
// to test this server use http://localhost:8080
