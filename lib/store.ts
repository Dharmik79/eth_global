import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./reducers/connectionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      connection: connectionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
