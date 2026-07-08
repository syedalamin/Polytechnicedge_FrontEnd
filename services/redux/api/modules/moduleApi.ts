import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (data) => ({
        url: "/modules/create-module",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Module],
    }),
    updateModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `/modules/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Module],
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Module],
    }),
  }),
});

export const {
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
