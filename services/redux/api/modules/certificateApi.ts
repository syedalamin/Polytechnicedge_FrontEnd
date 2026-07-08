import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCertificate: builder.mutation({
      query: (data) => ({
        url: "/certificates/create-certificate",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.Certificate],
    }),
    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Certificate],
    }),
  }),
});

export const {
  useCreateCertificateMutation,
  useDeleteCertificateMutation,
} = certificateApi;
