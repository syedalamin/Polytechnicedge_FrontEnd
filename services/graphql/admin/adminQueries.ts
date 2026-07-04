import { gql } from "@apollo/client";

export const GET_ALL_ADMINS = gql`
  query GetAllAdmins($pagination: PaginationInput) {
    getAllAdmins(pagination: $pagination) {
      admins {
        id
        userId
        firstName
        lastName
        user {
          id
          email
          role
          status
          emailVerified
        }
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
