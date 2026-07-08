import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (data) => ({
        url: "/contents/create-content",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Content],
    }),
    updateContent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contents/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Content],
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/contents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Content],
    }),
  }),
});

export const {
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = contentApi;
