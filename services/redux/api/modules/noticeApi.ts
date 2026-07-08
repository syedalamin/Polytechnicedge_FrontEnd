import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotice: builder.mutation({
      query: (data) => ({
        url: "/notices",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Notice],
    }),
    updateNotice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notices/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Notice],
    }),
    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `/notices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Notice],
    }),
  }),
});

export const {
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeApi;
