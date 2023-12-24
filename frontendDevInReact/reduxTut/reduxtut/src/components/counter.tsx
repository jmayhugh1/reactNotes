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
