import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  member: "민지",
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMember: (state, action) => {
      state.member = action.payload;
    },
  },
});

export default memberSlice.reducer;
export const { setMember } = memberSlice.actions;
