import { gql } from "@apollo/client";

export const GET_ALL_QUIZ_QUESTIONS = gql`
  query GetAllQuizQuestions($filter: QuizQuestionFilterInput, $pagination: PaginationInput) {
    allQuizQuestions(filter: $filter, pagination: $pagination) {
      questions {
        id
        quizId
        question
        options
        correctAnswer
        marks
        explanation
        quiz {
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

export const GET_QUIZ_QUESTION = gql`
  query GetQuizQuestion($id: ID) {
    quizQuestion(id: $id) {
      id
      quizId
      question
      options
      correctAnswer
      marks
      explanation
      quiz {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_QUIZ_QUESTIONS_BY_QUIZ_ID = gql`
  query GetQuizQuestionsByQuizId($quizId: String!) {
    quizQuestionsByQuizId(quizId: $quizId) {
      id
      question
      options
      correctAnswer
      marks
      explanation
      createdAt
      updatedAt
    }
  }
`;
