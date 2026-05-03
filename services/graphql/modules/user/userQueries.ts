import { gql } from '@apollo/client';
import { FULL_USER_FRAGMENT, USER_CORE_FRAGMENT, USER_PROFILE_FRAGMENT } from './userFragmen';

export const GET_ME = gql`
  query GetMe {
    me {
      ...FullUser
    }
  }
  ${FULL_USER_FRAGMENT}
`;
 