# components
- define functional and class components
- descrive how to set and access properties
- explain how to create and acess states of a react component
- there is a tree of components that make up the app startingwith the root component
- functional components: a plan JavaScript function that returns JSX
- Class: a JavaScript class that inherits from React.Component
## functional components
- most useful when the component has properties, but he lifecycle doesnt have to be managed
- user-defined props are passed as paramters to the function, cannot have uppercase letters
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
  // color and size are props
  <App color = "blue" size = "25" clickEvent = {
    () => (alert("clicked"))
  }>
  </React.StrictMode>
);
```
```javascript
function App(props){
    return (
        <div>
        <h1>My favorite color is {props.color}</h1>
        <h1>My favorite size is {props.size}</h1>
        <button onClick = {props.clickEvent}>Click Me</button>
        </div>
    )
}
```
- event handlers can be passed as props too 
## class components
- preferred more than fnctional components
- can have state and lifecycle methods
- can have properties
- can have event handlers
```javascript
import React from 'react';
class App extends React.Component{
    constructor(props){
        super(props); //derived clas must call super() before accessing this
        this.state = {
            color: "blue",
            size: "25"
        }
    }
    // must override render method
    render(){
        return (
            <div>
            <h1>My favorite color is {this.props.color}</h1>
            <h1>My favorite size is {this.props.size}</h1>
            <button onClick = {this.props.clickEvent}>Click Me</button>
            </div>
        )
    }
}
```
- props are set from outside the class, state is set from inside the class
# States
- state allows you o change data
- an object that specifies different types of data
- a built in state object stores property values that belong to the component
- a plain object that is used to record and react to user events
- determine how a component renders and behaves
- an instance of React component class can have a state by setting this.state in its constructor
- state is manages and preserved by the component itself

## types of React states
- shared state: shared by multiple components such as in an order application
- local state: used by a single component

## need of state
- required in a component that changes during interaction
- state tracks the change in a component
- example: state sres the count of the number of times a button is clicked
```javascript
class TestComponent extends React.component}
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }
    render(){
        return (
            <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick = {() => this.setState({count: this.state.count + 1})}>Click Me</button>
            </div>
        )
    }
}
```
# props
- properties enable the component to pass data between react components
- props are read only
- objects that store the value of attribute of a tag and work like HTML attributes
- function arguments that can be passed to the component
- immutabke and cannot be modified from inside the component
- should not be modified directly
- allow child components to receive data from parent components
```javascript
class TestComponent extends React.component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }
    render(){
        return (
            <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick = {() => this.setState({count: this.state.count + 1})}>Click Me</button>
            </div>
        )
    }
}
```

## passing data and states between components
- descrive the llifecycle of a react component
- descrivbe how to pass data and props between components
### component phases
- mounting: component creation
- updating: component change
- unomounting: component removal
### mounting
when a component is created four methods are called in this order
1. consstructor()
2. getDerivedStateFromProps()
3. render()
4. componentDidMount()
```javascript
import React from 'react';
class App extends React.Component{
    constructor(props){
        super(props); //derived clas must call super() before 
        console.log("inside constructor");
    }
    componentDidMount(){
        console.log("inside componentDidMount");
    }
    // must override render method
    render(){ //logs inside render
        console.log("inside render");
        return (
            <div>
            <h1>My favorite color is {this.props.color}</h1>
            <h1>My favorite size is {this.props.size}</h1>
            <button onClick = {this.props.clickEvent}>Click Me</button>
            </div>
        )
    }
}
```
### updating
when a component is updated five methods are called in this order
1. getDerivedStateFromProps() depends on props
2. shouldComponentUpdate() returns true, checks if the component should be updated returns false only if you dont want to update the component
3. render()
4. getSnapshotBeforeUpdate() keeps track of the previous state
5. componentDidUpdate() updates the component

### unmounting
1. componentWillUnmount() removes the component from the DOM

## passing data between components
- parent to child: props
```javascript
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

class ParentComponent extends React.Component {
  render() {
    const dataToPass = 'Hello from Parent!';

    return (
      <div>
        {/* Passing data as a prop to the ChildComponent */}
        <ChildComponent message={dataToPass} />
      </div>
    );
  }
}

// ChildComponent.js
import React from 'react';

class ChildComponent extends React.Component {
  render() {
    // Accessing the data passed from the parent through props
    const receivedMessage = this.props.message;

    return (
      <div>
        {/* Displaying the received data in the ChildComponent */}
        <p>{receivedMessage}</p>
      </div>
    );
  }
}

export default ChildComponent;

```
- child to parent: callback functions
```javascript
// ChildComponent.js
import React from 'react';

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childData: 'Hello from Child!',
    };
  }

  sendDataToParent = () => {
    // Using the callback function passed from the parent to send data
    this.props.sendDataCallback(this.state.childData);
  };

  render() {
    return (
      <div>
        <p>{this.state.childData}</p>
        {/* Triggering the callback function when a button is clicked */}
        <button onClick={this.sendDataToParent}>Send Data to Parent</button>
      </div>
    );
  }
}

// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

class ParentComponent extends React.Component {
  // Callback function to receive data from the child
  receiveDataFromChild = (dataFromChild) => {
    console.log('Received data from child:', dataFromChild);
    // You can do something with the received data here
  };

  render() {
    return (
      <div>
        {/* Passing the callback function to the ChildComponent */}
        <ChildComponent sendDataCallback={this.receiveDataFromChild} />
      </div>
    );
  }
}

export default ParentComponent;

```
- sibling to sibling: redux

## component lifecycle
- explain the lifecycle of a react component
- describe the differnt phases of a react component
### component phases
- initialization: constructed with props and default state
- mounting: component creation, rendering, and insertion into the DOM
- updating: component change, rerendering, and updating in the DOM
- unmounting: component removal from the DOM

# connecting react to external servers
- there are a lot of ways to connect react to external servers. HTTP: GET, POST, UPDATE, DELETE
- promise server ca
- connect to server with axios library
- you can also send data to the server with a post request
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Making a GET request using Axios to a sample API endpoint
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;

```
# testing in react
## advantages and disadvantages of testing
- prevents unexpected regressions
- allowd focus on current task
- allows modular development

# summary
- state is a plain JavaScript object that is used to record and react to user events
- props are read only and cannot be modified from inside the component
- you can pass data between components using props and callback functions
- you can connect react to external servers using axios
- Components can be tested using Mocha, Chai, Sinon, but prefered approaches are by using Jest and React testing library.