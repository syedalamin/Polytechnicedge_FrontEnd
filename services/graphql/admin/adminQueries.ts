import { gql } from "@apollo/client";

export const GET_ALL_ADMINS = gql`
  query GetAllAdmins($pagination: PaginationInput) {
    getAllAdmins(pagination: $pagination) {
      admins {
        id
        userId
        firstName
        middleName
        lastName
        profileImage
        contactNumber1
        contactNumber2
        backgroundImage
        bio
        address
        gender
        dateOfBirth
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

export const GET_ADMIN_PROFILE = gql`
  query GetAdminProfile($id: ID!) {
    adminProfile(id: $id) {
      id
      userId
      firstName
      middleName
      lastName
      profileImage
      contactNumber1
      contactNumber2
      backgroundImage
      bio
      address
      gender
      dateOfBirth
      user {
        id
        email
        role
        status
        emailVerified
      }
    }
  }
`;
