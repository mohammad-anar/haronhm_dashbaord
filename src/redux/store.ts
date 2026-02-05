import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import socketReducer from "./features/socketSlice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
