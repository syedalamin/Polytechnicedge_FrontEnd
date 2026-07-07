import { gql } from "@apollo/client";

export const GET_ALL_ENROLLMENTS = gql`
  query GetAllEnrollments($filter: EnrollmentFilterInput, $pagination: PaginationInput) {
    allEnrollments(filter: $filter, pagination: $pagination) {
      enrollments {
        id
        userId
        courseId
        status
        enrolledAt
        expiresAt
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

export const GET_ENROLLMENT = gql`
  query GetEnrollment($id: ID) {
    enrollment(id: $id) {
      id
      userId
      courseId
      status
      enrolledAt
      expiresAt
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
        price
      }
      createdAt
      updatedAt
    }
  }
`;
