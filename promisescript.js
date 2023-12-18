//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 6000);
});

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
  console.log("From Callback " + successMessage);
});

//Console log after calling the promise
console.log("After calling promise");



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

//make the second promise get resolved after

let myPromise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 6000);
});

let myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 6000);
});

myPromise1.then((successMessage) => {
  console.log("From Callback " + successMessage);
  myPromise2.then((successMessage) => {
    console.log("From Callback " + successMessage);
  });
});
