import { useQuery } from "@apollo/client/react";
import { GET_ALL_INSTRUCTORS, GET_INSTRUCTOR_PROFILE } from "./instructorQueries";
import { IPaginatedInstructors } from "./instructorTypes";

export const useAllInstructors = (page = 1, limit = 10) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedInstructors>(
    GET_ALL_INSTRUCTORS,
    {
      variables: {
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
    instructors: data?.getAllInstructors?.instructors || [],
    meta: data?.getAllInstructors?.meta,
    loading,
    error,
    refetch,
  };
};

export const useInstructorProfile = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_INSTRUCTOR_PROFILE, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    instructorProfile: data || null,
    loading,
    error,
    refetch,
  };
};
