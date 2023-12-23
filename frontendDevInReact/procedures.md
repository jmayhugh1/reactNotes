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
