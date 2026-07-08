import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProgress: builder.mutation({
      query: (data) => ({
        url: "/progress/create-progress",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Progress],
    }),
    updateProgress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/progress/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Progress],
    }),
    deleteProgress: builder.mutation({
      query: (id) => ({
        url: `/progress/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Progress],
    }),
    markCourseComplete: builder.mutation({
      query: (data) => ({
        url: "/progress/mark-complete",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Progress],
    }),
  }),
});

export const {
  useCreateProgressMutation,
  useUpdateProgressMutation,
  useDeleteProgressMutation,
  useMarkCourseCompleteMutation,
} = progressApi;
