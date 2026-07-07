import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_BUNDLES,
  GET_BUNDLE_BY_SLUG,
  GET_PUBLISHED_BUNDLES,
} from "./bundleQueries";
import { IPaginatedCourseBundles } from "./bundleTypes";

export const useAllBundles = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedCourseBundles>(
    GET_ALL_BUNDLES,
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
    bundles: data?.allBundles?.bundles || [],
    meta: data?.allBundles?.meta,
    loading,
    error,
    refetch,
  };
};

export const useBundleBySlug = (slug?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_BUNDLE_BY_SLUG, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    bundle: data || null,
    loading,
    error,
    refetch,
  };
};

export const usePublishedBundles = () => {
  const { data, loading, error, refetch } = useQuery(GET_PUBLISHED_BUNDLES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    bundles: data || [],
    loading,
    error,
    refetch,
  };
};
