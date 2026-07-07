import { gql } from "@apollo/client";

export const GET_BUNDLE_ITEMS_BY_BUNDLE_ID = gql`
  query GetBundleItemsByBundleId($filter: BundleItemFilterInput, $pagination: PaginationInput) {
    getBundleItemsByBundleId(filter: $filter, pagination: $pagination) {
      bundlesItems {
        id
        bundleId
        courseId
        priceAtBundleTime
        course {
          id
          title
          slug
          thumbnail
          price
        }
        bundle {
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

export const GET_BUNDLE_ITEM_BY_ID = gql`
  query GetBundleItemById($id: ID!) {
    getBundleItemById(id: $id) {
      id
      bundleId
      courseId
      priceAtBundleTime
      course {
        id
        title
        slug
        thumbnail
        price
      }
      bundle {
        id
        title
        slug
      }
      createdAt
      updatedAt
    }
  }
`;
