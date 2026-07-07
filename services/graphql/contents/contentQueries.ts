import { gql } from "@apollo/client";

export const GET_ALL_CONTENTS = gql`
  query GetAllContents($filter: ContentFilterInput, $pagination: PaginationInput) {
    allContents(filter: $filter, pagination: $pagination) {
      contents {
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
        module {
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

export const GET_CONTENT_BY_SLUG = gql`
  query GetContentBySlug($slug: String) {
    contentBySlug(slug: $slug) {
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
      module {
        id
        title
        slug
        courseId
      }
      createdAt
      updatedAt
    }
  }
`;
