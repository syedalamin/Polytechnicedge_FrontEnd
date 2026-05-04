import { configureStore } from "@reduxjs/toolkit";
 
import { baseApi } from "@/services/redux/api/baseApi";
import { rootReducer } from "@/app/rootReducer";
 
 

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;