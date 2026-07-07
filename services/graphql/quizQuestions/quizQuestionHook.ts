import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_QUIZ_QUESTIONS,
  GET_QUIZ_QUESTION,
  GET_QUIZ_QUESTIONS_BY_QUIZ_ID,
} from "./quizQuestionQueries";
import { IPaginatedQuizQuestions } from "./quizQuestionTypes";

export const useAllQuizQuestions = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedQuizQuestions>(
    GET_ALL_QUIZ_QUESTIONS,
    {
      variables: {
        filter,
        pagination: {
          page,
          limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    questions: data?.allQuizQuestions?.questions || [],
    meta: data?.allQuizQuestions?.meta,
    loading,
    error,
    refetch,
  };
};

export const useQuizQuestion = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_QUIZ_QUESTION, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    quizQuestion: data || null,
    loading,
    error,
    refetch,
  };
};

export const useQuizQuestionsByQuizId = (quizId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_QUIZ_QUESTIONS_BY_QUIZ_ID,
    {
      variables: { quizId },
      skip: !quizId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    questions: data || [],
    loading,
    error,
    refetch,
  };
};
