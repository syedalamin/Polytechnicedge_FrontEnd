import { gql } from "@apollo/client";

export const GET_ALL_COURSE_INSTRUCTORS = gql`
  query GetAllCourseInstructors($filter: CourseInstructorFilterInput, $pagination: PaginationInput) {
    allCourseInstructors(filter: $filter, pagination: $pagination) {
      courseInstructors {
        id
        courseId
        instructorId
        course {
          id
          title
          slug
        }
        instructor {
          id
          firstName
          lastName
          profileImage
          user {
            id
            email
          }
        }
        createdAt
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
