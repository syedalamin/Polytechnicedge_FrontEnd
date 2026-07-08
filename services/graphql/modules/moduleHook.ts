import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_MODULES,
  GET_MODULE,
  GET_MODULE_BY_SLUG,
  GET_MODULES_BY_COURSE_ID,
} from "./moduleQueries";
import { IPaginatedModules } from "./moduleTypes";

export const useAllModules = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedModules>(
    GET_ALL_MODULES,
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
    modules: data?.allModules?.modules || [],
    meta: data?.allModules?.meta,
    loading,
    error,
    refetch,
  };
};

export const useModule = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_MODULE, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    module: data || null,
    loading,
    error,
    refetch,
  };
};

export const useModuleBySlug = (slug?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_MODULE_BY_SLUG, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    module: data || null,
    loading,
    error,
    refetch,
  };
};

export const useModulesByCourseId = (courseId: string) => {
  const { data, loading, error, refetch } = useQuery<{
    modulesByCourseId: any[];
  }>(GET_MODULES_BY_COURSE_ID, {
    variables: { courseId },
    skip: !courseId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    modules: data?.modulesByCourseId || ([] as any[]),
    loading,
    error,
    refetch,
  };
};
