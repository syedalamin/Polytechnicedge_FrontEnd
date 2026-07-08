import { useQuery } from "@apollo/client/react";
import { GET_ALL_Category, GET_CATEGORY_BY_SLUG } from "./categoryQueries";
import { IPaginatedResponse } from "./categoryTypes";

export const useAllCategory = (page = 1, limit = 10) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedResponse>(
    GET_ALL_Category,
    {
      variables: {
        pagination: {
          page: page,
          limit: limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );
  console.log(data)

  return {
    categories: data?.getAllCategories?.categories || [],
    meta: data?.getAllCategories?.meta,
    loading,
    error,
    refetch,
  };
};

export const useCategoryBySlug = (slug: string) => {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORY_BY_SLUG, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: "cache-and-network",
  });

  return {
    category: data || null,
    loading,
    error,
    refetch,
  };
};
