import { configureStore } from "@reduxjs/toolkit";
import loginData from "./loginData";

export default configureStore({
  reducer: {
    login: loginData,
  },
});
