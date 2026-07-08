import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_QUIZZES,
  GET_QUIZ,
  GET_QUIZZES_BY_MODULE_ID,
} from "./quizQueries";
import { IPaginatedQuizzes } from "./quizTypes";

export const useAllQuizzes = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedQuizzes>(
    GET_ALL_QUIZZES,
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
    quizzes: data?.allQuizzes?.quizzes || [],
    meta: data?.allQuizzes?.meta,
    loading,
    error,
    refetch,
  };
};

export const useQuiz = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_QUIZ, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    quiz: data || null,
    loading,
    error,
    refetch,
  };
};

export const useQuizzesByModuleId = (moduleId: string) => {
  const { data, loading, error, refetch } = useQuery<{
    quizzesByModuleId: any[];
  }>(GET_QUIZZES_BY_MODULE_ID, {
    variables: { moduleId },
    skip: !moduleId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    quizzes: data?.quizzesByModuleId || ([] as any[]),
    loading,
    error,
    refetch,
  };
};
