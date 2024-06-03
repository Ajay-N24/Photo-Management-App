import { createSlice } from "@reduxjs/toolkit";
export const PhotoSlice = createSlice({
  name: "photos",
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state, action) => {
      state.value.push(action.payload);
    },
  },
});
export const { addData } = PhotoSlice.actions;
export default PhotoSlice.reducer;
