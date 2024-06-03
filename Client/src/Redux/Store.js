import { configureStore } from "@reduxjs/toolkit";
import PhotoSlice from "./PhotoSlice";
export default configureStore({
  reducer: {
    photos: PhotoSlice,
  },
});
