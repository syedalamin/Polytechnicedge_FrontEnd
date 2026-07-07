import { useQuery } from "@apollo/client/react";
import {
  GET_ALL_CERTIFICATES,
  GET_CERTIFICATE,
  GET_CERTIFICATES_BY_USER_ID,
  GET_CERTIFICATES_BY_COURSE_ID,
} from "./certificateQueries";
import { IPaginatedCertificates } from "./certificateTypes";

export const useAllCertificates = (
  filter?: Record<string, any>,
  page = 1,
  limit = 10,
) => {
  const { data, loading, error, refetch } = useQuery<IPaginatedCertificates>(
    GET_ALL_CERTIFICATES,
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
    certificates: data?.allCertificates?.certificates || [],
    meta: data?.allCertificates?.meta,
    loading,
    error,
    refetch,
  };
};

export const useCertificate = (id?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_CERTIFICATE, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    certificate: data || null,
    loading,
    error,
    refetch,
  };
};

export const useCertificatesByUserId = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_CERTIFICATES_BY_USER_ID,
    {
      variables: { userId },
      skip: !userId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    certificates: data || [],
    loading,
    error,
    refetch,
  };
};

export const useCertificatesByCourseId = (courseId: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_CERTIFICATES_BY_COURSE_ID,
    {
      variables: { courseId },
      skip: !courseId,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    certificates: data || [],
    loading,
    error,
    refetch,
  };
};
