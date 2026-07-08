import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Course],
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Course],
    }),
    publishCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.Course],
    }),
    unpublishCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}/unpublish`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.Course],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Course],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  usePublishCourseMutation,
  useUnpublishCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
