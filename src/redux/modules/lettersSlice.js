import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  letters: [],
  error: null,
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FAN_LETTER_SERVER_URL}/letters`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addLetters = createAsyncThunk(
  "addLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FAN_LETTER_SERVER_URL}/letters`,
        payload
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
  extraReducers: {
    [__getLetters.fulfilled]: (state, action) => {
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {} = lettersSlice.actions;
export default lettersSlice.reducer;
