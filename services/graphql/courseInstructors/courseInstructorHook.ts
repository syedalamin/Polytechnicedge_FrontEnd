import { useQuery } from "@apollo/client/react";
import { GET_ALL_COURSE_INSTRUCTORS } from "./courseInstructorQueries";
import { IPaginatedCourseInstructors } from "./courseInstructorTypes";

export const useAllCourseInstructors = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedCourseInstructors>(
    GET_ALL_COURSE_INSTRUCTORS,
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
    courseInstructors: data?.allCourseInstructors?.courseInstructors || [],
    meta: data?.allCourseInstructors?.meta,
    loading,
    error,
    refetch,
  };
};
