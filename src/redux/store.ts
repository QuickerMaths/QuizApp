import { configureStore } from "@reduxjs/toolkit";
import quizSliceReducer from "../features/slice/quizSlice";

export const store = configureStore({
  reducer: {
    quizSlice: quizSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
