import { Counter } from "./components/counter";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  //Store
  interface CounterState {
    value: number;
  }
  interface UserState {
    isSignedIn: boolean;
  }
  // Actions

  const IncrementByAmount = { type: "INCREMENT", payload: 10 };
  const decrement = { type: "DECREMENT" };

  // Reducer
  // takes the state, make a copy of the state then replaces the state
  

  return (
    <div>
      <h2>REDUX TUT</h2>
      <Counter />
    </div>
  );
}

export default App;
