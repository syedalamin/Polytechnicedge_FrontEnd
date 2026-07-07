import { gql } from "@apollo/client";

export const GET_ALL_STUDENTS = gql`
  query GetAllStudents($pagination: PaginationInput) {
    getAllStudents(pagination: $pagination) {
      students {
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
        profileImage
        backgroundImage
        contactNumber1
        contactNumber2
        educationLevel
        interests
        dateOfBirth
        user {
          id
          email
          role
          status
          emailVerified
        }
        createdAt
        updatedAt
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

export const GET_STUDENT_PROFILE = gql`
  query GetStudentProfile($id: ID!) {
    studentProfile(id: $id) {
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
      profileImage
      backgroundImage
      contactNumber1
      contactNumber2
      educationLevel
      interests
      dateOfBirth
      user {
        id
        email
        role
        status
        emailVerified
      }
      createdAt
      updatedAt
    }
  }
`;
