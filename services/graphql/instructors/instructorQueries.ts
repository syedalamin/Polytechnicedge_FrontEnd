import { gql } from "@apollo/client";

export const GET_ALL_INSTRUCTORS = gql`
  query GetAllInstructors($pagination: PaginationInput) {
    getAllInstructors(pagination: $pagination) {
      instructors {
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

export const GET_INSTRUCTOR_PROFILE = gql`
  query GetInstructorProfile($id: ID!) {
    instructorProfile(id: $id) {
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
