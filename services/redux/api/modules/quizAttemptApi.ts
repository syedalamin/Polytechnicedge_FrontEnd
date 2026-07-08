import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const quizAttemptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuizAttempt: builder.mutation({
      query: (data) => ({
        url: "/quiz-attempts",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.QuizAttempt],
    }),
    getAllQuizAttempts: builder.query({
      query: (params) => ({
        url: "/quiz-attempts",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.QuizAttempt],
    }),
    getQuizAttemptById: builder.query({
      query: (id) => ({
        url: `/quiz-attempts/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.QuizAttempt],
    }),
    getQuizAttemptsByQuizId: builder.query({
      query: (quizId) => ({
        url: `/quiz-attempts/quiz/${quizId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.QuizAttempt],
    }),
    getQuizAttemptsByUserId: builder.query({
      query: (userId) => ({
        url: `/quiz-attempts/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.QuizAttempt],
    }),
    updateQuizAttempt: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz-attempts/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.QuizAttempt],
    }),
    deleteQuizAttempt: builder.mutation({
      query: (id) => ({
        url: `/quiz-attempts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.QuizAttempt],
    }),
  }),
});

export const {
  useCreateQuizAttemptMutation,
  useGetAllQuizAttemptsQuery,
  useGetQuizAttemptByIdQuery,
  useGetQuizAttemptsByQuizIdQuery,
  useGetQuizAttemptsByUserIdQuery,
  useUpdateQuizAttemptMutation,
  useDeleteQuizAttemptMutation,
} = quizAttemptApi;
