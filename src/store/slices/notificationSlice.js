import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   open: false,
   message: "",
   id: null,
   severity: "success"  // "success" | "error" | "info" | "warning"
   
} 
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      showNotification: (state, action) => {
         state.open = true;
         state.message = action.payload.message;
         state.severity = action.payload.severity;
         state.id = Date.now();
      },
      hideNotification: (state) => {
         state.open = false;
      }
    }
});
export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;