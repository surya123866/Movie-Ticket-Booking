import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    email: "",
    password: "",
    userType: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
