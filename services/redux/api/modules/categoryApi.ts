import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.Category],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.Category],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
