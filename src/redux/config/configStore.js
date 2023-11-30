import { configureStore } from "@reduxjs/toolkit";
import letters from "../modules/lettersSlice";
import member from "../modules/memberSlice";
import user from "../modules/userSlice";
const store = configureStore({
  reducer: {
    letters,
    member,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
