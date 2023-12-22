# glossary
| Term               | Description                                                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Callback Function  | A function passed into another function as a parameter, which is then invoked inside the outer function to complete an action. Instead of blocking on asynchronous I/O operations, callback functions are used to handle results when the operations complete.                                                                                                       |
| Database Server    | A server dedicated to providing database services.                                                                                                                                                                                                                                                                                                               |
| Dependencies       | Code, usually in the form of libraries and packages, that are called from other modules and reused in a program.                                                                                                                                                                                                                                               |
| Event-Driven       | Where the flow of a program is determined by particular events such as user input.                                                                                                                                                                                                                                                                               |
| Express.js         | A highly configurable web framework for building applications on Node.js.                                                                                                                                                                                                                                                                                         |
| Framework          | Generates code that cannot be altered to perform common tasks. Examples include Django, Ruby on Rails, and Express.js.                                                                                                                                                                                                                                            |
| HTTP Server        | A type of software-based server that understands URLs and hypertext transfer protocol.                                                                                                                                                                                                                                                                             |
| Load               | Refers to the number of concurrent users, the number of transactions, and the amount of data transferred back and forth between the clients and servers.                                                                                                                                                                                                       |
| Module             | Files containing related, encapsulated JavaScript code that serve a specific purpose.                                                                                                                                                                                                                                                                              |
| Multi-Threaded     | Where multiple tasks are executed simultaneously.                                                                                                                                                                                                                                                                                                                |
| Node.js            | A JavaScript runtime environment that runs on Google Chrome’s V8 engine.                                                                                                                                                                                                                                                                                           |
| Non-Blocking       | Failure of a given thread does not cause failure in another, and the execution of a task is not blocked until execution of another task is completed.                                                                                                                                                                                                            |
| Npm                | Stands for node package manager. It is the default package manager for the Node.js runtime environment.                                                                                                                                                                                                                                                          |
| Package            | A directory with one or more modules bundled together.                                                                                                                                                                                                                                                                                                            |
| Package.json       | Contains metadata information about the project, including dependencies and scripts.                                                                                                                                                                                                                                                                              |
| Payload            | The data transmitted between client and server.                                                                                                                                                                                                                                                                                                                  |
| Runtime Environment | Behaves similarly to a mini operating system that provides the resources necessary for an application to run. It is the infrastructure that supports the execution of a codebase. It is the hardware and software environment in which an application gets executed. Node.js is an example of a backend runtime environment.                                         |
| Scalability        | The application’s ability to dynamically handle the load as is or shrinks without it affecting the application’s performance.                                                                                                                                                                                                                                       |
| Server.js          | A file that contains the code that handles server creation.                                                                                                                                                                                                                                                                                                       |
| Single-Threaded    | Where only one command is processed at a given point of time.                                                                                                                                                                                                                                                                                                     |
| Web Server         | Ensures client requests are responded to, often using HTTP.                                                                                                                                                                                                                                                                                                       |
| Web Service        | A type of web API that communicates using HTTP requests. It is the web service in the programming interface that sends and receives requests using HTTP among web servers and the client.                                                                                                                                                                      |

# intro to server side javascript

## Explain the components of the backend of a web application.

- the front end runs on the clients machine and the baceknd runs on a server.
  the client machine runs the web browser and the browser's engine.
- Furthermore, backend development refers to the development of the server-side logic,
  including the code that pertains to databases, servers, and applications.
- Backend technologies include servers, databases, web APIs, programming languages, frameworks
- there are many types of servers
  - data base server houses, retreives and delivers data
  - web servers ensure client request are responded to using http
  - application servers host and a business application through http, they sit between database server and webserver. Application servers transform data into dynamic content and run the business logic, which is the data storage and transfer rules.

## Describe the role of Node.js for server-side scripting.

    - Node.js is a JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
    = express.js is a frmework running on node.js that handless HTTP request
    - Node.js is a JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
    - The backend is responsible for scalability, security, and performance. It is also responsible for the interactions between the client and the server.

## Getting started with Node.js

- Node.js is a JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

### event driven, Asynchronous , Non-blocking, Single threaded

- process can be single or multi threaded, node.js is single threaded but this is fine because the program doesnt have to wat until a process finishes
- node.js is event-driven, when it performan an operation like reading from anetwork or accessing a database, instead of waiting for the operation to complete, it registers a callback function and continues to execute the rest of the program. When the operation completes, the callback function is called with the result which is then processed by the program.

# JSON payloads

- json payloads are trransmitted between the client asn the server

```json
{
  "name": "John",
  "age": "24",
  "email": "johnparker@gmail.com"
}
```

the above is an example of a json payload, when the data is sent as a request, thr values can be extracted with **request.name, request.age, request.email**

the response is also sent as a JSONN

```json
{
  "status": "ok",
  "message": "user created successfully"
}
```

# express.js framweork

## features allow you to develop application quickly

- public assets like images, css, and javascript files can be served
- templates/views server-rendered html that is sent to the client in response to requests
- routes: defines endpoints that accept and process client requests
- server.js contains the main application code
- package.json contains the dependencies and scripts

# modules

- modules can be a single file r collection of multiple files and folders
- when an external app wants to use a module, it must import it or require

## import or require

- there are two main types of module specifications, CommonJS and ES modules
- by default, node.js uses CommonJS modules
- CommonJS modules are imported using the require() function
- ES modules are imported using the import keyword
- when a module is needed outtside of its current directory it must be exported first
- the module.exports object is used to export a module

## differnece between export and require

- require can be called anywhere in the module
- import must be called at the beginning of the module
- reqiure statement is bound dynamically while import is bounded statically
- require modules are synchronous
  - modules are imported ina linear fashion one at a time
- import modules are asynchronous
  - asynchrnous means the modules can be processed simultanoeously
- import runs fasrer compared to require in large scale applications which incolve loading hundreds of modules

### require()

```javascript
// export from a file called message.js
module.exports = 'Hello World';
---------------------------
// import frm the message.js file
let msg = require('./message');
console.log(msg);
```

### import()

```javascript
// export from a file called module.mjs
const a  = 1;
export { a as "myvalue" };
---------------------------
// import fromm the module.mjs file
import { myvalue } from './module.mjs';
console.log(myvalue);
```

# how to run a simple server

```javascript
http = require("http");
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
```

## advanced node modules

This section will descrive the three types ofNode.js modules

- **core modules**: forms the minimal library, the minimum functionality needed to develop Node.js apps
- **local modules**: modules that are created locally and are not part of the core modules
- **third party modules**: these are created by Node.js community, they are "copyleft" which means a developr can use the code but they are required to share the code with the community

## most important core modules

- http, path, fs, os, util, url and querystring

### http allows us to transfer data over the HyperText Transfer Protocol (HTTP)

```javascript
//creates an instance of a server usig the http module
let http = require("http");
http
  .createServer(function (req, res) {
    res.write("hello from server"); //write a response to the client
    res.end(); //end of response from server
  })
  .listen(6000); //the server instance listens for http requests on port 6000
```

### **FS** allows uyouro interact with a file system
```javascript
// sample code to read a file synchronously using the fs.readFile() method
const fs = require('fs');
const data = fs.readFile('sample.txt', 'utf8');
// print contents of the file "sample.txt" to console
console.log(data);
```
it also can be ued for input and output
```javascript
const fs = require(‘fs’);
fs.writeFileSync(‘/content.md’, ‘Hello World’); //writes Hello World to the content.md file
const data = fs.readFileSync(‘/content.md’); // blocks here until file is read
console.log(data);//writes data in the content.md file to the console
```
### **os** allows you ti retreive things from the operating system
```javascript
const os = require('os');
console.log(os.platform()); //prints the platform of the operating system
console.log(os.arch()); //prints the architecture of the operating system
```
### **the path module** allows you to interact with the file system
```javascript
    const path = require('path');
    let result = path.basename('/content/index/home.html');
    console.log(result); //outputs home.html to the console
``````

### the **util** modules is used for debugging and deprecating functions and objects
```javascript
let util = require('util');
let str = 'The loop has executed %d time(s).';
for (let i = 1; i <= 10; i++) {
    console.log(util.format(str, i)); //outputs 'The loop has executed i time(s)'
}
```

### the **url** module is used to parse url strings
```javascript
const url = require('url');
let webAddress = 'http://localhost:2000/index.html?lastName=Kent&firstName=Clark';
let qry = url.parse(webAddress, true);
let qrydata = qry.query; //returns an object: {lastName: 'Kent', firstName: 'Clark'}
console.log(qrydata.firstName); //outputs Clark
```
### the **querystring** module is used to parse query strings
```javascript
let qry = require('querystring');
let qryParams = qry.parse('lastName=Kent&firstName=Clark');
console.log(qryParams.firstName); //returns Clark
```

# how to ping a local server
first create the server
```javascript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port: ' + port);
server.listen(8080);
```
then ping the server
```bash
curl localhost:8080
```
the output should be 
```bash
Hello, World!
```

## creatin a module then requiring it

```javascript
module.exports.getDate = function getDate() {
    let aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
    return new Date(aestTime);
}
```
then require it
```javascript
const http = require('http');
const today = require('./today');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(`Hello, World! The date today is ${today.getDate()}`);
}

const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port: ' + port);
server.listen(port);
```
# Summary

Congratulations! You have completed this module. At this point in the course, you know: 

    Backend technologies include various types of servers and supporting infrastructures such as programming languages, frameworks, and other hardware. 
    Node.js is the server-side component of JavaScript. 
    The require statement can be called from anywhere in the app code, is bound dynamically, and is synchronous, whereas the import statement can only be called at the beginning of a file, is bound statically, and is asynchronous. 
    Client-side JavaScript is used to process front-end user interface elements, and server-side JavaScript is used to enable access to different kinds of servers and web applications. 
    With server-side JavaScript, Node.js applications process and route web service requests from the client. 
    To make a function or a value available to Node.js applications that import your module, add a property to the implicit exports object. 
    Core modules include bare minimum functionality, local modules are those that you create for your application, and the Node.js community creates third-party modules. 
    A local install means only the application within the directory of the installed can access the package, whereas a global install means that any application on the machine can access the package.