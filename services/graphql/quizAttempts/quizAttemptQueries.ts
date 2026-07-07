import { gql } from "@apollo/client";

export const GET_ALL_QUIZ_ATTEMPTS = gql`
  query GetAllQuizAttempts($filter: QuizAttemptFilterInput, $pagination: PaginationInput) {
    allQuizAttempts(filter: $filter, pagination: $pagination) {
      attempts {
        id
        userId
        quizId
        score
        isPassed
        answers
        attemptCount
        attemptedAt
        user {
          id
          email
          username
        }
        quiz {
          id
          title
          passingScore
        }
        submissions {
          id
          textAnswer
          marks
          feedback
          totalMarks
          submittedAt
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

export const GET_QUIZ_ATTEMPT = gql`
  query GetQuizAttempt($id: ID) {
    quizAttempt(id: $id) {
      id
      userId
      quizId
      score
      isPassed
      answers
      attemptCount
      attemptedAt
      user {
        id
        email
        username
      }
      quiz {
        id
        title
        passingScore
        timeLimit
      }
      submissions {
        id
        textAnswer
        marks
        feedback
        totalMarks
        submittedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_QUIZ_ATTEMPTS_BY_QUIZ_ID = gql`
  query GetQuizAttemptsByQuizId($quizId: String!) {
    quizAttemptsByQuizId(quizId: $quizId) {
      id
      userId
      score
      isPassed
      attemptCount
      attemptedAt
      user {
        id
        email
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_QUIZ_ATTEMPTS_BY_USER_ID = gql`
  query GetQuizAttemptsByUserId($userId: String!) {
    quizAttemptsByUserId(userId: $userId) {
      id
      quizId
      score
      isPassed
      attemptCount
      attemptedAt
      quiz {
        id
        title
        passingScore
      }
      createdAt
      updatedAt
    }
  }
`;
