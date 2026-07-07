import { gql } from "@apollo/client";

export const GET_ALL_CERTIFICATES = gql`
  query GetAllCertificates($filter: CertificateFilterInput, $pagination: PaginationInput) {
    allCertificates(filter: $filter, pagination: $pagination) {
      certificates {
        id
        userId
        courseId
        certificateUrl
        issuedAt
        user {
          id
          email
          username
        }
        course {
          id
          title
          slug
          thumbnail
        }
        createdAt
        updatedAt
      }
      meta {
        page
        limit
        total
        totalPages
      }
    }
  }
`;

export const GET_CERTIFICATE = gql`
  query GetCertificate($id: ID) {
    certificate(id: $id) {
      id
      userId
      courseId
      certificateUrl
      issuedAt
      user {
        id
        email
        username
      }
      course {
        id
        title
        slug
        thumbnail
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CERTIFICATES_BY_USER_ID = gql`
  query GetCertificatesByUserId($userId: String!) {
    certificatesByUserId(userId: $userId) {
      id
      courseId
      certificateUrl
      issuedAt
      course {
        id
        title
        slug
        thumbnail
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CERTIFICATES_BY_COURSE_ID = gql`
  query GetCertificatesByCourseId($courseId: String!) {
    certificatesByCourseId(courseId: $courseId) {
      id
      userId
      certificateUrl
      issuedAt
      user {
        id
        email
        username
      }
      createdAt
      updatedAt
    }
  }
`;
