import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students/create-student",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Student],
    }),
    updateStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.Student],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Student],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
