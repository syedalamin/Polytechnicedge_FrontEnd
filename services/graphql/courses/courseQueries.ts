import { gql } from "@apollo/client";

export const GET_ALL_COURSES = gql`
  query GetAllCourses($filter: CourseFilterInput, $pagination: PaginationInput) {
    allCourses(filter: $filter, pagination: $pagination) {
      courses {
        id
        title
        slug
        shortDescription
        longDescription
        thumbnail
        previewVideoUrl
        price
        isPublished
        isFeatured
        level
        categoryId
        durationHours
        whatYouWillLearn
        requirements
        prerequisites
        tags
        accessExpiresInDays
        category {
          id
          name
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

export const GET_COURSE = gql`
  query GetCourse($slug: String) {
    course(slug: $slug) {
      id
      title
      slug
      shortDescription
      longDescription
      thumbnail
      previewVideoUrl
      price
      isPublished
      isFeatured
      level
      categoryId
      durationHours
      whatYouWillLearn
      requirements
      prerequisites
      tags
      accessExpiresInDays
      category {
        id
        name
        slug
      }
      modules {
        id
        title
        slug
        weekNumber
        serial
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEATURED_COURSES = gql`
  query GetFeaturedCourses {
    featuredCourses {
      id
      title
      slug
      shortDescription
      thumbnail
      price
      level
      durationHours
      category {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PUBLISHED_COURSES = gql`
  query GetPublishedCourses {
    publishedCourses {
      id
      title
      slug
      shortDescription
      thumbnail
      price
      level
      durationHours
      category {
        id
        name
        slug
      }
    }
  }
`;
