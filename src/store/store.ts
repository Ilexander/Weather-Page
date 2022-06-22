import { configureStore } from "@reduxjs/toolkit";
import weatherListSlice from "./weatherListSlice";

const store = configureStore({
  reducer: {
    weatherList: weatherListSlice,
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
