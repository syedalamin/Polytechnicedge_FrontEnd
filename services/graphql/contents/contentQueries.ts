import { gql } from "@apollo/client";

export const CONTENT_FRAGMENT = gql`
  fragment ContentFields on Content {
    id
    moduleId
    title
    slug
    contentType
    contentUrl
    textContent
    isLocked
    duration
    serial
    createdAt
    updatedAt
  }
`;

export const GET_ALL_CONTENTS = gql`
  query GetAllContents(
    $filter: ContentFilterInput
    $pagination: PaginationInput
  ) {
    allContents(filter: $filter, pagination: $pagination) {
      contents {
        ...ContentFields
        module {
          id
          title
          slug
        }
      }
      meta {
        page
        limit
        total
        totalPages
      }
    }
  }
  ${CONTENT_FRAGMENT}
`;

export const GET_CONTENT_BY_SLUG = gql`
  query GetContentBySlug($slug: String) {
    contentBySlug(slug: $slug) {
      ...ContentFields
      module {
        id
        title
        slug
        courseId
      }
    }
  }
  ${CONTENT_FRAGMENT}
`;
