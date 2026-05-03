import { gql } from '@apollo/client';
import { USER_BASIC_INFO } from '../../fragments/common';

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myProfile {
      ...UserBasicInfo
      phoneNumber
      address
    }
  }
  ${USER_BASIC_INFO}
`;