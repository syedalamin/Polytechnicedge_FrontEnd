import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/admins/create-admin",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.Admin],
    }),
    updateAdminProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admins/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.Admin],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Admin],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useUpdateAdminProfileMutation,
  useDeleteAdminMutation,
} = adminApi;
