import { useQuery } from "@apollo/client/react";
import { GET_ALL_ENROLLMENTS, GET_ENROLLMENT } from "./enrollmentQueries";
import { IPaginatedEnrollments } from "./enrollmentTypes";

export const useAllEnrollments = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedEnrollments>(
    GET_ALL_ENROLLMENTS,
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
    enrollments: data?.allEnrollments?.enrollments || [],
    meta: data?.allEnrollments?.meta,
    loading,
    error,
    refetch,
  };
};

export const useEnrollment = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_ENROLLMENT, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    enrollment: data || null,
    loading,
    error,
    refetch,
  };
};
