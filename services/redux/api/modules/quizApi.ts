import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Quiz],
    }),
    getAllQuizzes: builder.query({
      query: (params) => ({
        url: "/quizzes",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.Quiz],
    }),
    getQuizById: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Quiz],
    }),
    getQuizzesByModuleId: builder.query({
      query: (moduleId) => ({
        url: `/quizzes/module/${moduleId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Quiz],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Quiz],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Quiz],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useGetQuizzesByModuleIdQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
