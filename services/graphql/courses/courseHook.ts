import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_COURSES,
  GET_COURSE,
  GET_FEATURED_COURSES,
  GET_PUBLISHED_COURSES,
} from "./courseQueries";
import { IPaginatedCourses } from "./courseTypes";

export const useAllCourses = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedCourses>(
    GET_ALL_COURSES,
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
    courses: data?.allCourses?.courses || [],
    meta: data?.allCourses?.meta,
    loading,
    error,
    refetch,
  };
};

export const useCourse = (slug?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_COURSE, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    course: data || null,
    loading,
    error,
    refetch,
  };
};

export const useFeaturedCourses = () => {
  const { data, loading, error, refetch } = useQuery(GET_FEATURED_COURSES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    featuredCourses: data || [],
    loading,
    error,
    refetch,
  };
};

export const usePublishedCourses = () => {
  const { data, loading, error, refetch } = useQuery(GET_PUBLISHED_COURSES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    publishedCourses: data || [],
    loading,
    error,
    refetch,
  };
};
