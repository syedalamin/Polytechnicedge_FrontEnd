import { gql } from "@apollo/client";

export const GET_ALL_PAYMENTS = gql`
  query GetAllPayments($filter: PaymentFilterInput, $pagination: PaginationInput) {
    allPayments(filter: $filter, pagination: $pagination) {
      payments {
        id
        userId
        orderId
        amount
        transactionId
        paymentMethod
        status
        paidAt
        user {
          id
          email
          username
        }
        order {
          id
          totalAmount
          status
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

export const GET_PAYMENT = gql`
  query GetPayment($id: ID) {
    payment(id: $id) {
      id
      userId
      orderId
      amount
      transactionId
      paymentMethod
      status
      paidAt
      user {
        id
        email
        username
      }
      order {
        id
        totalAmount
        status
        items {
          id
          courseId
          bundleId
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PAYMENT_BY_ORDER_ID = gql`
  query GetPaymentByOrderId($orderId: String!) {
    getPaymentByOrderId(orderId: $orderId) {
      id
      amount
      transactionId
      paymentMethod
      status
      paidAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_PAYMENTS_BY_USER_ID = gql`
  query GetPaymentsByUserId($userId: String!) {
    getPaymentByUserId(userId: $userId) {
      id
      orderId
      amount
      transactionId
      paymentMethod
      status
      paidAt
      order {
        id
        totalAmount
        status
      }
      createdAt
      updatedAt
    }
  }
`;
