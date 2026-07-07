import { gql } from "@apollo/client";

export const GET_ALL_QUIZZES = gql`
  query GetAllQuizzes($filter: QuizFilterInput, $pagination: PaginationInput) {
    allQuizzes(filter: $filter, pagination: $pagination) {
      quizzes {
        id
        moduleId
        title
        isAdaptive
        isLocked
        timeLimit
        passingScore
        module {
          id
          title
          slug
        }
        questions {
          id
          question
          marks
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

export const GET_QUIZ = gql`
  query GetQuiz($id: ID) {
    quiz(id: $id) {
      id
      moduleId
      title
      isAdaptive
      isLocked
      timeLimit
      passingScore
      module {
        id
        title
        slug
      }
      questions {
        id
        question
        options
        correctAnswer
        marks
        explanation
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_QUIZZES_BY_MODULE_ID = gql`
  query GetQuizzesByModuleId($moduleId: String!) {
    quizzesByModuleId(moduleId: $moduleId) {
      id
      title
      timeLimit
      passingScore
      isAdaptive
      isLocked
    }
  }
`;
