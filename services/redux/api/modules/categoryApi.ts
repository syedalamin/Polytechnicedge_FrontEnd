import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        data: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        data: data,
      }),
    }),
  }),
});

export const { useCreateCategoryMutation, useUpdateCategoryMutation } =
  categoryApi;
