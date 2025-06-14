import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      global: globalSlice.reducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
