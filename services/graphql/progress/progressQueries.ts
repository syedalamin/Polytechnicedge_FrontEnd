import { gql } from "@apollo/client";

export const GET_ALL_USER_PROGRESS = gql`
  query GetAllUserProgress($filter: UserProgressFilterInput, $pagination: PaginationInput) {
    allUserProgress(filter: $filter, pagination: $pagination) {
      progressList {
        id
        userId
        courseId
        progress
        isCompleted
        completedContents
        currentContentId
        lastAccessed
        completedAt
        user {
          id
          email
          username
        }
        course {
          id
          title
          slug
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

export const GET_USER_PROGRESS = gql`
  query GetUserProgress($id: ID) {
    userProgress(id: $id) {
      id
      userId
      courseId
      progress
      isCompleted
      completedContents
      currentContentId
      lastAccessed
      completedAt
      user {
        id
        email
        username
      }
      course {
        id
        title
        slug
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_PROGRESS_BY_USER_ID = gql`
  query GetUserProgressByUserId($userId: String!) {
    userProgressByUserId(userId: $userId) {
      id
      courseId
      progress
      isCompleted
      completedAt
      course {
        id
        title
        slug
        thumbnail
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_PROGRESS_BY_COURSE_ID = gql`
  query GetUserProgressByCourseId($courseId: String!) {
    userProgressByCourseId(courseId: $courseId) {
      id
      userId
      progress
      isCompleted
      completedAt
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

export const GET_USER_PROGRESS_BY_USER_AND_COURSE = gql`
  query GetUserProgressByUserAndCourse($userId: String!, $courseId: String!) {
    userProgressByUserAndCourse(userId: $userId, courseId: $courseId) {
      id
      progress
      isCompleted
      completedContents
      currentContentId
      lastAccessed
      completedAt
      createdAt
      updatedAt
    }
  }
`;
