import { useQuery } from "@apollo/client/react";
import { GET_ME } from "./userQueries";

import { User } from "./user.types";

export const useMe = () => {
  const { data, loading, error, refetch } = useQuery<{ me: User }>(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  return {
    me: data?.me,
    loading,
    error,
    refetch,
  };
};
