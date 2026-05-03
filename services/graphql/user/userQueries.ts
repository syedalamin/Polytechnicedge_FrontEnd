import { gql } from "@apollo/client";

export const GET_ME_PROFILE = gql`
  query GetMeForAuth {
    me {
      id
      email
      username
      role
    }
  }
`;
