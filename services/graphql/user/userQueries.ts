import { gql } from "@apollo/client";

export const GET_ME_PROFILE = gql`
  query GetMeForAuth {
    me {
      id
      email
      username
      role
      instructorProfile {
        id
        firstName
        lastName
        expertise
        qualification
      }
      studentProfile {
        id
        firstName
        lastName
        educationLevel
        interests
      }
      adminProfile {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_ME = gql`
  mutation UpdateMe($data: UpdateMeInput!) {
    updateMe(data: $data) {
      id
      email
      username
      role
    }
  }
`;
