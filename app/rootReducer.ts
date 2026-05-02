import { baseApi } from "@/services/redux/api/baseApi";

 

export const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};