import { gql } from "@apollo/client";

export const GET_ALL_MODULES = gql`
  query GetAllModules($filter: ModuleFilterInput, $pagination: PaginationInput) {
    allModules(filter: $filter, pagination: $pagination) {
      modules {
        id
        courseId
        weekNumber
        title
        slug
        textInstruction
        estimatedDuration
        serial
        course {
          id
          title
          slug
        }
        contents {
          id
          title
          slug
          contentType
          serial
          duration
        }
        quizzes {
          id
          title
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

export const GET_MODULE = gql`
  query GetModule($id: ID) {
    module(id: $id) {
      id
      courseId
      weekNumber
      title
      slug
      textInstruction
      estimatedDuration
      serial
      course {
        id
        title
        slug
      }
      contents {
        id
        title
        slug
        contentType
        contentUrl
        textContent
        isLocked
        duration
        serial
      }
      quizzes {
        id
        title
        timeLimit
        passingScore
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MODULE_BY_SLUG = gql`
  query GetModuleBySlug($slug: String) {
    moduleBySlug(slug: $slug) {
      id
      courseId
      weekNumber
      title
      slug
      textInstruction
      estimatedDuration
      serial
      contents {
        id
        title
        slug
        contentType
        contentUrl
        textContent
        isLocked
        duration
        serial
      }
      quizzes {
        id
        title
        timeLimit
        passingScore
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MODULES_BY_COURSE_ID = gql`
  query GetModulesByCourseId($courseId: String!) {
    modulesByCourseId(courseId: $courseId) {
      id
      title
      slug
      weekNumber
      serial
      estimatedDuration
      contents {
        id
        title
        contentType
        serial
        duration
      }
      createdAt
      updatedAt
    }
  }
`;
