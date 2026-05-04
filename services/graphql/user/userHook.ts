import { useQuery } from "@apollo/client/react";
import { IMeResponse } from "./userTypes";
import { GET_ME_PROFILE } from "./userQueries";

export const useMeForAuth = () => {
  const { data, loading, error, refetch } = useQuery<IMeResponse>(
    GET_ME_PROFILE,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    data: data?.me,
    loading,
    error,
    refetch,
    isAuthenticated: !!data?.me,
  };
};
