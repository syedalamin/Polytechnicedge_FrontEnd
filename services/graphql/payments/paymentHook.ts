import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_PAYMENTS,
  GET_PAYMENT,
  GET_PAYMENT_BY_ORDER_ID,
  GET_PAYMENTS_BY_USER_ID,
} from "./paymentQueries";
import { IPaginatedPayments } from "./paymentTypes";

export const useAllPayments = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedPayments>(
    GET_ALL_PAYMENTS,
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
    payments: data?.allPayments?.payments || [],
    meta: data?.allPayments?.meta,
    loading,
    error,
    refetch,
  };
};

export const usePayment = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_PAYMENT, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    payment: data || null,
    loading,
    error,
    refetch,
  };
};

export const usePaymentByOrderId = (orderId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_PAYMENT_BY_ORDER_ID, {
    variables: { orderId },
    skip: !orderId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    payment: data || null,
    loading,
    error,
    refetch,
  };
};

export const usePaymentsByUserId = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_PAYMENTS_BY_USER_ID, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    payments: data || [],
    loading,
    error,
    refetch,
  };
};
