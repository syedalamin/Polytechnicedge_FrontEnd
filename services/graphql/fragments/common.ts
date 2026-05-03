import { gql } from "@apollo/client";

export const USER_BASIC_INFO = gql`
  fragment UserBasicInfo on User {
    id
    name
    email
    role
  }
`;
