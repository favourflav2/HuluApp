import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { tvApi } from "./api/tvApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { movieApi } from "./api/movieApi";
import huluSlice from "./features/huluSlice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["hulu"],
};

const reducer = combineReducers({
  [tvApi.reducerPath]: tvApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  hulu: huluSlice,
  auth: authSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([tvApi.middleware, movieApi.middleware]),
});

// Need this in order to use useDipatch and useSelctor
export const Dispatch: () => typeof store.dispatch = useDispatch;
export const UseSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
