# creating a react app

- with the create react app utility

```bash
npx create-react-app my-app
```

- with vite THIS IS THE BEST WAY

```bash
npm init vite@latest
```

- with webpack

```bash
npm init webpack@latest
```

- this will create an app with the following structure

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── reportWebVitals.js
```

- in the src thre is the APP.js file which is the main component of the app and index.js is wher you will add app.js to the DOM

## running the app

- to run the app you can use the following command

```bash
npm start
```

- if you are using vite you can use the following command

```bash
npm run dev
```

- this will start the app in development mode

# components

## states

```javascript
// creating states and state functions to modify the state of the todolist and its
const [todos, setTodos] = useState([]);
const [todoEditing, setTodoEditng] = useState(null);
//whenever you want to change state
setTodos([...todos, newTodo]);
```

## useEffect

```javascript
useEffect(() => {
  const json = localStorage.getItem("todos"); // gets the json string from local storage
  const loadedTodos = JSON.parse(json); // converts the json string to a javascript array
  if (loadedTodos) {
    setTodos(loadedTodos); // sets the todos state to the loadedTodos array
  }
}, []); // the empty array ensures that this useEffect hook is only called once when the component is mounted
useEffect(() => {
  if (todos.length > 0) {
    const json = JSON.stringify([...todos]); // converts the todos array to a json string['
    localStorage.setItem("todos", json); // stores the json string in local storage
  }
}, [todos]);
```

## getting input from a form

document.getElementById("todoAdd").value is the value of the input with the id todoAdd
you can use this to get the value of the input and then clear the input by setting its value to an empty string

```javascript
// JSX
<h1>Todo List</h1>
      <form onSubmit={handlesubmit}>
        <input type="text" align="right" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>


// function
const handlesubmit = (e) => {
    e.preventDefault(); // prevents the default submission behavior for the form
    let todo = document.getElementById("todoAdd").value; // gets the value of the input that has the id todoAdd
    const newtodo = {
      id: new Date().getTime(), // creates a unique id for each todo
      text: todo.trim(), // trims the todo text
      completed: false, // sets the completed property to false
    };
    if (newtodo.text.length > 0) {
      console.log("adding new todo");
      setTodos([...todos].concat(newtodo)); // [...todos] creates a shallow copy
      // setTodos is done asynchronously
    }

    document.getElementById("todoAdd").value = ""; // clears the input field by setting its value to an empty string
  };
```

## conditional rendering

```javascript
{
  todo.id === todoEditing ? (
    <button onClick={() => submitEdits(todo)}>submit edit</button>
  ) : (
    <button onClick={() => setTodoEditng(todo.id)}>edit</button>
  );
}
<button onClick={(event) => deleteToDo(todo.id, event)}>Delete</button>;
```

# redux

## important concepts

store- the store is the object that holds the state of the application
you split your app into a number of slices and each slice has its own reducer

1. create a store directory and in that directory create a store.ts file

```javascript
// store
// this files holds our redux store
import { configureStore } from "@reduxjs/toolkit"; // this is the redux store
import counterReducer from "./counter/counterSlice"; // this is the reducer
export const store = configureStore({
  // configureStore takes an object with a reducer key, the value of the reducer key is the reducer
  reducer: {
    counter: counterReducer,
  }, // takes one key Reducer, fill with differen reducers
});

export type RootState = ReturnType<typeof store.getState>; // this is the return type of they type of store.getState
// in any react component when you need to access the state with a selector, you need to use this type
export type AppDispatch = typeof store.dispatch; // this is the type of the dispatch function
// WILLBE USEFUL WHEN WE ARE DING ASYNC CALLS
```

- then go to main index.tsx file and wrap the app with the provider component

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux"; // comes to react-redux and not toolkit, works with the redux context api
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
// wrap the app in the provider and pass the store
// makes store available to all components
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
```

- the we create a slice, go into the store directory and create a counter directory and in that directory create a counterSlice.ts file

```javascript
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface CounterState {
  value: number;
}

// this intial state will be set to 0
const initialState: CounterState = {
  value: 0,
};
// now creating the slice with the name of the slice, the intial state, and the reducers
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // reduc toolkit already gives it the name  "counter/increment"
      // you can only do this if you use createSlice
      // this is a reducer function
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //this will take a state and action
      // PayloadAction is a generic type that takes a type
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        // this is the action creator
        console.log("pending");
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          // this is the action creator
          state.value += action.payload;
        }
      );
  },
});

// this is how async calls are done
export const incrementAsync = createAsyncThunk(
  // we have to define it ourselves
  // in the case of async options you to define it first with createAsyncThunk
  // then you can use it in the reducer
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);
export const { increment, decrement, incrementByAmount } = counterSlice.actions; // this is the action creator
// this will export the reducers
export default counterSlice.reducer;
```
- now go back to the store.ts and import you reducer that you just created
- inside if the reducer object add the counter key and set it to the counterReducer
```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice"; /* it was imported right here */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }, // takes one key Reducer, fill with differen reducers
});

export type RootState = ReturnType<typeof store.getState>; // this is the return type of they type of store.getState
// in any react component when you need to access the state with a selector, you need to use this type
export type AppDispatch = typeof store.dispatch; // this is the type of the dispatch function
// WILLBE USEFUL WHEN WE ARE DING ASYNC CALLS
```
- if you added more slices ths is what it would look like
```javascript 
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import userReducer from "./user/userSlice"; // Import another reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer, // Add another reducer
    // Add more reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

- now go to your component and connect it so that it can access the state and dispatch actions
- first import the useSelector and useDispatch hooks from react-redux
- the import the RootState and AppDispatch types from the store.ts file
```javascript
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./state/store";
```
- then use the useSelector hook to access the state
```javascript
const count  = useSelector((state: RootState) => state.counter.value);
```
- then use the useDispatch hook to dispatch actions
```javascript
// the dispatch lets you sue actions
const dispatch = useDispatch<AppDispatch>();
```
- then from your slice import the reducers and the async action creator
```javascript
import { increment, decrement, incrementByAmount, incrementAsync } from "./state/counter/counterSlice";
```
- then you can use the dispatch to dispatch actions
```javascript
import { AppDispatch, RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from "../state/counter/counterSlice";

export const Counter = () => {
  // connect the component to the store, use the selector to get the state, pass the state to the component
  // we exported RootState from the store, we can use it here as  a type
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    const formElement = document.getElementById(
      "formy"
    ) as HTMLInputElement | null;
    if (formElement) {
      console.log(formElement.value);
      let num = formElement.value;
      dispatch(incrementByAmount(Number(num)));
    }
  };

  return (
    <div>
      <h3>Counter</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(incrementAsync(1))}>+</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <form onSubmit={(e) => handleSubmitClick(e)}>
          <input type="number"  id="formy"/>
          <button type="submit">
            Add Amount
          </button>
        </form>
      </div>
    </div>
  );
};
```
