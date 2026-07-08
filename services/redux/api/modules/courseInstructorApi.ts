import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const courseInstructorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourseInstructor: builder.mutation({
      query: (data) => ({
        url: "/course-instructors/create-course-instructor",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.CourseInstructor, tagTypes.Course],
    }),
    deleteCourseInstructor: builder.mutation({
      query: (id) => ({
        url: `/course-instructors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.CourseInstructor, tagTypes.Course],
    }),
  }),
});

export const {
  useCreateCourseInstructorMutation,
  useDeleteCourseInstructorMutation,
} = courseInstructorApi;
