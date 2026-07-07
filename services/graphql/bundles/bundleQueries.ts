import { gql } from "@apollo/client";

export const GET_ALL_BUNDLES = gql`
  query GetAllBundles($filter: BundleFilterInput, $pagination: PaginationInput) {
    allBundles(filter: $filter, pagination: $pagination) {
      bundles {
        id
        title
        slug
        description
        price
        isPublished
        items {
          id
          courseId
          priceAtBundleTime
          course {
            id
            title
            slug
            thumbnail
            price
          }
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

export const GET_BUNDLE_BY_SLUG = gql`
  query GetBundleBySlug($slug: String) {
    bundleBySlug(slug: $slug) {
      id
      title
      slug
      description
      price
      isPublished
      items {
        id
        courseId
        priceAtBundleTime
        course {
          id
          title
          slug
          thumbnail
          price
          shortDescription
          durationHours
          level
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PUBLISHED_BUNDLES = gql`
  query GetPublishedBundles {
    publishedBundles {
      id
      title
      slug
      description
      price
      items {
        id
        courseId
        course {
          id
          title
          slug
          thumbnail
        }
      }
      createdAt
      updatedAt
    }
  }
`;
