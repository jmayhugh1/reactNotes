import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface CounterState {
  value: number;
}

// this intial state will be set to 0
const initialState: CounterState = {
  value: 0,
};

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
export default counterSlice.reducer;
