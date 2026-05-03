import { gql } from '@apollo/client';

export const USER_CORE_FRAGMENT = gql`
  fragment UserCore on User {
    id
    email
    username
    slug
    role
    status
    emailVerified
    twoFactorEnabled
    lastLogin
    createdAt
    updatedAt
    needPasswordChange
  }
`;

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    adminProfile {
      firstName
      lastName
      middleName
      bio
      gender
      contactNumber1
      contactNumber2
      dateOfBirth
      address
      profileImage
      backgroundImage
    }
    instructorProfile {
      firstName
      lastName
      middleName
      bio
      gender
      contactNumber1
      contactNumber2
      dateOfBirth
      address
      profileImage
      backgroundImage
      qualification
      expertise
      linkedin
      website
    }
    studentProfile {
      firstName
      lastName
      middleName
      bio
      gender
      contactNumber1
      contactNumber2
      dateOfBirth
      address
      profileImage
      backgroundImage
      educationLevel
      interests
    }
  }
`;

export const FULL_USER_FRAGMENT = gql`
  fragment FullUser on User {
    ...UserCore
    ...UserProfile
  }
`;