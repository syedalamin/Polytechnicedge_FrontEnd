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
  }),
});

export const { useCreateAdminMutation } = adminApi;
