import { gql } from '@apollo/client';
import { FULL_USER_FRAGMENT } from './userFragmen';

export const UPDATE_ME = gql`
  mutation UpdateMe($data: UpdateMeInput!) {
    updateMe(data: $data) {
      ...FullUser
    }
  }
  ${FULL_USER_FRAGMENT}
`;