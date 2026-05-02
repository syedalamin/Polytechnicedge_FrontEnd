import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";
import { instance } from "./axiosInstance";

export const axiosBaseQuery =
  (): BaseQueryFn<any, unknown, unknown> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await instance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;

     
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
