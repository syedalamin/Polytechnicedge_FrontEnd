import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const quizQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuizQuestion: builder.mutation({
      query: (data) => ({
        url: "/quiz-questions",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.QuizQuestion],
    }),
    getAllQuizQuestions: builder.query({
      query: (params) => ({
        url: "/quiz-questions",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.QuizQuestion],
    }),
    getQuizQuestionById: builder.query({
      query: (id) => ({
        url: `/quiz-questions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.QuizQuestion],
    }),
    getQuizQuestionsByQuizId: builder.query({
      query: (quizId) => ({
        url: `/quiz-questions/quiz/${quizId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.QuizQuestion],
    }),
    updateQuizQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz-questions/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.QuizQuestion],
    }),
    deleteQuizQuestion: builder.mutation({
      query: (id) => ({
        url: `/quiz-questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.QuizQuestion],
    }),
  }),
});

export const {
  useCreateQuizQuestionMutation,
  useGetAllQuizQuestionsQuery,
  useGetQuizQuestionByIdQuery,
  useGetQuizQuestionsByQuizIdQuery,
  useUpdateQuizQuestionMutation,
  useDeleteQuizQuestionMutation,
} = quizQuestionApi;
