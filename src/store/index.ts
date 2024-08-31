import { configureStore } from "@reduxjs/toolkit";
import { createAPI } from "../server/api";
import { rootReducer } from "./reduser";

const api = createAPI();

export const store = configureStore({
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
  reducer: rootReducer,
})