import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_ORDERS,
  GET_ORDER,
  GET_ORDERS_BY_USER_ID,
} from "./orderQueries";
import { IPaginatedOrders } from "./orderTypes";

export const useAllOrders = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedOrders>(
    GET_ALL_ORDERS,
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
    orders: data?.allOrders?.orders || [],
    meta: data?.allOrders?.meta,
    loading,
    error,
    refetch,
  };
};

export const useOrder = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_ORDER, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    order: data || null,
    loading,
    error,
    refetch,
  };
};

export const useOrdersByUserId = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS_BY_USER_ID, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    orders: data || [],
    loading,
    error,
    refetch,
  };
};
