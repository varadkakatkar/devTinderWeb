import { createSlice } from "@reduxjs/toolkit";

const normalizeUserPayload = (payload) => {
  if (!payload) return null;
  return payload.user ?? payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      console.log("action.payload", action.payload);
      const normalizedPayload = normalizeUserPayload(action.payload);
      console.log("normalizedPayload", normalizedPayload);
      return normalizedPayload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
