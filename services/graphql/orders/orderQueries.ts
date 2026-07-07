import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GetAllOrders($filter: OrderFilterInput, $pagination: PaginationInput) {
    allOrders(filter: $filter, pagination: $pagination) {
      orders {
        id
        userId
        totalAmount
        status
        transactionId
        user {
          id
          email
          username
        }
        items {
          id
          courseId
          bundleId
          price
          course {
            id
            title
            slug
            thumbnail
          }
          bundle {
            id
            title
            slug
          }
        }
        payment {
          id
          amount
          transactionId
          paymentMethod
          status
          paidAt
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

export const GET_ORDER = gql`
  query GetOrder($id: ID) {
    order(id: $id) {
      id
      userId
      totalAmount
      status
      transactionId
      user {
        id
        email
        username
      }
      items {
        id
        courseId
        bundleId
        price
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
      }
      payment {
        id
        amount
        transactionId
        paymentMethod
        status
        paidAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDERS_BY_USER_ID = gql`
  query GetOrdersByUserId($userId: String!) {
    ordersByUserId(userId: $userId) {
      id
      totalAmount
      status
      transactionId
      items {
        id
        courseId
        bundleId
        price
        course {
          id
          title
          slug
          thumbnail
        }
      }
      payment {
        id
        amount
        transactionId
        paymentMethod
        status
      }
      createdAt
      updatedAt
    }
  }
`;
