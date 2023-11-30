import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  letters: [],
  isLetterLoading: false,
  isLetterError: false,
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
    [__getLetters.pending]: (state, action) => {
      state.isLetterLoading = true;
      state.isLetterError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLetterLoading = false;
      state.isLetterError = false;

      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLetterLoading = false;
      state.isLetterError = true;

      state.error = action.payload;
    },
  },
});

export const {} = lettersSlice.actions;
export default lettersSlice.reducer;
