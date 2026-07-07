import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_USER_PROGRESS,
  GET_USER_PROGRESS,
  GET_USER_PROGRESS_BY_USER_ID,
  GET_USER_PROGRESS_BY_COURSE_ID,
  GET_USER_PROGRESS_BY_USER_AND_COURSE,
} from "./progressQueries";
import { IPaginatedUserProgress } from "./progressTypes";

export const useAllUserProgress = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedUserProgress>(
    GET_ALL_USER_PROGRESS,
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
    progressList: data?.allUserProgress?.progressList || [],
    meta: data?.allUserProgress?.meta,
    loading,
    error,
    refetch,
  };
};

export const useUserProgress = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_PROGRESS, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    userProgress: data || null,
    loading,
    error,
    refetch,
  };
};

export const useUserProgressByUserId = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_USER_PROGRESS_BY_USER_ID,
    {
      variables: { userId },
      skip: !userId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    progressList: data || [],
    loading,
    error,
    refetch,
  };
};

export const useUserProgressByCourseId = (courseId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_USER_PROGRESS_BY_COURSE_ID,
    {
      variables: { courseId },
      skip: !courseId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    progressList: data || [],
    loading,
    error,
    refetch,
  };
};

export const useUserProgressByUserAndCourse = (
  userId: string,
  courseId: string,
) => {
  const { data, loading, error, refetch } = useQuery(
    GET_USER_PROGRESS_BY_USER_AND_COURSE,
    {
      variables: { userId, courseId },
      skip: !userId || !courseId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    userProgress: data || null,
    loading,
    error,
    refetch,
  };
};
