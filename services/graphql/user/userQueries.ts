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

export const GET_ME_For_Instructor = gql`
  query GetMeForInstructor {
    me {
      id
      email
      username
      role
      instructorProfile {
        id
        userId
        username
        slug
        firstName
        middleName
        lastName
        bio
        address
        gender
        dateOfBirth
        expertise
        qualification
        experienceYears
        linkedin
        website
        rating
        contactNumber1
        contactNumber2
        profileImage
        backgroundImage
        courseInstructors {
          id
          courseId
        }
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
