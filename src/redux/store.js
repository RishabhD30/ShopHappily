import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./cart";

const store = configureStore({
  reducer: rootReducer
});

export default store;