import { useQuery } from "@apollo/client/react";
import { GET_ALL_STUDENTS, GET_STUDENT_PROFILE } from "./studentQueries";
import { IPaginatedStudents } from "./studentTypes";

export const useAllStudents = (page = 1, limit = 10) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedStudents>(
    GET_ALL_STUDENTS,
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
    students: data?.getAllStudents?.students || [],
    meta: data?.getAllStudents?.meta,
    loading,
    error,
    refetch,
  };
};

export const useStudentProfile = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_STUDENT_PROFILE, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    studentProfile: data || null,
    loading,
    error,
    refetch,
  };
};
