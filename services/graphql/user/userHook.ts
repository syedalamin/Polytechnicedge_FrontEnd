import { useQuery, useMutation } from "@apollo/client/react";
import { IMeResponse } from "./userTypes";
import { GET_ME_For_Instructor, GET_ME_PROFILE, UPDATE_ME } from "./userQueries";

export const useMe = () => {
  const { data, loading, error, refetch } = useQuery<IMeResponse>(GET_ME_PROFILE, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: data?.me,
    loading,
    error,
    refetch,
  };
}

export const useMeForInstructor = () => {
  const { data, loading, error, refetch } = useQuery<IMeResponse>(GET_ME_For_Instructor, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: data?.me,
    loading,
    error,
    refetch,
  };
}

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

export const useUpdateMe = () => {
  const [updateMeMutation, { loading, error }] = useMutation(UPDATE_ME, {
    refetchQueries: [{ query: GET_ME_PROFILE }],
  });

  const updateMe = async (data: Record<string, any>) => {
    const result = await updateMeMutation({ variables: { data } });
    return (result as any)?.data?.updateMe;
  };

  return { updateMe, loading, error };
};
