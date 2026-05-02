import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuer";
import { tagTypesList } from "./tagTypes";
 
 

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});