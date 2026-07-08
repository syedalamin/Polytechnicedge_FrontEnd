import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Payment],
    }),
    getAllPayments: builder.query({
      query: (params) => ({
        url: "/payments",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.Payment],
    }),
    getPaymentById: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Payment],
    }),
    getPaymentByOrderId: builder.query({
      query: (orderId) => ({
        url: `/payments/order/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Payment],
    }),
    getPaymentByUserId: builder.query({
      query: (userId) => ({
        url: `/payments/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Payment],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Payment],
    }),
    sslSuccess: builder.mutation({
      query: (data) => ({
        url: "/payments/success",
        method: "POST",
        data,
      }),
    }),
    sslFail: builder.mutation({
      query: (data) => ({
        url: "/payments/fail",
        method: "POST",
        data,
      }),
    }),
    sslCancel: builder.mutation({
      query: (data) => ({
        url: "/payments/cancel",
        method: "POST",
        data,
      }),
    }),
    sslIPN: builder.mutation({
      query: (data) => ({
        url: "/payments/ipn",
        method: "POST",
        data,
      }),
    }),
    initiateRefund: builder.mutation({
      query: (data) => ({
        url: "/payments/refund/initiate",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Payment],
    }),
    queryRefund: builder.mutation({
      query: (data) => ({
        url: "/payments/refund/query",
        method: "POST",
        data,
      }),
    }),
    queryTransactionByTranId: builder.query({
      query: (tranId) => ({
        url: `/payments/transaction/${tranId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetPaymentByOrderIdQuery,
  useGetPaymentByUserIdQuery,
  useDeletePaymentMutation,
  useSslSuccessMutation,
  useSslFailMutation,
  useSslCancelMutation,
  useSslIPNMutation,
  useInitiateRefundMutation,
  useQueryRefundMutation,
  useQueryTransactionByTranIdQuery,
} = paymentApi;
