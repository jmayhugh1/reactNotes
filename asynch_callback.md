# Application calls http.request()
1. application makes a call too htpp.request() sends through node.js framework, 
2. the Node.js frmaework sends the HTTP request message to the remote server
3. then the Node.js frmework returns from the http.request() call back to the application, indicating that the request has been sent
4. then the remote server sends a respone back to the Node.js framework 
5. the Node.js starts a callback to handle the response


## example of sending an http request
```javascript
// the options variable inudes at least two variables the hostname of the remote server and a URL that u want to act upon
let options = { 
    host: 'w1.weather.gov',
    path: '/xml/current_obs/KSFO.xml',
};


### handling response events

http.request(options,
function(response){ // when the response is received, the callback function is called
    let buffer = '';
    let result = '';
    // there are two evnts that are emitted by the response object, data and end

    response.on('data', function(chunk){ // when the data event is emitted, the callback function is called
        buffer += chunk;
    });

    response.on('emnd', fucntion(chunk){
        result = buffer;
        console.log(result);
    });

}).end();
```
- the http.request function calls the callback function when the response is received
- the callback function si optional


- in Node.ks the obkect.on() defines an event handler that the framework calls when an event occurs
- the response object emits two events, data and end
- the data event is emitted when a chunk of data is received
- the end event is emitted when the entire response has been received

### handling errors
if the request fails there is an 'error' event followed by the close event

```javascript
let request = http.request(options, function(response){
    // handle response

});
request.on('error', function(e){
    // handle error
    resultCallback(e);
});
request.end();
```
# creating callback functions
- Node.js modules pass  an error object as the first parameter to the callback function
```javascript
// if error is defined the callback function handles the error and cleans up any open network or database connections
function (error, param1, param2, param3){
    if(error){
        // handle error
    }
    else{
        // handle success
    }
}
```
```javascript
// calback with error handling
weather.current(location, function(error, temp_f){
    if (error){
        console.log(error);
    }
    else{
        console.log('It is ' + temp_f + ' degrees F at ' + location);
    }
});
response.end("..."); // this is the last line of the callback function
```

- passing an error object to the callback function
```javascript
exports.current = function(location, resultCallback){
    let options = {
        host: 'w1.weather.gov',
        path: '/xml/current_obs/' + location + '.xml',
    };
    http.request(options, function(response){
        let buffer = '';
        let result = '';
        response.on('data', function(chunk){
            buffer += chunk;
        });
        response.on('end', function(chunk){
            result = buffer;
            let parser = new xml2js.Parser();

            // parseString is an asynchronous function that takes a string and a callback function

            // if error is defined the callback function handles the error and cleans up any open network or database connections
            parser.parseString(result, function(err, result){
                // the callback function checks for an error
                if(err){

                    resultCallback(err);
                }
                else{
                    resultCallback(null, result.current_observation.temp_f[0]);
                }
            });
        });
    }).end();
};
```
- when Node.js applications calls a module in a non-blocking manner, the application must provide a callback function to process the result
- if the main appliccation calls http.request(), it must provide a callback handler to process the http response massage

## another example of callback functins
```javascript
let fs = require('fs');
let myLoggerApi = function (LogMessage, callback){
    fs.writeFile('out.log', LogMessage, callback){
        console.log('Log Message written to file');
    }
}
myLoggerApi('Log this message', function(err){
    if(err){
        console.log('Error writing to log file');
    }
});
```
# Issues with callback functions

- remember the callbacks are functions passed as an argument to another function
- makes sure functions done run unril the callback is called

## callback hell
- inorder for the callback to be called, the function that takes the callback as an argument must be called
- if the function that takes the callback as an argument is called in another function, the callback is called in the other function
```javascript
const make cake = nextStep => {
    mixIngredients(ingredients, () => {
        bakeCake(mixedIngredients, () => {
            nextStep();
        });
    });
};
```
- the nesting of callback function is also known as callback hell, this structure is also known as Inversion of Control (IOC), the execution of code is inverted from the normal flow of execution
- you an mitigae callbacj hell by writing comments, splitting functions, using promises and using async/await

# promises

## what is a promise
- promises are objects reurned by an asynch method
- the state are pending resolved and rejected
- usees: API requests, I/O operatiosn
- when you create a promise the inital state is pending, then can be accepted or rejected

```javascript
let = -= new Promise((resolve, reject) => {
    let a = 1 + 1
    if (a == 2){
        resolve("failed")
    }
    else{
        reject("Fialed")
    }
});
p.then(message) =>{ // ran when resolve is called
    console.log("this is in the then" + message)

}.catch(message) =>{ // ran when reject is called
    console.log("this is in the catch" + message)
}
```

- to make two promses enact sequentially, you can nest the second promise in the first promise
```javascript
let promise1 = new Promise((resolve, reject) => {
    resolve('Promise 1 resolved');
});
let promise2 = new Promise((resolve, reject) => {
    resolve('Promise 2 resolved');
});
promise1.then((result) => {
    console.log(result);
    promise2.then((result) => {
        console.log(result);
    });
});
```
- you can also use the promise.all() method to run multiple promises at the same time

```javascript
// make two promises with diff tomeoutes
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 1 resolved");
  }, 6000);
});

let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("promise 2 resolved"), 3000);
});

promise1.then((successMessage) => {
  console.log("from callback " + successMessage);
});
promise2.then((successMessage) => {
  console.log("from callback " + successMessage);
});

```

## JSONS
how to parse JSON from HTTP message
```javascript
let json = '{"name": "John", "age": 30}';
obj = JSON.parse(json);
console.log(obj.name);
console.log(obj.age);
// expected output: John
// expected output: 30
```
convert a JavaScript object to a JSON String
```javascript
let obj = { name: "John", age: 30 };
let json = JSON.stringify(obj);
console.log(json);
// expected output: "{"name":"John","age":30}"
```
## axios

## async/await
- a nested then can complicate the code
# creting a promise with a callback function
```javascript
const axios = require('axios');

const connectToURL = (url)=>{
  const req = axios.get(url);
  console.log(req);
  req.then(resp => {
      let listOfEntries = resp.data.entries;
      listOfEntries.forEach((entry)=>{
        console.log(entry.Category);
      });
    })
  .catch(err => {
      console.log(err.toString())
  });
}
console.log("Before connect URL")
connectToURL('https://api.publicapis.org/entries');
console.log("After connect URL")
```
we are going to use the async/await to make the code more readable
```javascript
const axios = require('axios');
//async is a keyword that tells the function to return a promise

const connectToURL = async(url)=>{
    const outcome = axios.get(url);
    let listOfEntries = (await outcome).data.entries;
    listOfEntries.forEach((entry)=>{
      console.log(entry.Category);
    });
}


console.log("Before connect URL")
connectToURL('https://api.publicapis.org/entries');
console.log("After connect URL")
```
in the following code we try to get a list of all the entries fromt he remote url and then based on that we make a request aboutch each of the category
```javascript
const axios = require('axios');
/*
In the following code we try to get list of all entries from remote url and then based on that make request about 
each of the category. Finally print them all out. We are using axios get, which returns a promise. 
*/
const connectToURL = (url)=>{
  const req = axios.get(url);
  req.then(resp => {
      let listOfEntries = resp.data.entries;
      return listOfEntries.map((entry)=>{
          return entry.Category
      })
    }).then((categories)=>{
      let Categories = categories.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    })
        Categories.forEach((category)=>{
            const req = axios.get("https://api.publicapis.org/entries?Category="+category);
            req.then(resp=>{
                console.log(category+" - "+resp.data.count);
            }).catch(err => {
              
            })
        });
    })
  .catch(err => {
      console.log(err.toString())
  });
}
connectToURL('https://api.publicapis.org/entries');
```
- the following code is the same as the previous code but it uses async/await
```javascript
const axios = require('axios');

/*
In the following code we try to get list of all entries from remote url and then based on that make request about each of the 
category starting with 'A'. Finally print the API counts of the category. We are using axios get, which returns a promise. 
*/
const axios = require('axios');

async function connectToURL(url){
    const resp = await axios.get(url);
    let listOfEntries = resp.data.entries;
    let Categories = listOfEntries.map((entry)=>{
          return entry.Category
    });
    Categories = [...new Set(Categories)];


    // if you are using an await within a function, you must use the async keyword
    Categories.forEach(async (Category)=>{
      if (Category.startsWith("A")) {
              try {
                const resp = await axios({
                  method: 'get',
                  url: "https://api.publicapis.org/entries?Category="+Category,
                  responseType: 'json'
                })
                console.log(Category+"   "+resp.data.count);
              } 
              catch(e) {
                console.log(e);
              }
      }

    });
}
connectToURL('https://api.publicapis.org/entries').catch(err => {
    console.log(err.toString())
});
```

## async file I/O using fs.readFile
```javascript
// Requiring fs module - fs is used for File I/O
let fs = require('fs');

let filename1 = "courseDetails.json"
let filename2 = "sampleData.json"

// Reading the file Asynchronously - Not blocking rest of execution
function readFile1(filename1) {
    fs.readFile(filename1, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n\nThe content of the file is \n\n"+data);
            console.log("Completed reading file1");
        }
    });
}

function readFile2(filename2) {
    fs.readFile(filename2, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n\nThe content of the file is \n\n"+data);
            console.log("Completed reading file2");
        }
    });
}

console.log('Before the reading the file-1');
readFile1(filename1);

console.log('Before the reading the file-2');
readFile2(filename2);


console.log('All done!');
```
## setTimeout
```javascript
//This method will be provided as a parameter
function firstCallBackMethod() {
    console.log("Inside the first call back method")
}

console.log("Going to call setTimeOut with a delay of 5 seconds")
//Call the function firstCallBackMethod after a delay using setTimeOut
setTimeout(firstCallBackMethod,5000);
```
## example of using async promises
```javascript

/// I have to run these things
// npm install --save prompt-sync
// node asyncPromise.js


let prompt = require('prompt-sync')();
let fs = require('fs');

//promise takes in a resolve and reject finction
const methCall = new Promise((resolve,reject)=>{
    let filename = prompt('What is the name of the file ?');
    try {
      const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'}); 
      resolve(data);
    } catch(err) {
      reject(err)
    }
});

console.log(methCall);

methCall.then(
  (data) => console.log(data),
  (err) => console.log("Error reading file") 
);

```

## async axios request
```javascript
const axios = require('axios').default;


const connectToURL = (url)=>{
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
        console.log("Fulfilled")
        console.log(resp.data);
    })
    .catch(err => {
        console.log("Rejected for url "+url)
        console.log(err.toString())
    });
}
//Valid URL
connectToURL('https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/sampleData.json');
//Invali URL
connectToURL('https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/sampleDate.json');
```

## working with JSONN
```javascript
const axios = require('axios').default;

const req = axios.get("https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/courseDetails.json");
console.log(req);
req.then(resp => {
    let courseDetails = resp.data;
    console.log(JSON.stringify(courseDetails,null,4))
})
.catch(err => {
    console.log(err.toString())
    //This will console log the error withe the code. eg. Error: Request failed with status code 404
});
```
# Summary


        Asynchronous network operations can be handled using callback functions in order to prevent blocking JavaScript code.  

        A callback function must invoke another callback function to pass a message from the Node.js module back to the main application after the Node.js module receives a response message. 

        Nested callbacks can be difficult to read and debug. Inversion of control causes trust issues when dealing with third-party code. 

        Promise objects are most useful for operations that are time-consuming and can block resources. 

        JSON.parse() and JSON.stringify() are two methods used to parse JSON objects.
# glossary
| Package/Method         | Description                                                                                                                          | Code Example                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Async-await             | We can await promises as long as they are being called inside asynchronous functions.                                               | ```javascript  const axios = require('axios').default; let url = "some remote url" async function asyncCall() { console.log('calling'); const result = await axios.get(url); console.log(result.data); } asyncCall(); ```                                                                                    |
| Callback                | Callbacks are methods that are passed as parameters. They are invoked within the method to which they are passed as a parameter. We use callbacks with a promise to process the response or errors. | ```javascript  //function(res) and function(err) are the anonymous callback functions axios.get(url).then(function(res) { console.log(res); }).catch(function(err) { console.log(err) }) ```                                                                                                       |
| Promise                 | An object that is returned by some methods, representing eventual completion or failure. The code continues to run without getting blocked until the promise is fulfilled or an exception is thrown. | ```javascript  axios.get(url).then( //do something ).catch( //do something ) ```                                                                                                                                                                                                                          |
| Promise use case        | Promises are used when the processing time of the function we invoke takes time like remote URL access, I/O operations file reading, etc. | ```javascript  let prompt = require('prompt-sync')(); let fs = require('fs'); const methCall = new Promise((resolve,reject)=>{ let filename = prompt('What is the name of the file ?'); try { const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'}); resolve(data); } catch(err) { reject(err) } }); console.log(methCall); methCall.then( (data) => console.log(data), (err) => console.log("Error reading file") ); ``` |
| object.on()             | It defines an event handler that the framework calls when an event occurs                                                            | ```javascript  http.request( options, function(response) { let buffer = ‘’; ... response.on('data', function(chunk) { buffer += chunk; }); response.on('end', function() { console.log(buffer); }); }).end(); ```                                                                                        |
| Callback Hell           | Nested callbacks stacked below one another and waiting for the previous callback. This creates a pyramid structure that affects the readability and maintainability of the code.                  | ```javascript  const makeCake = nextStep => { buyIngredients(function(shoppingList) { combineIngredients(bowl, mixer, function(ingredients){ bakeCake(oven, pan, function(batter) { decorate(icing, function(cake) { nextStep(cake); }); }); }); }); }; ```                                               |
| Axios Request           | The axios package handles HTTP requests and returns a promise object.                                                                | ```javascript  const axios = require('axios').default; const connectToURL=(url)=>{ const req=axios.get(url); console.log(req); req.then(resp=>{ console.log("Fulfilled"); console.log(resp.data); }) .catch(err=>{ console.log("Rejected"); }); } connectToURL('valid-url') connectToURL('invalid-url') ```         |
