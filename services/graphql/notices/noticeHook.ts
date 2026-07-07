import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_NOTICES,
  GET_NOTICE,
  GET_GLOBAL_NOTICES,
  GET_NOTICES_BY_COURSE_ID,
} from "./noticeQueries";
import { IPaginatedNotices } from "./noticeTypes";

export const useAllNotices = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedNotices>(
    GET_ALL_NOTICES,
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
    notices: data?.allNotices?.notices || [],
    meta: data?.allNotices?.meta,
    loading,
    error,
    refetch,
  };
};

export const useNotice = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_NOTICE, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    notice: data || null,
    loading,
    error,
    refetch,
  };
};

export const useGlobalNotices = () => {
  const { data, loading, error, refetch } = useQuery(GET_GLOBAL_NOTICES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    notices: data || [],
    loading,
    error,
    refetch,
  };
};

export const useNoticesByCourseId = (courseId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_NOTICES_BY_COURSE_ID, {
    variables: { courseId },
    skip: !courseId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    notices: data || [],
    loading,
    error,
    refetch,
  };
};
