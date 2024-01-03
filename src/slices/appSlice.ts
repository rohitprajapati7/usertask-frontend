import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    userList: [],
  },
  reducers: {
    updateUserList: (state: any, action: any) => {
      if (Array.isArray(action.payload)) {
        // Concatenate the array to the existing userList
        state.userList = state.userList.concat(action.payload);
      } else if (
        typeof action.payload === "object" &&
        action.payload !== null
      ) {
        // Add the object to the userList
        state.userList.push(action.payload);
      } else {
        // Handle other cases or throw an error if needed
        console.error("Invalid payload type for updateUserList");
      }
    },
  },
});

export const { updateUserList } = appSlice.actions;

export default appSlice.reducer;
