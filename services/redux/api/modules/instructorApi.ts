import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const instructorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInstructor: builder.mutation({
      query: (data) => ({
        url: "/instructors/create-instructor",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Instructor],
    }),
    updateInstructor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/instructors/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.Instructor],
    }),
  }),
});

export const {
  useCreateInstructorMutation,
  useUpdateInstructorMutation,
} = instructorApi;
