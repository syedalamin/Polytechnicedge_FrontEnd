import { baseApi } from "../baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/admins/create-admin",
        method: "POST",
        data: data,
      }),
    }),
    updateAdminProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admins/${id}`,
        method: "PUT",
        data: data,
      }),
    }),
  }),
});

export const { useCreateAdminMutation, useUpdateAdminProfileMutation } =
  adminApi;
