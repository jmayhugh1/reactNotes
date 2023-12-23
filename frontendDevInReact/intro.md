# Front end framework in React
## angular
- based on HTML and JavaScipt
## react
- client side dynamic Virtual DOM
## vue
- open source
- uses virtual DOM
- lightweight 
## JavaScript XML (JSX)
- resembles HTML
- can be compiled and interpreted as JavaScript by babel
- is embedded inside special script tags
## important packages in react
- react: components, their states, and properties
- ReactDOM: glue between react and DOM
- Babel: to compile and interpret the JSX


# ES6
- EcmaScript 6
- javascript standard
- let and const are introduced in addition to var, they are block scoped, let allows you to restrict the scope of a variable to a block
- const allows you to declare a variable that cannot be reassigned
- arrow functions allow functions to be declared in a shorter syntax
- promise is an object that represents the eventual completion or failure of an asynchronous operation
```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
        reject('failure');
    }, 1000);

});
- object destructuring allows you to extract data from objects into their own variables
```javascript
const person = {
    name: 'John',
    age: 20,
    address: {
        city: 'Boston',
        state: 'MA'
    }
}
```
- inheritance, super, and extends
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age}`;
    }
}
class Customer extends Person {
    constructor(name, age, balance) {
        super(name, age);
        this.balance = balance;
    }
    info() {
        return `${this.name} owes $${this.balance}.00`;
    }
}
const customer1 = new Customer('Kevin', 32, 300);
console.log(customer1.info());
```
# components
- core building blocks of react, they are reusable and independent
- represents a small part of the UI
- can be nested inside other components
## state components
- state is an object that determines how a component renders and behaves
- components can be "stateful" or "stateless"
- a stateful component  updates a per the current state
- stateful components are a class type while stateless copmonents are a function type
## Props, Events, and state
- properties enable the copmonent to pass data
- events enable the compenent to respond to user actions
- state enables the component to update and render
# types of components
- functional components
- class components
## functional components
- create with a jsx function
- can accept props as an argument
- do not natively have a state or lifecycle but they can be implemented with hooks
- used to display informatino that is easy to read, debug, and test
- stateless
```javascript
const demo = (props) => {
    return <h1>Hello, {props.name}</h1>
}
```
## class components
- more complex
- can pass data to other components
- more frequently used, because they can use main React functions like state, props, and lifecycle methods
- stateful
```javascript
class demo extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}
```
## pure react components
- better than functional components
- primarily used to proivde optimizations
- simplest and fastest cmpoennts
- do not depend on or modify thr state of variables outside their scope
- can replace functional components
## higher order React components
- advnaced technique for reusing component logic
- not availabe in the API
- A pattern that emerged from react's compositional nature
- a function that returns a component
- used to share logic with other components

- this is a functional component
```javascript
import React from 'react';
import {Text, View} from 'react-native';
const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default HelloWorldApp;
```
