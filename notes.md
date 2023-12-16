# Introducton
- Most popular front-end framework
- Created by Facebook
- htlml code is turned into Document Object Model (DOM) elements
- React is a library for creating and managing DOM elements
- in react you dont need to worry about querying the DOM

# setting up the development environment
- must have node version 16 or higher
- must have npm version 7 or higher
- Different option for creating react app
    - npx create-react-app my-app
    - npm init react-app my-app
    - yarn create react-app my-app
    - vite create my-app --template react
```bash
npm create vite@latest (or version)
```
then you select name and framework anf language
```bash
npm i (or npm install)
```
this installs all the dpendencies
then you run the app
```bash
npm run dev
```
it should open a browser window with the app running, or give you a link
# Project structure
inside of the newly created project you will find a src folder with the following files
- index.html: the main html file that has a div with id root, which is where the react app will be rendered
- **package**.json: the file that contains all the dependencies and scripts
- tsconfig.json: the file that contains the **typescript** configuration that is used to compile the typescript code into javascript
- **index.css**: the main css file
- vite.config.ts: the file that contains the vite configuration
- index.js
- App.js
- App.css

# Creating a component
- A component is a function that returns a react element
- you can either make a component as a function or as a class, older versions of react used classes, but now functions are used more often
- you can use the **jsx** syntax to create react elements
- declate a function in your component file
```typescript
function Message(){
    // JSX syntax
    return <h1>Hello World</h1>
}
export default Message;

```
- if you have rs7 you can use the snippet **rafce** to create a react function component
go back to yout main app component and import the message component
```typescript
import Message from './Message';
function App() {
  return (
    <div className="App">
      <Message />
    </div>
  );
}
```
vite will automatically reload the page and you should see the message component rendered

- conditional rendering
```typescript
function Message(){
    // JSX syntax
    const isLoggedIn = true;
    return (
        <div>
            <h1>Hello World</h1>
            {isLoggedIn ? <h2>You are logged in</h2> : <h2>You are not logged in</h2>}
        </div>
    )
}
```
# Building components
- creating a listgroup component using **bootstrap**
first install bootstrap
```bash
npm i bootstrap
```
then import it in the main.tsx app component
```typescript
import 'bootstrap/dist/css/bootstrap.min.css';
```
go to the listgroup component and create a folder called components and make a file named listgroup component
```typescript
function ListGroup() {
    return <h1> List Group </h1>
}
export default ListGroup;
```
then import it in the main app component
```typescript
import ListGroup from './components/listgroup';
```
You can use the bootstrap list group component
```typescript
function ListGroup() {
    return <ul className="list-group">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Morbi leo risus</li>
        <li className="list-group-item">Porta ac consectetur ac</li>
        <li className="list-group-item">Vestibulum at eros</li>
    </ul>

}
``` 
## fragments
- you can use fragments to return multiple elements
- open command pallete and wrap with fragment or you can do this
```typescript
import {Fragment} from 'react';
```
```typescript
function ListGroup() {
    return (
        <Fragment> // wrap the entire expression in a fragment
            <h1> List Group </h1>
            <ul className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
        <Fragment/>
    )
}
```
or you can use the shorthand syntax
```typescript
<> // shorthand syntax
    <h1> List Group </h1>
    <ul className="list-group">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Morbi leo risus</li>
        <li className="list-group-item">Porta ac consectetur ac</li>
        <li className="list-group-item">Vestibulum at eros</li>
    </ul>
</> // shorthand syntax
```
## rendering lists
- you can use the map function to render a list
```typescript
functino ListGroup() {
    const items = ['item1', 'item2', 'item3'];
    return (
        <ul className="list-group">
            {items.map(item => <li key = {item} className="list-group-item">{item}</li>)}
        </ul>
    )
}
```
say you wanted to conditionally render, you cant use if else because only react elements can be returned, you wull have to use the ternary operator
- Ternary operator
```typescript
{items.length === 0 ? <p>There are no items</p> : <p>There are {items.length} items</p>} // if this ? then this : else this
// this is another option using &&
{items.length === 0 && <p>There are no items</p>} // if this is true then render this
```
## how to do click events in react
- this is the event with the in line function be passed into onClick
```typescript
function ListGroup() {
    const items = ['item1', 'item2', 'item3'];
    return (
        <ul className="list-group">
            {items.map(item => <li key = {item} onClick={(event) => console.log(event)} className="list-group-item">{item}</li>)}
        </ul>
    )
}
```

```typescript
import { MouseEvent } from "react"; // this is important because it gives you the type of the event
function ListGroup() {
    const items = ['item1', 'item2', 'item3'];
    const handleClick = (event : MouseEvent) => {
        console.log('Item clicked');
    }
    return (
        <ul className="list-group">

            {items.map(item => <li key = {item} onClick={handleClick} 
            
            className="list-group-item"
            {item}</li>)}
        </ul>
    )
}
```
## using stat to handle state
- state is data that is used by the component
- state is immutable, you cannot change it directly
- you can use the useState hook to create state
```typescript
// state returns an array with two elements, the first element is the state and the second element is the function that is used to change the state
const arr = useState(0);
const count = arr[0]; // this is the state variable
const setCount = arr[1]; // this is the function that is used to change the state variable
// this can be simplified to this
const [count, setCount] = useState(0);
```
## passing data via props to a component
- props are inputs to a component
```typescript
interface Props {
    items: string[]; // this is the type of the items prop
    heading: string; // this is the type of the heading prop
}
```
- then you can pass the props to the component
```typescript
function ListGroup(props: Props) {
    const items = props.items;
    const heading = props.heading;
    return (
        <ul className="list-group">
            <h1>{heading}</h1>
            {items.map(item => <li key = {item} className="list-group-item">{item}</li>)}
        </ul>
    )
}
```
-or you can destructure the props
```typescript
function ListGroup({items, heading}: Props) {
    return (
        <ul className="list-group">
            <h1>{heading}</h1>
            {items.map(item => <li key = {item} className="list-group-item">{item}</li>)}
        </ul>
    )
}
```
- you can use a functiona as a prop
```typescript
interface Props {
    items: string[]; // this is the type of the items prop
    heading: string; // this is the type of the heading prop
    onClick: (event: MouseEvent) => void; // this is the type of the onClick prop
}
```
- then you can pass the props to the component
```typescript
function ListGroup({items, heading, onClick}: Props) {
    return (
        <ul className="list-group">
            <h1>{heading}</h1>
            {items.map(item => <li key = {item} onClick={onClick} className="list-group-item">{item}</li>)}
        </ul>
    )
}
```
- then you can pass the function as a prop
```typescript
function App() {
  const handleClick = (event: MouseEvent) => {
    console.log('Item clicked');
  }
  return (
    <div className="App">
      <ListGroup items={['item1', 'item2', 'item3']} heading="List Group" onClick={handleClick}/>
    </div>
  );
}
```
- now in app you can use the onClick prop

















