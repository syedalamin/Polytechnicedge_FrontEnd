import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const bundleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBundle: builder.mutation({
      query: (data) => ({
        url: "/bundles/create-bundle",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Bundle],
    }),
    updateBundle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bundles/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.Bundle],
    }),
    deleteBundle: builder.mutation({
      query: (id) => ({
        url: `/bundles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Bundle],
    }),
  }),
});

export const {
  useCreateBundleMutation,
  useUpdateBundleMutation,
  useDeleteBundleMutation,
} = bundleApi;
