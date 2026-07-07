import { gql } from "@apollo/client";

export const GET_ALL_Category = gql`
  query GetAllCategory($pagination: PaginationInput) {
    getAllCategories(pagination: $pagination) {
      categories {
        id
        name
        slug
        description
        courses
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

 
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categoryBySlug(slug: $slug) {
      id
      name
      slug
      description
      courses
    }
  }
`;