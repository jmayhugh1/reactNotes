import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }, // takes one key Reducer, fill with differen reducers
});

export type RootState = ReturnType<typeof store.getState>; // this is the return type of they type of store.getState
// in any react component when you need to access the state with a selector, you need to use this type
export type AppDispatch = typeof store.dispatch; // this is the type of the dispatch function
// WILLBE USEFUL WHEN WE ARE DING ASYNC CALLS
