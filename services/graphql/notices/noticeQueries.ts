import { gql } from "@apollo/client";

export const GET_ALL_NOTICES = gql`
  query GetAllNotices($filter: NoticeFilterInput, $pagination: PaginationInput) {
    allNotices(filter: $filter, pagination: $pagination) {
      notices {
        id
        title
        content
        authorId
        isGlobal
        courseId
        author {
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

export const GET_NOTICE = gql`
  query GetNotice($id: ID) {
    notice(id: $id) {
      id
      title
      content
      authorId
      isGlobal
      courseId
      author {
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

export const GET_GLOBAL_NOTICES = gql`
  query GetGlobalNotices {
    globalNotices {
      id
      title
      content
      authorId
      author {
        id
        email
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_NOTICES_BY_COURSE_ID = gql`
  query GetNoticesByCourseId($courseId: String!) {
    noticesByCourseId(courseId: $courseId) {
      id
      title
      content
      authorId
      author {
        id
        email
        username
      }
      createdAt
      updatedAt
    }
  }
`;
