import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: [],
  isLogin: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const response = await axios.get(
        `${process.env.REACT_APP_FAN_LETTER_AUTH_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __registerUser = createAsyncThunk(
  "registerUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FAN_LETTER_AUTH_URL}/register`,
        payload
      );
      console.log("response", response.message);
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FAN_LETTER_AUTH_URL}/login?expiresIn=1h`,
        payload
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data.accessToken);
    } catch (error) {
      console.log("error", error);
    }
  }
);

// export const __changeProfile = createAsyncThunk();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [__getUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__loginUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;