import { useQuery } from "@apollo/client/react";
import { GET_ALL_CONTENTS, GET_CONTENT_BY_SLUG } from "./contentQueries";
import { IPaginatedContents } from "./contentTypes";

export const useAllContents = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedContents>(
    GET_ALL_CONTENTS,
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
    contents: data?.allContents?.contents || [],
    meta: data?.allContents?.meta,
    loading,
    error,
    refetch,
  };
};

export const useContentBySlug = (slug?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_CONTENT_BY_SLUG, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    content: data || null,
    loading,
    error,
    refetch,
  };
};
