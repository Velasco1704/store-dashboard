import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { appSlice } from "@api/apiSlice";

export const store = configureStore({
  reducer: {
    [appSlice.reducerPath]: appSlice.reducer,
    user: persistReducer<ReturnType<typeof userReducer>>(
      {
        key: "user",
        storage,
        whitelist: ["token"],
      },
      userReducer
    ),
  },
  middleware: (getDefaultSettings) =>
    getDefaultSettings({ serializableCheck: false }).concat(
      appSlice.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
