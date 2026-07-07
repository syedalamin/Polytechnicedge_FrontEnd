import { useQuery } from "@apollo/client/react";
import {
  GET_BUNDLE_ITEMS_BY_BUNDLE_ID,
  GET_BUNDLE_ITEM_BY_ID,
} from "./bundleItemQueries";
import { IPaginatedBundleItems } from "./bundleItemTypes";

export const useBundleItemsByBundleId = (
  bundleId?: string,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedBundleItems>(
    GET_BUNDLE_ITEMS_BY_BUNDLE_ID,
    {
      variables: {
        filter: { bundleId },
        pagination: {
          page,
          limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      },
      skip: !bundleId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    bundleItems: data?.getBundleItemsByBundleId?.bundlesItems || [],
    meta: data?.getBundleItemsByBundleId?.meta,
    loading,
    error,
    refetch,
  };
};

export const useBundleItemById = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_BUNDLE_ITEM_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    bundleItem: data || null,
    loading,
    error,
    refetch,
  };
};
