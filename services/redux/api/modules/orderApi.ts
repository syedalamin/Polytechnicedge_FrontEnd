import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Order],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.Order],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Order],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
