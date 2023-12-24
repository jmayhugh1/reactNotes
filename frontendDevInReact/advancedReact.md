# Hooks

- explain what hooks are
- list the advantages of hooks
- describe the standard and custom hooks
  simple way to encapsulate stateful logic
  allow function components to use state
  provide a wayto use context and state
  can be used without classes
  use function components instead of classes

## why hooks

- class components have problems like wrapper complexity, to complex to reuse stateful logic, and large components
- hooks enable functions components to have access to state and other react features
- hooks help you create simpler code without clases
- u can create your own custom hooks

## advantages of hooks

- makes readable code
- leser code
- optimized components
- write a funcional component instead of a class
- writing complex components is easier

## best practices

- can only be called from inside react function components
- can only be called from the top level of a component
- cannot be conditional
- use Node version 6 or above
- use npm version 5.2 or above
- use create-react-app version

## standard hookos

- useState: adds state to function components
- useEffect: adds lifecycle methods to function components, manages side effects
- useContext: adds context to function components, manages context
- useReducer: adds reducers to function components, manages complex state, manage redux state changes

## custom hooks

- allows you to add special functionality to function components
- are named with prefix 'use'
- is a composition of one or multiple hooks
- are reusable and can be broken into smaller Hooks, testable

### example

```javascript
import React, {useState} from 'react';
function CntAPP(){
    // useState is a hook that needs to call inside a functino component to add some local state to it
    // useState returns a pair where the first element is the current state value and the second element is a function that lets you update it
    //
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick = {() => setCount(count + 1)}>Click Me</button>
        </div>
    )
}
export defualt CntAPP;
```

# implementing forms

- explain what forms are
- describe the different types of inputs
- enumerate the advatages or React hook forms
  React allows user to interact with the application
  data is handled by the components
  data is stored in the component state
  you can control changes and update the state using event handler

## handling form elements

form elements

```javascript
<input>, <textarea>, and <select>
```

- in HTML the form elements maintain their own state
- in React the state is stored in the state property of the component and updated with setState()

### form validation

- verify that the user has entered the correct data
- involves getting form values, managing the form state, and validating the form on the fly, show validation errors
- controlled inputs: use react to fully control the form elements by setting and updating the input value directly
- uncontrolled inputs: allows the browser to handle most of the form elements and collect data through react change events
- controlled inputs are more flexible and can be validated easily
- uncontrolled inputs are faster and easier to integrate with legacy code

### uncontolled inputs

- when you drop an input from a redner function the input is uncontolled
- the input value is handled by the DOM itself
- manage thier own value in the input's DOM node
- elements will be updated when the input value changes
- ref functino us used to get the form values

### controlled input

- write the code to mange the value explicitly
- create state to hold, update, and display value
- functions that govern the passing of data
- better control over form elements and data
- props take current value and a function to update the value
- a parent component controls the changes

```javascript
import React, { useState } from "react";
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && <div>Form Submitted</div>}
    </div>
  );
}
```

## react hook forms

- useful package for creating web forms
- reduces amount of code
- uses ref to control form inputs
- can be installed using the install command
- reduces the number of re renders

# into to redux

- Explain redux, advantages, and enumerate the uses of redux
  redux is a state management library
  follows a pattern known as Flux architectire
  handles state changes in an application
  used when there is a high number of components

## why redux

- management of large applications with a large number of components
- redux offers a centralized state management system
- redux reduces complexity of code
- redux makes it easier to maintain the state
- redux makes it easier to debug the application

## advantages of redux

- enhances state prediction factor
- help maintenancem testing and debugging
- enables sharing data between components withoit providing any state ot methids

## uses of redux

- manages state in SPAs, desktop apps, and react native apps
- helps in caching page state
- manages state in components/global components
- refactors components
- shares state with multiple container components

# Essential concepts of redux

- describe essential concepts of redux
- describe Actions, store and reducers

## basic principle behind redux

- offers centralized state management system -- a single store
- componets properties should be immutable
  ACTION -UPDATES-> STATE -RERENDERS-> COMPONENT -UPDATES-> COMPONENT PROPERTIES -DISPLAY-> RESULT

## redux concpet

- actions: these are what you application can do
- store: that is the singular location and authorative source of truth for the state of your application
- reducers: these are pure functions that take the current state of your application and an action and return a new state

## actions

what can actions be
they are dispatched by various parts of the application and recieved by the store
they are JavaScript objects
sent to your store to update the application state
described by the type field that is constant

1. events are fired by selecting a radio button
2. JSON objects that contain information about an event that has occurred
3. produced by functions called action creators
4. contains type of action, time of occurence, and which states it aims to change

## store

- contains the redux application state
- an object that contains state, functinos and other objects
- can dispatch and recieve actions
- provides sibscriptions to store updates
- hold the entire application list in the form of a stae tree

## reducers

- recives actions and updates the state of the application
- makes appropriate changes to the state
- a pure function that recieves current state and an action
- Acts as an event listener, reads the Action payloads and updates store
- takes two parameters, previous app state and Action and returns new app state

# async with redux

- explain sync and async actions
- describe differnt types of middleware, thunk and saga

## sync and async actions

### sync

- runs in sequwnce from top to bottom
- each operation waits for the previous to complete

### async

- runs in parralel
- an operation can occur while another is still bening processed
- preferable when execution can be blocked indefinitely
- page remains responsive
- Javascript code executed functions correctly

## whhy asnyc in redux

- the flow of Redux's state mamangement tasks is completely synchronus

## middleware

- in Redux, Actions and Reducers compliment your app's architectire
- to use aync operations Actions and recuers are not enough
- middlware will intercept the actions and perform the async operations, once this is done the action is dispatched to the reducers that computes the new state

## thunk

- allows to pass functions within action creators to create async Redux
- allows writing action creators
- allows dispatch delay of an action
- allows dispatching an action
- passes dispatch() and getState() as arguments to the inner function

### advantages

- suitable for simple applications
- enables async operations without a lot of boiler plate code
- easy to setup annf omplement, less learning curve

### disadvantages

- cannot act inresponse toan action
- difficult ot hanle concurerncy problems that might arise
- imperative - not very easy to test
- does not scale well

## saga

- uses generators to enable asnyc operations
- exposes a set of helper functinos to create declerative JavaScript objects
- handles the objects yielded in the backend

### advantages

- allows expressing complex logic as pure functions
- easy to test becasue of predictability, allows seperation of concerns
- sagas can be time-traveled
- makies it easier to scale complex applications
- easier to catch errors and handle failures

### disadvantages

- not suitable for simple apps
- requires a lot of boilerplate code
- need to have knowledge of generators
- higher learning curve compared to other middleware

thunk is the preffered middleware because you can use it for simple applications, you can use it to dispatch actions, and it is easy to setup and implementm and it is easier to learn

# binding redux and flow

- explain concept of state change
- describe the flow of data in redux
- list the advantages of a one day data flow

## state change
- triggers the re rendering of the DOM in React
- involves transfer of data and long chain of props
- requires state management done by redux
- managed in React Reduc using a single store and reducers
- is easier in redux