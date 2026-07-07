import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_QUIZ_ATTEMPTS,
  GET_QUIZ_ATTEMPT,
  GET_QUIZ_ATTEMPTS_BY_QUIZ_ID,
  GET_QUIZ_ATTEMPTS_BY_USER_ID,
} from "./quizAttemptQueries";
import { IPaginatedQuizAttempts } from "./quizAttemptTypes";

export const useAllQuizAttempts = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedQuizAttempts>(
    GET_ALL_QUIZ_ATTEMPTS,
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
    attempts: data?.allQuizAttempts?.attempts || [],
    meta: data?.allQuizAttempts?.meta,
    loading,
    error,
    refetch,
  };
};

export const useQuizAttempt = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_QUIZ_ATTEMPT, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    quizAttempt: data || null,
    loading,
    error,
    refetch,
  };
};

export const useQuizAttemptsByQuizId = (quizId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_QUIZ_ATTEMPTS_BY_QUIZ_ID,
    {
      variables: { quizId },
      skip: !quizId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    attempts: data || [],
    loading,
    error,
    refetch,
  };
};

export const useQuizAttemptsByUserId = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_QUIZ_ATTEMPTS_BY_USER_ID,
    {
      variables: { userId },
      skip: !userId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    attempts: data || [],
    loading,
    error,
    refetch,
  };
};
