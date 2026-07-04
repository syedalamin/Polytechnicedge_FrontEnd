 
import { IAdminResponse } from "./adminTypes";
import { GET_ALL_ADMINS } from "./adminQueries";
import { useQuery } from "@apollo/client/react";

export const useAllAdmins = (page = 1, limit = 10) => {
  const { data, loading, error, refetch } = useQuery<IAdminResponse>(
    GET_ALL_ADMINS,
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

  return {
    admins: data?.getAllAdmins?.admins || [],  
    meta: data?.getAllAdmins?.meta,  
    loading,
    error,
    refetch,
    isAuthenticated: !!data?.getAllAdmins?.admins,
  };
};
